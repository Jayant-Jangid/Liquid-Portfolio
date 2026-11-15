import React, { useEffect, useRef } from 'react';

export type LiquidColorPreset = 'iridescent' | 'cyber' | 'mercury' | 'aurora' | 'opal';

interface LiquidShaderCanvasProps {
  className?: string;
  preset?: LiquidColorPreset;
  viscosity?: number; // 0.1 to 2.0
  speed?: number;     // 0.2 to 2.0
  turbulence?: number; // 0.5 to 3.0
  interactive?: boolean;
}

export const LiquidShaderCanvas: React.FC<LiquidShaderCanvasProps> = ({
  className = '',
  preset = 'iridescent',
  viscosity = 0.8,
  speed = 1.0,
  turbulence = 1.4,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Try standard WebGL first, then experimental-webgl
    const gl =
      (canvas.getContext('webgl', {
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      }) as WebGLRenderingContext | null) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

    let animId: number;

    // Fallback: If WebGL is unavailable or blocked, render smooth Canvas 2D liquid fluid waves
    if (!gl) {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let waveTime = 0;

      const handleResize2D = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      };
      handleResize2D();
      window.addEventListener('resize', handleResize2D);

      const render2D = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        waveTime += 0.02 * speed;

        // Draw multiple glowing iridescent liquid waves
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.moveTo(0, canvas.height);
          const baseHeight = canvas.height * (0.35 + i * 0.15);
          for (let x = 0; x <= canvas.width; x += 15) {
            const y =
              baseHeight +
              Math.sin(x * 0.004 + waveTime + i) * 35 * turbulence +
              Math.cos(x * 0.008 - waveTime * 0.7) * 20;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(canvas.width, canvas.height);
          ctx.closePath();

          const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          if (i === 0) {
            grad.addColorStop(0, 'rgba(6, 182, 212, 0.45)');
            grad.addColorStop(0.5, 'rgba(139, 92, 246, 0.35)');
            grad.addColorStop(1, 'rgba(236, 72, 153, 0.4)');
          } else if (i === 1) {
            grad.addColorStop(0, 'rgba(139, 92, 246, 0.35)');
            grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.3)');
            grad.addColorStop(1, 'rgba(192, 132, 252, 0.25)');
          } else {
            grad.addColorStop(0, 'rgba(168, 85, 247, 0.25)');
            grad.addColorStop(1, 'rgba(6, 182, 212, 0.2)');
          }
          ctx.fillStyle = grad;
          ctx.fill();
        }

        animId = requestAnimationFrame(render2D);
      };
      render2D();

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', handleResize2D);
      };
    }

    // WebGL Pipeline
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      precision mediump int;
      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform vec2 u_mouse_vel;
      uniform int u_preset;
      uniform float u_viscosity;
      uniform float u_turbulence;

      // Simplex noise implementation
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                            -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
              + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ) {
        return a + b*cos( 6.28318*(c*t+d) );
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 uv_norm = st;
        uv_norm.x *= aspect;
        
        vec2 m = u_mouse / u_resolution.xy;
        m.x *= aspect;

        // Wave propagation following mouse & autonomous fluid turbulence
        float distToMouse = length(uv_norm - m);
        float mouseImpulse = exp(-distToMouse * (3.0 * u_viscosity));
        vec2 mousePush = (uv_norm - m) * mouseImpulse * 0.5;

        float t = u_time * 0.35;
        vec2 flowUv = st * (1.6 * u_turbulence) + mousePush;

        float n1 = snoise(flowUv + vec2(t * 0.7, -t * 0.5));
        float n2 = snoise(flowUv * 2.2 + vec2(n1 * 0.85, t * 0.6));
        float n3 = snoise(flowUv * 3.6 + vec2(-t * 0.4, n2 * 0.65));

        float fluidHeight = n1 * 0.55 + n2 * 0.3 + n3 * 0.15;
        fluidHeight += mouseImpulse * 0.5;

        // Chromatic spectral offsets (RGB prism refraction)
        float rShift = fluidHeight * 0.06;
        float gShift = fluidHeight * 0.03;
        float bShift = -fluidHeight * 0.04;

        vec3 color = vec3(0.0);
        float field = fluidHeight * 0.5 + 0.5;

        if (u_preset == 0) {
          // Vibrant Iridescent Prism Spectrum (Electric Cyan, Violet, Magenta, Gold)
          vec3 a = vec3(0.55, 0.50, 0.65);
          vec3 b = vec3(0.45, 0.50, 0.45);
          vec3 c = vec3(1.0, 1.0, 1.0);
          vec3 d = vec3(0.00, 0.33, 0.67);
          
          float r = palette(field * 1.5 + rShift * 2.5, a, b, c, d).r;
          float g = palette(field * 1.5 + gShift * 2.5, a, b, c, d + vec3(0.08)).g;
          float bl = palette(field * 1.5 + bShift * 2.5, a, b, c, d + vec3(0.18)).b;
          color = vec3(r, g, bl);

          // Deep cosmic backdrop blend that keeps vibrant iridescent waves luminous
          color = mix(vec3(0.05, 0.04, 0.10), color, 0.75 + fluidHeight * 0.35);
          color += vec3(0.25, 0.15, 0.4) * mouseImpulse;
        } else if (u_preset == 1) {
          // Cyber Neon (Cyan, Violet, Magenta)
          vec3 col1 = vec3(0.04, 0.75, 0.95);
          vec3 col2 = vec3(0.60, 0.15, 0.95);
          vec3 col3 = vec3(0.95, 0.15, 0.65);
          color = mix(col1, col2, smoothstep(0.2, 0.7, field + rShift));
          color = mix(color, col3, smoothstep(0.6, 1.0, field + bShift));
          color *= smoothstep(0.15, 0.95, field);
          color += vec3(0.04, 0.02, 0.07);
        } else if (u_preset == 2) {
          // Molten Mercury (Chrome & Liquid Metallic Silver)
          float chrome = pow(sin(field * 8.0 + u_time) * 0.5 + 0.5, 3.0);
          color = vec3(chrome * 0.95, chrome * 0.92, chrome * 1.0);
          color += vec3(0.15, 0.2, 0.35) * (1.0 - chrome);
          color += vec3(rShift, gShift, bShift) * 2.0;
        } else if (u_preset == 3) {
          // Aurora Borealis (Ethereal Emerald & Deep Violet)
          vec3 col1 = vec3(0.06, 0.88, 0.6);
          vec3 col2 = vec3(0.18, 0.45, 0.98);
          vec3 col3 = vec3(0.75, 0.15, 0.9);
          color = mix(col1, col2, smoothstep(0.1, 0.6, field));
          color = mix(color, col3, smoothstep(0.5, 0.95, field));
        } else {
          // Opal Pearl (High-key pastel luxury)
          vec3 a = vec3(0.85, 0.85, 0.92);
          vec3 b = vec3(0.35, 0.30, 0.40);
          vec3 c = vec3(1.2, 1.0, 1.4);
          vec3 d = vec3(0.1, 0.4, 0.7);
          color = palette(field, a, b, c, d);
          color = mix(vec3(0.06, 0.05, 0.12), color, smoothstep(0.1, 0.9, field));
        }

        // Specular highlight on liquid wave crests
        float specular = pow(max(0.0, fluidHeight + 0.25), 3.5) * 0.5;
        color += vec3(specular * 0.9, specular * 0.7, specular);

        gl_FragColor = vec4(color, 0.95);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('WebGL Shader Error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('WebGL Link Error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uMouseVel = gl.getUniformLocation(program, 'u_mouse_vel');
    const uPreset = gl.getUniformLocation(program, 'u_preset');
    const uViscosity = gl.getUniformLocation(program, 'u_viscosity');
    const uTurbulence = gl.getUniformLocation(program, 'u_turbulence');

    const presetIndexMap: Record<LiquidColorPreset, number> = {
      iridescent: 0,
      cyber: 1,
      mercury: 2,
      aurora: 3,
      opal: 4,
    };

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let mouseVelX = 0;
    let mouseVelY = 0;
    let startTime = performance.now();

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(rect.width * dpr, 200);
      canvas.height = Math.max(rect.height * dpr, 200);
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (targetMouseX === 0 && targetMouseY === 0) {
        targetMouseX = canvas.width * 0.5;
        targetMouseY = canvas.height * 0.5;
        mouseX = targetMouseX;
        mouseY = targetMouseY;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      targetMouseX = (e.clientX - rect.left) * dpr;
      targetMouseY = (rect.height - (e.clientY - rect.top)) * dpr;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!interactive || e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const touch = e.touches[0];
      targetMouseX = (touch.clientX - rect.left) * dpr;
      targetMouseY = (rect.height - (touch.clientY - rect.top)) * dpr;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
    }

    const render = () => {
      const currentTime = (performance.now() - startTime) * 0.001 * speed;

      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      mouseVelX = mouseX - prevMouseX;
      mouseVelY = mouseY - prevMouseY;
      prevMouseX = mouseX;
      prevMouseY = mouseY;

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, currentTime);
      gl.uniform2f(uMouse, mouseX, mouseY);
      gl.uniform2f(uMouseVel, mouseVelX, mouseVelY);
      gl.uniform1i(uPreset, presetIndexMap[preset] ?? 0);
      gl.uniform1f(uViscosity, viscosity);
      gl.uniform1f(uTurbulence, turbulence);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [preset, viscosity, speed, turbulence, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block pointer-events-none ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
};
