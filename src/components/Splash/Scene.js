import * as THREE from 'three';
import fontSrc from './druk.txt';

export default class Scene {
  constructor(el) {
    this.parent = el;
    this.container = null;
    this.camera = null;
    this.cameraTarget = null;
    this.scene = null;
    this.renderer = null;
    this.group = null;
    this.text = null;
    this.tex2 = null;
    this.light = null;
    this.lightPoint = null;
    this.targetRotation = 0;
    this.targetRotationOnMouseDown = 0;
    this.mouseX = 0;
    this.mouseXOnMouseDown = 0;
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.hasScrolled = false;

    this.init();
  }

  addCamera() {
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.set(0, 150, 500);
  }

  addLights() {
    this.light = new THREE.HemisphereLight(0xffffff, 1);
    this.light.position.set(50, 50, 50);
    this.scene.add(this.light);
  }

  // ------------------------------------------------
  // Text is utilizing Druk.js file
  //

  addText() {
    const topText = 'VINYL';
    const bottomText = 'MARKETWATCH';

    const loader = new THREE.FontLoader();

    loader.load(fontSrc, font => {
      const topExtrude = new THREE.TextGeometry(topText, {
        size: 90,
        height: 50,
        curveSegments: 2,
        font: font,
        weight: 'normal'
      });

      const bottomExtrude = new THREE.TextGeometry(bottomText, {
        size: 30,
        height: 50,
        curveSegments: 2,
        font: font
      });

      topExtrude.computeBoundingBox();
      bottomExtrude.computeBoundingBox();

      let topCenterOffset =
        -0.5 * (topExtrude.boundingBox.max.x - topExtrude.boundingBox.min.x);
      let bottomCenterOffset =
        -0.5 *
        (bottomExtrude.boundingBox.max.x - bottomExtrude.boundingBox.min.x);

      const textMaterial = new THREE.MeshPhongMaterial({
        color: 'blue',
        specular: 0xffffff,
        shininess: 100
      });

      const topTextRender = new THREE.Mesh(topExtrude, textMaterial);
      const bottomTextRender = new THREE.Mesh(bottomExtrude, textMaterial);

      topTextRender.position.x = topCenterOffset;
      topTextRender.position.y = 160;
      topTextRender.position.z = 0;
      topTextRender.rotation.y = Math.PI * 2;

      bottomTextRender.position.x = bottomCenterOffset;
      bottomTextRender.position.y = 110;
      bottomTextRender.position.z = 0;
      bottomTextRender.rotation.y = Math.PI * 2;

      this.group = new THREE.Group();
      this.group.add(topTextRender);
      this.group.add(bottomTextRender);

      this.scene.add(this.group);
    });
  }

  render() {
    if (this.group) {
      this.group.rotation.y +=
        (this.targetRotation - this.group.rotation.y) * 0.05;
      this.renderer.render(this.scene, this.camera);
    }
  }

  animate() {
    let self = this;

    requestAnimationFrame(function() {
      self.animate();
    });

    this.render();
  }

  onMouseMove(event, self) {
    self.windowHalfX = window.innerWidth / 2;

    self.mouseX = event.clientX - self.windowHalfX;

    self.targetRotation =
      self.targetRotationOnMouseDown +
      (self.mouseX - self.mouseXOnMouseDown) * 0.02;
  }

  init() {
    let self = this;

    self.targetRotation = 0;
    self.targetRotationOnMouseDown = 0;
    self.mouseX = 0;
    self.mouseXOnMouseDown = 0;

    self.container = this.parent;
    self.container.style.zIndex = 999999;

    // ------------------------------------------------
    // Add camera
    //
    self.addCamera();

    // ------------------------------------------------
    // Setup scene
    //
    self.scene = new THREE.Scene();

    // ------------------------------------------------
    // Add lights
    //
    self.addLights();

    // ------------------------------------------------
    // Add Text
    //
    self.addText();

    // ------------------------------------------------
    // Setup renderer
    //
    self.renderer = new THREE.WebGLRenderer({
      alpha: true
    });

    self.renderer.setClearColor(0xffffff, 0);
    self.renderer.setPixelRatio(window.devicePixelRatio);
    self.renderer.setSize(window.innerWidth, window.innerHeight);

    self.container.appendChild(self.renderer.domElement);

    // ------------------------------------------------
    // Bind movement
    //

    document.addEventListener(
      'mousemove',
      function(event) {
        self.onMouseMove(event, self);
      },
      false
    );

    window.addEventListener(
      'resize',
      function() {
        self.onResize();
      },
      false
    );

    self.animate();
  }

  destroy() {
    let self = this;

    window.removeEventListener('resize', self.onResize);
  }

  onResize() {
    let self = this;
    self.windowHalfX = window.innerWidth / 2;
    self.windowHalfY = window.innerHeight / 2;

    self.camera.aspect = window.innerWidth / window.innerHeight;
    self.camera.updateProjectionMatrix();

    self.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
