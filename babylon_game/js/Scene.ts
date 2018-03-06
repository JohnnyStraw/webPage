/**
 * Created by Jani on 2018.01.04..
 */

import {Charge} from "./Charge"
import {Spaceship} from "./Spaceship"

class Scene{
    canvas;
    engine;
    scene;
    camera;
    light;
    light2;
    light3;
    light4;
    light5;
    light6;
    charges;
    spaceship;
    target_vector;
    text1;
    counter=2;
    text1_visible=true;

    constructor(canvasElement){
        this.canvas = document.getElementById(canvasElement);
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.camera=new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), this.scene);
        this.camera.attachControl(this.canvas, true);
        this.light=new BABYLON.PointLight("light1", new BABYLON.Vector3(0, 155, 800), this.scene);
        this.light3=new BABYLON.PointLight("light3", new BABYLON.Vector3(700, 155, 330), this.scene);
        this.light4=new BABYLON.PointLight("light4", new BABYLON.Vector3(-700, 155, 200), this.scene);
        this.light5=new BABYLON.PointLight("light3", new BABYLON.Vector3(0, 500, 330), this.scene);
        this.light6=new BABYLON.PointLight("light3", new BABYLON.Vector3(0, -500, 200), this.scene);
        this.light2=new BABYLON.PointLight("light2", new BABYLON.Vector3(300, 200, 80), this.scene);
        this.light2.instensity=2.5;
        this.charges=[];
        this.target_vector=new BABYLON.Vector3(0,120,-1350);



    }

    addGround(){
        let ground = BABYLON.MeshBuilder.CreateGround("ground", {width:555,height:1200}, this.scene);
        ground.position.y=-110;
        ground.position.z=-600;
        let groundmaterial = new BABYLON.StandardMaterial("myMaterial", this.scene);
        groundmaterial.diffuseTexture = new BABYLON.Texture("././img/Triple-Ground-Mulch.png", this.scene);
        ground.material=groundmaterial;
        ground.physicsImpostor=new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 ,restitution: Math.random() }, this.scene);


    }
    addGUI(){
        let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        this.text1 = new BABYLON.GUI.TextBlock();
        this.text1.verticalAlignment=1;
        this.text1.text = "Press x to change perspective";
        this.text1.color = "blue";
        this.text1.fontSize = 24;
        this.text1.alpha=0.75;
        advancedTexture.addControl(this.text1);



    }
    addWall(x,turn=false){
        let ground = BABYLON.MeshBuilder.CreateGround("ground", {width:600,height:1200}, this.scene);
        ground.position.z=-600;
        ground.position.y=155;
        ground.position.x=x;
        let groundmaterial = new BABYLON.StandardMaterial("myMaterial", this.scene);
        groundmaterial.diffuseTexture = new BABYLON.Texture("././img/Triple-Ground-Mulch.png", this.scene);
        ground.material=groundmaterial;
        ground.physicsImpostor=new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 ,restitution: Math.random() }, this.scene);

        if(turn==true){
            let axis = new BABYLON.Vector3(0, 0,  1);
            let angle = Math.PI+Math.PI/2;
            //add new if error
            let quaternion = BABYLON.Quaternion.RotationAxis(axis, angle);
            ground.rotationQuaternion = quaternion;

        }
        else{
            let axis = new BABYLON.Vector3(0, 0, 1);
            let angle = Math.PI/2;
            //add new if error
            let quaternion = BABYLON.Quaternion.RotationAxis(axis, angle);
            ground.rotationQuaternion = quaternion;
        }

    }

    DisposeAfterTime(seconds){
        this.counter++;
        if (this.counter%(seconds*60)==0) {
            this.text1.isVisible=false;
            this.text1_visible=false;
        }

    }




    addlistener(scene,canvas,follow_target,target_vector){
        let k=2;
        let ground=undefined;
        let wall1=undefined;
        let wall2=undefined;

    window.addEventListener("keydown", function (evt) {
        if (evt.keyCode == 220 && k%2==0) {
            ground = BABYLON.MeshBuilder.CreateGround("ground", {width:555,height:1200}, scene);
            ground.position.y=-110;
            ground.position.z=-600;
            let groundmaterial = new BABYLON.StandardMaterial("myMaterial", scene);
            groundmaterial.diffuseTexture = new BABYLON.Texture("././img/Triple-Ground-Mulch.png", scene);
            ground.material=groundmaterial;
            ground.physicsImpostor=new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 ,restitution: Math.random() }, scene);


            wall1 = BABYLON.MeshBuilder.CreateGround("ground", {width:600,height:1200}, scene);
            wall1.position.z=-600;
            wall1.position.y=155;
            wall1.position.x=250;
            groundmaterial.diffuseTexture = new BABYLON.Texture("././img/Triple-Ground-Mulch.png", scene);
            wall1.material=groundmaterial;
            wall1.physicsImpostor=new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 ,restitution: Math.random() }, scene);

            let axis = new BABYLON.Vector3(0, 0, 1);
            let angle = Math.PI/2;
            //add new if error
            let quaternion = BABYLON.Quaternion.RotationAxis(axis, angle);
            wall1.rotationQuaternion = quaternion;


            wall2 = BABYLON.MeshBuilder.CreateGround("ground", {width:600,height:1200}, scene);
            wall2.position.z=-600;
            wall2.position.y=155;
            wall2.position.x=-250;
            groundmaterial.diffuseTexture = new BABYLON.Texture("././img/Triple-Ground-Mulch.png", scene);
            wall2.material=groundmaterial;
            wall2.physicsImpostor=new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 ,restitution: Math.random() }, scene);

            axis = new BABYLON.Vector3(0, 0,  1);
            angle = Math.PI+Math.PI/2;
            //add new if error
            quaternion = BABYLON.Quaternion.RotationAxis(axis, angle);
            wall2.rotationQuaternion = quaternion;
            k=k+1;
        }
        else if (evt.keyCode == 220 && k%2!=0) {
            wall1.dispose();
            wall2.dispose();
            ground.dispose();
            k=k+1;
        }
        else if(evt.keyCode == 88 && k%2==0){
            console.log("Follow Camera ON");
            let camera = new BABYLON.FollowCamera("FollowCam", follow_target.position().subtract(new BABYLON.Vector3(0,0,-20)), scene);
            camera.radius = 25;
            camera.heightOffset = 0;

            camera.rotationOffset = 0;

            camera.cameraAcceleration = 0.01;

            camera.maxCameraSpeed = 12;
            camera.attachControl(canvas, true);
            camera.lockedTarget = follow_target.body;
            scene.activeCamera = camera;
            k++;
        }
        else if(evt.keyCode == 88 && k%2!=0){
            console.log("Free Camera ON");
            let camera=new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, follow_target.position().subtract(new BABYLON.Vector3(0,0,-20)), scene);
            camera.attachControl(canvas, true);
            scene.activeCamera = camera;
            k++;
        }
        else if(evt.keyCode == 77 ){
            follow_target.body.physicsImpostor.applyForce(target_vector.subtract(follow_target.position()).normalize().scale(3000),follow_target.position())
        }

        })
}


    SetScene(){
        let gravityVector = new BABYLON.Vector3(0,0, 0);
        let physicsPlugin = new BABYLON.CannonJSPlugin();
        this.scene.enablePhysics(gravityVector, physicsPlugin);
        let envTexture = new BABYLON.CubeTexture("././img/skybox/SkyBox.dds", this.scene);
        this.scene.createDefaultSkybox(envTexture, true, 5000);

        for(let i=0;i<15;i++){
            if(i<5 ){
                this.charges.push(new Charge("sphere",this.scene,42,"././img/lava.jpg",0));
                this.charges[i].setCharge("negative",200)
            }
            else {
                this.charges.push(new Charge("sphere", this.scene, 42, "././img/astero.jpg", 0));
                this.charges[i].setCharge("negative", 200)
            }
        }

        this.charges.push(new Charge("sphere",this.scene,120,"././img/earth.png",0,this.target_vector));
        this.charges[this.charges.length-1].setCharge("negative",600);
        this.charges.push(new Charge("sphere",this.scene,200,"././img/sun.jpg",0,new BABYLON.Vector3(0,155,400)));
        this.charges[this.charges.length-1].setCharge("negative",850);
        this.spaceship=new Spaceship("saucer",this.scene,8.5,"././img/ship.jpg",42);
        this.spaceship.setCharge("positive",150);
        this.spaceship.setPosition(new BABYLON.Vector3(0,0,-30));
        this.addGUI();




        this.addlistener(this.scene,this.canvas,this.spaceship,this.target_vector);
        //      BABYLON.SceneLoader.ImportMesh("","./","falcon.babylon",this.scene,function (newMeshes) {
          //    let falcon = newMeshes[0];
            //  console.log(falcon);
        //      });


    }
    Run(){
        this.spaceship.applyCoulomb(this.charges);
        this.spaceship.applyRockets(1100,this.target_vector);
        if(this.text1_visible==true){
        this.DisposeAfterTime(10);}
        //this.charge_chosen.ApplyRandom(10,this.target_vector);
        //console.log(this.charge_chosen.body.physicsImpostor.getLinearVelocity())
        //Charge.applyCoulomb(this.charges);

    }
    GetScene(){
        return this.scene;
    }
    doRender() : void {

        // run the render loop
        this.engine.runRenderLoop(() => {
            this.scene.render();
            this.Run();

        });




        // the canvas/window resize event handler
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }

}

window.addEventListener('DOMContentLoaded', () => {
    // Create the game using the 'renderCanvas'
    let scene = new Scene('renderCanvas');

    // Create the scene
    scene.SetScene();

    // start animation
    scene.doRender();
});

