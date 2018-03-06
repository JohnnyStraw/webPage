/**
 * Created by Jani on 2018. 02. 16..
 */
import {Mesh} from "./Mesh"

export class Charge extends Mesh{
    charge;
    strength;



    setCharge(charge,strength){
        this.charge=charge;
        this.strength=strength;
        if(charge!="positive" && charge!="negative"){
            console.log("Not valid charge")
        }


    }
    static coulombForce(first,second){
        let force=(first.strength*second.strength)/BABYLON.Vector3.DistanceSquared(first.position(),second.position());
        return force;


    }
    applyCoulomb(charges){
        for(let i=0;i<charges.length;i++){
            if(this.charge==charges[i].charge){
                this.body.physicsImpostor.applyForce(charges[i].position().subtract(this.position()).normalize().negate().scale(Charge.coulombForce(charges[i],this)),this.position())}
            else{
                this.body.physicsImpostor.applyForce(charges[i].position().subtract(this.position()).normalize().scale(Charge.coulombForce(charges[i],this)),this.position())
            }
        }
    }
    static applyCoulomb(charges){


        for(let i=0;i<charges.length;i++){
            let j=i+1;
            for(j;j<charges.length;j++){
                if(i==j){
                    continue;
                }
                if(charges[i].charge=="positive" && charges[j].charge=="positive"){
                    charges[i].body.physicsImpostor.applyForce(charges[j].position().subtract(charges[i].position()).normalize().negate().scale(this.coulombForce(charges[i],charges[j])),charges[i].position());
                    charges[j].body.physicsImpostor.applyForce(charges[i].position().subtract(charges[j].position()).normalize().negate().scale(this.coulombForce(charges[i],charges[j])),charges[j].position());
                }
                else if(charges[i].charge=="negative" && charges[j].charge=="negative"){

                    charges[i].body.physicsImpostor.applyForce(charges[j].position().subtract(charges[i].position()).normalize().negate().scale(this.coulombForce(charges[i],charges[j])),charges[i].position());
                    charges[j].body.physicsImpostor.applyForce(charges[i].position().subtract(charges[j].position()).normalize().negate().scale(this.coulombForce(charges[i],charges[j])),charges[j].position());
                }
                else if(charges[i].charge!=charges[j].charge){
                    //console.log(charges[i].position().subtract(charges[j].position()).normalize().negate().scale(this.coulombForce(charges[i],charges[j])));
                    charges[i].body.physicsImpostor.applyForce(charges[j].position().subtract(charges[i].position()).normalize().scale(this.coulombForce(charges[i],charges[j])),charges[i].position());
                    charges[j].body.physicsImpostor.applyForce(charges[i].position().subtract(charges[j].position()).normalize().scale(this.coulombForce(charges[i],charges[j])),charges[j].position());
                }

            }
        }
    }
}
