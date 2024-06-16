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
    const box = BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, scene);
    box.position.y = 1;
    // ライトを生成する
    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
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
