export class Mesh{
    type;
    scene;
    texture;
    body;
    rocket;
    start_distance;
    new_distance;
    counter;

    constructor(type,scene,size,texture?,mass=1,position?){
        this.scene=scene;
        this.rocket=undefined;
        this.start_distance=0;
        this.new_distance=Infinity;
        this.counter=0;

        if(type==="sphere") {


            this.body=BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:size}, this.scene);
            this.type="sphere";
            this.body.physicsImpostor=new BABYLON.PhysicsImpostor(this.body, BABYLON.PhysicsImpostor.SphereImpostor, { mass: Math.random()*mass, restitution: 0.1 }, this.scene);
        }
        else if(type=="saucer"){
            this.body=BABYLON.MeshBuilder.CreateSphere("sphere", {diameterX:size, diameterY:size/2.5, diameterZ: size}, this.scene);
            this.type="sphere";
            this.body.physicsImpostor=new BABYLON.PhysicsImpostor(this.body, BABYLON.PhysicsImpostor.SphereImpostor, { mass: Math.random()*mass, restitution: 0.1 }, this.scene);

        }
        else if(type==="box"){
            this.body=BABYLON.MeshBuilder.CreateBox("box", {size: size}, this.scene);
            this.type="box"
        }



        if(position===undefined){
            this.body.setPositionWithLocalVector(new BABYLON.Vector3((Math.random()-0.5)*333,(Math.random()-0.2)*355,(Math.random()+0.1)*-950));

        }
        else{
            this.body.setPositionWithLocalVector(position);
        }
        if(texture!=undefined){
            let myMaterial = new BABYLON.StandardMaterial("myMaterial", this.scene);
            myMaterial.diffuseTexture = new BABYLON.Texture(texture, this.scene);
            this.body.material=myMaterial;

        }
        this.texture=this.body.material;




    }

    position(){
        return this.body.getAbsolutePosition();
    }
    setPosition(x){
        this.body.setPositionWithLocalVector(x);

    }


    applyMyForce(type,others?){
        if(type==="random"){
            this.body.physicsImpostor.applyForce(new BABYLON.Vector3(Math.random()*0.000015,Math.random()*0.000015,Math.random()*0.000015),this.position());
        }
        else if(type==="gravity"){
            for(let i=0;i<others.length-1;i++){
                others[i].body.physicsImpostor.applyForce(this.position().subtract(others[i].position()).normalize().scale(10),this.position());


            }}
        else if(type==="repulsion")   {
            for(let i=0;i<others.length-1;i++){
                others[i].body.physicsImpostor.applyForce(this.position().subtract(others[i].position()).normalize().scale(10).negate(),this.position());


            }}
    }

}
