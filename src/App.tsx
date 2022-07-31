import { useEffect, useRef } from "react";
import * as THREE from "three";
import { PlaneGeometry } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import "./App.css";

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

// シーン
const scene = new THREE.Scene();

// カメラ
const CAMERA_FOV = 75;
const [CAMERA_START_DISTANCE, CAMERA_END_DISTANCE] = [0.1, 100];
const camera = new THREE.PerspectiveCamera(
  CAMERA_FOV,
  window.innerWidth / window.innerHeight,
  CAMERA_START_DISTANCE,
  CAMERA_END_DISTANCE
);
camera.position.set(1, 1, 2);

// レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * ジオメトリを作ってみよう
 **/
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 16);
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 15, 100, 2 * Math.PI);

// マテリアル
const material = new THREE.MeshNormalMaterial({
  // wireframe: true,
});

// メッシュ化
const boxMesh = new THREE.Mesh(boxGeometry, material);

const sphereMesh = new THREE.Mesh(sphereGeometry, material);
sphereMesh.position.x = 1.5;

const planeMesh = new THREE.Mesh(planeGeometry, material);
planeMesh.rotation.x = -Math.PI * 0.5;
planeMesh.position.y = -0.5;

const torusMesh = new THREE.Mesh(torusGeometry, material);
torusMesh.position.x = -1.5;

scene.add(boxMesh, sphereMesh, planeMesh, torusMesh);

// ライト
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// マウス操作
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

function App() {
  const divRef = useRef<HTMLDivElement>(null);

  /** ブラウザのリサイズ時の処理 */
  const handleOnBrowserResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    return;
  };

  useEffect(() => {
    window.addEventListener("resize", handleOnBrowserResize);

    divRef.current?.appendChild(renderer.domElement);

    const updateRender = () => {
      controls.update();

      // レンダリング
      renderer.render(scene, camera);
      requestAnimationFrame(updateRender);
    };

    updateRender();

    return () => {
      divRef.current?.removeChild(renderer.domElement);
      removeEventListener("resize", handleOnBrowserResize);
    };
  }, []);

  return (
    <div className="App">
      <div className="scene" ref={divRef}></div>
    </div>
  );
}

export default App;
