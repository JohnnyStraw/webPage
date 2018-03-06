(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Jani on 2018. 02. 16..
 */
var Mesh_1 = require("./Mesh");
var Charge = (function (_super) {
    __extends(Charge, _super);
    function Charge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Charge.prototype.setCharge = function (charge, strength) {
        this.charge = charge;
        this.strength = strength;
        if (charge != "positive" && charge != "negative") {
            console.log("Not valid charge");
        }
    };
    Charge.coulombForce = function (first, second) {
        var force = (first.strength * second.strength) / BABYLON.Vector3.DistanceSquared(first.position(), second.position());
        return force;
    };
    Charge.prototype.applyCoulomb = function (charges) {
        for (var i = 0; i < charges.length; i++) {
            if (this.charge == charges[i].charge) {
                this.body.physicsImpostor.applyForce(charges[i].position().subtract(this.position()).normalize().negate().scale(Charge.coulombForce(charges[i], this)), this.position());
            }
            else {
                this.body.physicsImpostor.applyForce(charges[i].position().subtract(this.position()).normalize().scale(Charge.coulombForce(charges[i], this)), this.position());
            }
        }
    };
    Charge.applyCoulomb = function (charges) {
        for (var i = 0; i < charges.length; i++) {
            var j = i + 1;
            for (j; j < charges.length; j++) {
                if (i == j) {
                    continue;
                }
                if (charges[i].charge == "positive" && charges[j].charge == "positive") {
                    charges[i].body.physicsImpostor.applyForce(charges[j].position().subtract(charges[i].position()).normalize().negate().scale(this.coulombForce(charges[i], charges[j])), charges[i].position());
                    charges[j].body.physicsImpostor.applyForce(charges[i].position().subtract(charges[j].position()).normalize().negate().scale(this.coulombForce(charges[i], charges[j])), charges[j].position());
                }
                else if (charges[i].charge == "negative" && charges[j].charge == "negative") {
                    charges[i].body.physicsImpostor.applyForce(charges[j].position().subtract(charges[i].position()).normalize().negate().scale(this.coulombForce(charges[i], charges[j])), charges[i].position());
                    charges[j].body.physicsImpostor.applyForce(charges[i].position().subtract(charges[j].position()).normalize().negate().scale(this.coulombForce(charges[i], charges[j])), charges[j].position());
                }
                else if (charges[i].charge != charges[j].charge) {
                    //console.log(charges[i].position().subtract(charges[j].position()).normalize().negate().scale(this.coulombForce(charges[i],charges[j])));
                    charges[i].body.physicsImpostor.applyForce(charges[j].position().subtract(charges[i].position()).normalize().scale(this.coulombForce(charges[i], charges[j])), charges[i].position());
                    charges[j].body.physicsImpostor.applyForce(charges[i].position().subtract(charges[j].position()).normalize().scale(this.coulombForce(charges[i], charges[j])), charges[j].position());
                }
            }
        }
    };
    return Charge;
}(Mesh_1.Mesh));
exports.Charge = Charge;

},{"./Mesh":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mesh = (function () {
    function Mesh(type, scene, size, texture, mass, position) {
        if (mass === void 0) { mass = 1; }
        this.scene = scene;
        this.rocket = undefined;
        this.start_distance = 0;
        this.new_distance = Infinity;
        this.counter = 0;
        if (type === "sphere") {
            this.body = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: size }, this.scene);
            this.type = "sphere";
            this.body.physicsImpostor = new BABYLON.PhysicsImpostor(this.body, BABYLON.PhysicsImpostor.SphereImpostor, { mass: Math.random() * mass, restitution: 0.1 }, this.scene);
        }
        else if (type == "saucer") {
            this.body = BABYLON.MeshBuilder.CreateSphere("sphere", { diameterX: size, diameterY: size / 2.5, diameterZ: size }, this.scene);
            this.type = "sphere";
            this.body.physicsImpostor = new BABYLON.PhysicsImpostor(this.body, BABYLON.PhysicsImpostor.SphereImpostor, { mass: Math.random() * mass, restitution: 0.1 }, this.scene);
        }
        else if (type === "box") {
            this.body = BABYLON.MeshBuilder.CreateBox("box", { size: size }, this.scene);
            this.type = "box";
        }
        if (position === undefined) {
            this.body.setPositionWithLocalVector(new BABYLON.Vector3((Math.random() - 0.5) * 333, (Math.random() - 0.2) * 355, (Math.random() + 0.1) * -950));
        }
        else {
            this.body.setPositionWithLocalVector(position);
        }
        if (texture != undefined) {
            var myMaterial = new BABYLON.StandardMaterial("myMaterial", this.scene);
            myMaterial.diffuseTexture = new BABYLON.Texture(texture, this.scene);
            this.body.material = myMaterial;
        }
        this.texture = this.body.material;
    }
    Mesh.prototype.position = function () {
        return this.body.getAbsolutePosition();
    };
    Mesh.prototype.setPosition = function (x) {
        this.body.setPositionWithLocalVector(x);
    };
    Mesh.prototype.applyMyForce = function (type, others) {
        if (type === "random") {
            this.body.physicsImpostor.applyForce(new BABYLON.Vector3(Math.random() * 0.000015, Math.random() * 0.000015, Math.random() * 0.000015), this.position());
        }
        else if (type === "gravity") {
            for (var i = 0; i < others.length - 1; i++) {
                others[i].body.physicsImpostor.applyForce(this.position().subtract(others[i].position()).normalize().scale(10), this.position());
            }
        }
        else if (type === "repulsion") {
            for (var i = 0; i < others.length - 1; i++) {
                others[i].body.physicsImpostor.applyForce(this.position().subtract(others[i].position()).normalize().scale(10).negate(), this.position());
            }
        }
    };
    return Mesh;
}());
exports.Mesh = Mesh;

},{}],3:[function(require,module,exports){
"use strict";
/**
 * Created by Jani on 2018.01.04..
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Charge_1 = require("./Charge");
var Spaceship_1 = require("./Spaceship");
var Scene = (function () {
    function Scene(canvasElement) {
        this.counter = 2;
        this.text1_visible = true;
        this.canvas = document.getElementById(canvasElement);
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), this.scene);
        this.camera.attachControl(this.canvas, true);
        this.light = new BABYLON.PointLight("light1", new BABYLON.Vector3(0, 155, 800), this.scene);
        this.light3 = new BABYLON.PointLight("light3", new BABYLON.Vector3(700, 155, 330), this.scene);
        this.light4 = new BABYLON.PointLight("light4", new BABYLON.Vector3(-700, 155, 200), this.scene);
        this.light5 = new BABYLON.PointLight("light3", new BABYLON.Vector3(0, 500, 330), this.scene);
        this.light6 = new BABYLON.PointLight("light3", new BABYLON.Vector3(0, -500, 200), this.scene);
        this.light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(300, 200, 80), this.scene);
        this.light2.instensity = 2.5;
        this.charges = [];
        this.target_vector = new BABYLON.Vector3(0, 120, -1350);
    }
    Scene.prototype.addGround = function () {
        var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 555, height: 1200 }, this.scene);
        ground.position.y = -110;
        ground.position.z = -600;
        var groundmaterial = new BABYLON.StandardMaterial("myMaterial", this.scene);
        groundmaterial.diffuseTexture = new BABYLON.Texture("././img/Triple-Ground-Mulch.png", this.scene);
        ground.material = groundmaterial;
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: Math.random() }, this.scene);
    };
    Scene.prototype.addGUI = function () {
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        this.text1 = new BABYLON.GUI.TextBlock();
        this.text1.verticalAlignment = 1;
        this.text1.text = "Press x to change perspective";
        this.text1.color = "blue";
        this.text1.fontSize = 24;
        this.text1.alpha = 0.75;
        advancedTexture.addControl(this.text1);
    };
    Scene.prototype.addWall = function (x, turn) {
        if (turn === void 0) { turn = false; }
        var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 600, height: 1200 }, this.scene);
        ground.position.z = -600;
        ground.position.y = 155;
        ground.position.x = x;
        var groundmaterial = new BABYLON.StandardMaterial("myMaterial", this.scene);
        groundmaterial.diffuseTexture = new BABYLON.Texture("././img/Triple-Ground-Mulch.png", this.scene);
        ground.material = groundmaterial;
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: Math.random() }, this.scene);
        if (turn == true) {
            var axis = new BABYLON.Vector3(0, 0, 1);
            var angle = Math.PI + Math.PI / 2;
            //add new if error
            var quaternion = BABYLON.Quaternion.RotationAxis(axis, angle);
            ground.rotationQuaternion = quaternion;
        }
        else {
            var axis = new BABYLON.Vector3(0, 0, 1);
            var angle = Math.PI / 2;
            //add new if error
            var quaternion = BABYLON.Quaternion.RotationAxis(axis, angle);
            ground.rotationQuaternion = quaternion;
        }
    };
    Scene.prototype.DisposeAfterTime = function (seconds) {
        this.counter++;
        if (this.counter % (seconds * 60) == 0) {
            this.text1.isVisible = false;
            this.text1_visible = false;
        }
    };
    Scene.prototype.addlistener = function (scene, canvas, follow_target, target_vector) {
        var k = 2;
        var ground = undefined;
        var wall1 = undefined;
        var wall2 = undefined;
        window.addEventListener("keydown", function (evt) {
            if (evt.keyCode == 220 && k % 2 == 0) {
                ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 555, height: 1200 }, scene);
                ground.position.y = -110;
                ground.position.z = -600;
                var groundmaterial = new BABYLON.StandardMaterial("myMaterial", scene);
                groundmaterial.diffuseTexture = new BABYLON.Texture("././img/Triple-Ground-Mulch.png", scene);
                ground.material = groundmaterial;
                ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: Math.random() }, scene);
                wall1 = BABYLON.MeshBuilder.CreateGround("ground", { width: 600, height: 1200 }, scene);
                wall1.position.z = -600;
                wall1.position.y = 155;
                wall1.position.x = 250;
                groundmaterial.diffuseTexture = new BABYLON.Texture("././img/Triple-Ground-Mulch.png", scene);
                wall1.material = groundmaterial;
                wall1.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: Math.random() }, scene);
                var axis = new BABYLON.Vector3(0, 0, 1);
                var angle = Math.PI / 2;
                //add new if error
                var quaternion = BABYLON.Quaternion.RotationAxis(axis, angle);
                wall1.rotationQuaternion = quaternion;
                wall2 = BABYLON.MeshBuilder.CreateGround("ground", { width: 600, height: 1200 }, scene);
                wall2.position.z = -600;
                wall2.position.y = 155;
                wall2.position.x = -250;
                groundmaterial.diffuseTexture = new BABYLON.Texture("././img/Triple-Ground-Mulch.png", scene);
                wall2.material = groundmaterial;
                wall2.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: Math.random() }, scene);
                axis = new BABYLON.Vector3(0, 0, 1);
                angle = Math.PI + Math.PI / 2;
                //add new if error
                quaternion = BABYLON.Quaternion.RotationAxis(axis, angle);
                wall2.rotationQuaternion = quaternion;
                k = k + 1;
            }
            else if (evt.keyCode == 220 && k % 2 != 0) {
                wall1.dispose();
                wall2.dispose();
                ground.dispose();
                k = k + 1;
            }
            else if (evt.keyCode == 88 && k % 2 == 0) {
                console.log("Follow Camera ON");
                var camera = new BABYLON.FollowCamera("FollowCam", follow_target.position().subtract(new BABYLON.Vector3(0, 0, -20)), scene);
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
            else if (evt.keyCode == 88 && k % 2 != 0) {
                console.log("Free Camera ON");
                var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, follow_target.position().subtract(new BABYLON.Vector3(0, 0, -20)), scene);
                camera.attachControl(canvas, true);
                scene.activeCamera = camera;
                k++;
            }
            else if (evt.keyCode == 77) {
                follow_target.body.physicsImpostor.applyForce(target_vector.subtract(follow_target.position()).normalize().scale(3000), follow_target.position());
            }
        });
    };
    Scene.prototype.SetScene = function () {
        var gravityVector = new BABYLON.Vector3(0, 0, 0);
        var physicsPlugin = new BABYLON.CannonJSPlugin();
        this.scene.enablePhysics(gravityVector, physicsPlugin);
        var envTexture = new BABYLON.CubeTexture("././img/skybox/SkyBox.dds", this.scene);
        this.scene.createDefaultSkybox(envTexture, true, 5000);
        for (var i = 0; i < 15; i++) {
            if (i < 5) {
                this.charges.push(new Charge_1.Charge("sphere", this.scene, 42, "././img/lava.jpg", 0));
                this.charges[i].setCharge("negative", 200);
            }
            else {
                this.charges.push(new Charge_1.Charge("sphere", this.scene, 42, "././img/astero.jpg", 0));
                this.charges[i].setCharge("negative", 200);
            }
        }
        this.charges.push(new Charge_1.Charge("sphere", this.scene, 120, "././img/earth.png", 0, this.target_vector));
        this.charges[this.charges.length - 1].setCharge("negative", 600);
        this.charges.push(new Charge_1.Charge("sphere", this.scene, 200, "././img/sun.jpg", 0, new BABYLON.Vector3(0, 155, 400)));
        this.charges[this.charges.length - 1].setCharge("negative", 850);
        this.spaceship = new Spaceship_1.Spaceship("saucer", this.scene, 8.5, "././img/ship.jpg", 42);
        this.spaceship.setCharge("positive", 150);
        this.spaceship.setPosition(new BABYLON.Vector3(0, 0, -30));
        this.addGUI();
        this.addlistener(this.scene, this.canvas, this.spaceship, this.target_vector);
        //      BABYLON.SceneLoader.ImportMesh("","./","falcon.babylon",this.scene,function (newMeshes) {
        //    let falcon = newMeshes[0];
        //  console.log(falcon);
        //      });
    };
    Scene.prototype.Run = function () {
        this.spaceship.applyCoulomb(this.charges);
        this.spaceship.applyRockets(1100, this.target_vector);
        if (this.text1_visible == true) {
            this.DisposeAfterTime(10);
        }
        //this.charge_chosen.ApplyRandom(10,this.target_vector);
        //console.log(this.charge_chosen.body.physicsImpostor.getLinearVelocity())
        //Charge.applyCoulomb(this.charges);
    };
    Scene.prototype.GetScene = function () {
        return this.scene;
    };
    Scene.prototype.doRender = function () {
        var _this = this;
        // run the render loop
        this.engine.runRenderLoop(function () {
            _this.scene.render();
            _this.Run();
        });
        // the canvas/window resize event handler
        window.addEventListener('resize', function () {
            _this.engine.resize();
        });
    };
    return Scene;
}());
window.addEventListener('DOMContentLoaded', function () {
    // Create the game using the 'renderCanvas'
    var scene = new Scene('renderCanvas');
    // Create the scene
    scene.SetScene();
    // start animation
    scene.doRender();
});

},{"./Charge":1,"./Spaceship":4}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Jani on 2018. 02. 16..
 */
var Charge_1 = require("./Charge");
var Spaceship = (function (_super) {
    __extends(Spaceship, _super);
    function Spaceship() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.start_distance = 0;
        _this.new_distance = Infinity;
        _this.counter = 0;
        return _this;
    }
    Spaceship.prototype.applyRockets = function (force, target) {
        this.counter++;
        console.log(this.counter);
        if (this.counter % 61 == 0) {
            if (this.start_distance == 0 && this.new_distance == Infinity) {
                this.start_distance = BABYLON.Vector3.DistanceSquared(this.position(), target);
                this.body.physicsImpostor.applyForce(target.subtract(this.position()).normalize().scale(force), this.position());
                console.log("Target locked...");
            }
            else if (this.start_distance != 0 && this.new_distance == Infinity) {
                this.new_distance = BABYLON.Vector3.DistanceSquared(this.position(), target);
            }
            else {
                this.start_distance = this.new_distance;
                this.new_distance = BABYLON.Vector3.DistanceSquared(this.position(), target);
            }
            if (this.new_distance >= this.start_distance) {
                this.body.physicsImpostor.applyForce(target.subtract(this.position()).normalize().scale(force), this.position());
                console.log("Losing target...");
                console.log("Rockets engaged...");
            }
            else {
                this.body.physicsImpostor.applyForce(target.subtract(this.position()).normalize().scale(force / 6), this.position());
            }
        }
    };
    return Spaceship;
}(Charge_1.Charge));
exports.Spaceship = Spaceship;

},{"./Charge":1}]},{},[3]);
