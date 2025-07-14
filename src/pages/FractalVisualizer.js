import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

export default function OrganicSphereVisualizer({ audioAnalyser }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 6)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const pointLight = new THREE.PointLight(0xffffff, 1.0)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    const geometry = new THREE.IcosahedronGeometry(4, 6)

    const uniforms = {
      u_time: { value: 0 },
      u_audioLevel: { value: 0 },
    }

    const vertexShader = `
      uniform float u_time;
      uniform float u_audioLevel;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vNewPosition;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      float snoise(vec3 v) {
        const vec2  C = vec2(1.0/6.0, 1.0/3.0);
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 =   v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute( permute( permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 1.0/7.0;
        vec3  ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1),
          dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
          dot(p2,x2), dot(p3,x3) ) );
      }

      void main() {
        vNormal = normal;
        vPosition = position;

        float noise = snoise(normal * 2.0 + u_time * 0.25);
        float audioInfluence = u_audioLevel * 2.0;

        vec3 newPosition = position + normal * noise * (0.4 + audioInfluence);

        vNewPosition = newPosition;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `

    const fragmentShader = `
      varying vec3 vPosition;
      varying vec3 vNewPosition;

      void main() {
        float displacement = length(vNewPosition - vPosition);

        vec3 white = vec3(1.0, 1.0, 1.0);
        vec3 yellow = vec3(1.0, 1.0, 0.0);
        vec3 green = vec3(0.0, 1.0, 0.0);
        vec3 red = vec3(1.0, 0.0, 0.0);

        // Wenn sehr klein, bleib komplett weiß (kein Ton)
        if (displacement < 0.05) {
          gl_FragColor = vec4(white, 1.0);
          return;
        }

        // Normale Interpolation der Farben mit smoothstep für smoothen Übergang
        float t = smoothstep(0.05, 0.8, displacement);

        vec3 color1 = mix(white, yellow, smoothstep(0.05, 0.25, displacement));
        vec3 color2 = mix(yellow, green, smoothstep(0.25, 0.5, displacement));
        vec3 color3 = mix(green, red, smoothstep(0.5, 0.8, displacement));

        // Nun alle drei Farben zusammenfassen
        vec3 color;
        if (displacement < 0.25) {
          color = color1;
        } else if (displacement < 0.5) {
          color = color2;
        } else {
          color = color3;
        }

        gl_FragColor = vec4(color, 1.0);
      }
    `

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      wireframe: true,
      transparent: true,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(
      new UnrealBloomPass(
        new THREE.Vector2(container.clientWidth, container.clientHeight),
        1.3,
        0.4,
        0.1
      )
    )

    const clock = new THREE.Clock()
    let animationId

    function animate() {
      animationId = requestAnimationFrame(animate)
      uniforms.u_time.value = clock.getElapsedTime()

      if (audioAnalyser) {
        const dataArray = new Uint8Array(audioAnalyser.frequencyBinCount)
        audioAnalyser.getByteFrequencyData(dataArray)
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length
        uniforms.u_audioLevel.value = avg / 255
      } else {
        uniforms.u_audioLevel.value = 0
      }

      mesh.rotation.y += 0.0015
      mesh.rotation.x += 0.0015
      controls.update()
      composer.render()
    }

    animate()

    function handleResize() {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
      composer.setSize(container.clientWidth, container.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      controls.dispose()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement && container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [audioAnalyser])

  return React.createElement('div', {
    ref: containerRef,
    style: { width: '100%', height: 400, touchAction: 'none' },
  })
}
