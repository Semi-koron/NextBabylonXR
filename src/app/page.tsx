"use client";
import React from "react";
import Style from "./page.module.css";
import * as BABYLON from "babylonjs";
import { Engine, Scene, FreeCamera } from "babylonjs";

export default function Home() {
  let canvas: HTMLCanvasElement;
  let engine: Engine;
  let scene: Scene;

  // シーンをセットアップする
  const setupScene = async () => {
    canvas = (await document.getElementById(
      "renderCanvas"
    )) as HTMLCanvasElement;
    engine = new Engine(canvas, true);
    scene = new Scene(engine);
    scene.clearColor = new BABYLON.Color4(0.1, 0.1, 0.1, 1);
    // カメラを生成する
    const camera = new FreeCamera(
      "camera",
      new BABYLON.Vector3(0, 5, -10),
      scene
    );
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    // メッシュを生成する
    const box = BABYLON.MeshBuilder.CreateBox("box", { size: 0.1 }, scene);
    box.position.y = 1;
    // ライトを生成する
    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    // XRエクスペリエンスを生成する
    const xr = await scene.createDefaultXRExperienceAsync({
      uiOptions: {
        sessionMode: "immersive-ar",
      },
    });
    // const fm = xr.baseExperience.featuresManager;
    // const imageTracking = fm.enableFeature(
    //   BABYLON.WebXRFeatureName.IMAGE_TRACKING,
    //   "latest",
    //   {
    //     images: [
    //       {
    //         //URL to the image that is being tracked (you need to change it with your image, and update its real world width in meters)
    //         src: "https://thomlucc.github.io/Assets/MarsDemo/beach.png",
    //         estimatedRealWorldWidth: 0.15,
    //       },
    //     ],
    //   }
    // ) as BABYLON.WebXRImageTracking;
    // //画像が見つかったらboxを表示する
    // imageTracking.onTrackableImageFoundObservable.add((event) => {
    //   // メッシュを生成し、トラッカー画像の位置に配置する
    //   const trackedBox = BABYLON.MeshBuilder.CreateBox(
    //     "trackedBox",
    //     { size: 0.1 },
    //     scene
    //   );
    // });
    // レンダリングする
    engine.runRenderLoop(() => {
      scene.render();
    });
  };

  setupScene();

  return (
    <div>
      <canvas id="renderCanvas" className={Style.canvas}></canvas>
    </div>
  );
}
