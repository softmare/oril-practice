import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AtmosphericComponent, BoxGeometry, Camera3D, DirectLight, Engine3D, HoverCameraController, LitMaterial, MeshRenderer, Object3D, Scene3D, View3D } from '@orillusion/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('canvas') canvas: any;

  title = 'Orillusion';

  constructor() {
  }

  ngAfterViewInit() {
    this.playDemo();
  }

  async playDemo() {
    await Engine3D.init({
      canvasConfig: {
        canvas: this.canvas.nativeElement,
      }

    }).then(res => console.log('good')).catch(err => console.error('not good'));

    const scene = new Scene3D();
    const sky = scene.addComponent(AtmosphericComponent);
    const camObj = new Object3D();
    const cam = camObj.addComponent(Camera3D);
    cam.perspective(60, window.innerWidth / window.innerHeight, 0.1, 5000);
    const controller = camObj.addComponent(HoverCameraController);
    controller.setCamera(0, 0, 15);
    scene.addChild(camObj);

    const lightObj = new Object3D();
    const light = lightObj.addComponent(DirectLight);
    lightObj.rotationX = 45;
    lightObj.rotationY = 30;
    light.intensity = 2;
    scene.addChild(lightObj);

    const cubeObj = new Object3D();
    const mr = cubeObj.addComponent(MeshRenderer);
    mr.geometry = new BoxGeometry(5, 5, 5);
    mr.material = new LitMaterial();

    scene.addChild(cubeObj);

    const view = new View3D();
    view.scene = scene;
    view.camera = cam;
    Engine3D.startRenderView(view);
  }
}