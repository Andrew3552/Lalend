import { useRef, useEffect } from "react";
import * as THREE from "three";
import "./AudioSphereVisualizer.scss";

export default function AudioSphereVisualizer({ audioLevel = 0 }) {
  const mountRef = useRef(null);
  const audioLevelRef = useRef(audioLevel);

  // Обновляем ref при каждом рендере
  audioLevelRef.current = audioLevel;

  useEffect(() => {
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    const radius = 1.5;
    const detail = 40;
    const geometry = new THREE.IcosahedronGeometry(1, detail);

    const createDot = (size = 32, color = "#FFFFFF") => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d");
      const sizeH = size * 0.5;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(sizeH, sizeH, sizeH, 0, Math.PI * 2);
      ctx.fill();
      return new THREE.CanvasTexture(canvas);
    };

    const material = new THREE.PointsMaterial({
      map: createDot(),
      blending: THREE.AdditiveBlending,
      color: 0x101A88,
      depthTest: false,
      transparent: true,
    });

    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);

    material.onBeforeCompile = (shader) => {
      shader.uniforms.time = { value: 0 };
      shader.uniforms.radius = { value: radius };
      shader.uniforms.particleSizeMin = { value: 0.01 };
      shader.uniforms.particleSizeMax = { value: 0.08 };

      shader.vertexShader = `
        uniform float particleSizeMax;
        uniform float particleSizeMin;
        uniform float radius;
        uniform float time;

        vec3 mod289(vec3 x) {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }
        vec4 mod289(vec4 x) {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }
        vec4 permute(vec4 x) {
          return mod289(((x*34.0)+10.0)*x);
        }
        vec4 taylorInvSqrt(vec4 r) {
          return 1.79284291400159 - 0.85373472095314 * r;
        }
        float snoise(vec3 v) {
          const vec2  C = vec2(1.0/6.0, 1.0/3.0);
          const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0)) +
            i.y + vec4(0.0, i1.y, i2.y, 1.0)) +
            i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 0.142857142857;
          vec3  ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          vec3 p0 = vec3(a0.xy,h.x);
          vec3 p1 = vec3(a0.zw,h.y);
          vec3 p2 = vec3(a1.xy,h.z);
          vec3 p3 = vec3(a1.zw,h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 105.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }
      ` + shader.vertexShader;

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
          vec3 p = position;
          float n = snoise(vec3(p.x*0.6 + time*0.2, p.y*0.4 + time*0.3, p.z*0.2 + time*0.2));
          p += n * 0.4;
          float l = radius / length(p);
          p *= l;
          float s = mix(particleSizeMin, particleSizeMax, n);
          vec3 transformed = p;
        `
      );

      shader.vertexShader = shader.vertexShader.replace(
        'gl_PointSize = size;',
        'gl_PointSize = s;'
      );

      material.userData.shader = shader;
    };

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      // Берём значение громкости через ref
      const level = audioLevelRef.current / 100;
      const scale = 1 + level * 0.25;
      mesh.scale.set(scale, scale, scale);

      mesh.rotation.set(0, clock.getElapsedTime() * 0.2, 0);

      if (material.userData.shader) {
        material.userData.shader.uniforms.time.value = clock.getElapsedTime();
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);
  return <div className="audio-visualizer-wrapper" ref={mountRef}></div>;
}
