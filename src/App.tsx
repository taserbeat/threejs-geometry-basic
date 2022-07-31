import { useEffect, useRef } from "react";
import * as THREE from "three";
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

// マテリアル
const material = new THREE.MeshNormalMaterial({
  // wireframe: true,
});

// メッシュ化
const boxMesh = new THREE.Mesh(boxGeometry, material);
scene.add(boxMesh);

// ライト
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// マウス操作
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// クロック
const clock = new THREE.Clock();

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
      const elapsedTime = clock.getElapsedTime();
      // console.log(elapsedTime);

      //オブジェクトの回転
      // sphere.rotation.x = elapsedTime;
      // plane.rotation.x = elapsedTime;
      // octahedron.rotation.x = elapsedTime;
      // torus.rotation.x = elapsedTime;

      // sphere.rotation.y = elapsedTime;
      // plane.rotation.y = elapsedTime;
      // octahedron.rotation.y = elapsedTime;

      // torus.rotation.y = elapsedTime;

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
