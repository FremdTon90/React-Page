import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function OrganicSphereVisualizer({ audioAnalyser }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Szene, Kamera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.set(0, 0, 6)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    // Licht
    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const pointLight = new THREE.PointLight(0xffffff, 0.8)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    // Kugel-Geometrie mit halb so vielen Flächen (Detail 15 statt 30)
    const geometry = new THREE.IcosahedronGeometry(4, 15)

    // Material halbtransparent, ganz hellblau, doppelseitig, depthWrite false für Transparenz
    const material = new THREE.MeshPhongMaterial({
      color: 0xddeeff,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
      depthWrite: false,
      shininess: 50,
      specular: 0xaaaaaa,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Linien (Edges) der Geometrie
    const edges = new THREE.EdgesGeometry(geometry)
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true })
    const wireframe = new THREE.LineSegments(edges, lineMaterial)
    scene.add(wireframe)

    // Animation
    let animationId

    function animate() {
      animationId = requestAnimationFrame(animate)

      // Rotation leicht für organischen Effekt
      mesh.rotation.y += 0.003
      mesh.rotation.x += 0.0015
      wireframe.rotation.copy(mesh.rotation)

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Resize Handler
    function handleResize() {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      controls.dispose()
      geometry.dispose()
      material.dispose()
      edges.dispose()
      lineMaterial.dispose()
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
