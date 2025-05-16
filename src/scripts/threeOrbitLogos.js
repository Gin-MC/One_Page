import * as THREE from 'three';

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('three-container');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 300;

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const logoGroup = new THREE.Group();
  scene.add(logoGroup);

  const logos = [
    "astro", "css", "c", "html", "javascript", "git", "github", "nodejs", "postgresql", 
    "sql", "visual-studio-code", "viento-de-cola", "google", "ver-js"
  ];

  const radius = 150;
  const loader = new THREE.TextureLoader();

  logos.concat(logos).forEach((name, i) => {
    const path = `/tecnologias/${name}.svg`;
    loader.load(path, (texture) => {
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.7 });
      const sprite = new THREE.Sprite(material);

      const phi = Math.acos(-1 + (2 * i) / (logos.length * 2));
      const theta = Math.sqrt((logos.length * 2) * Math.PI) * phi;

      const spherical = new THREE.Spherical(radius, phi, theta);
      const position = new THREE.Vector3().setFromSpherical(spherical);

      sprite.position.copy(position);
      sprite.scale.set(40, 40, 1);

      logoGroup.add(sprite);
    });
  });

  function animate() {
    requestAnimationFrame(animate);
    logoGroup.rotation.y += 0.004;
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
});
