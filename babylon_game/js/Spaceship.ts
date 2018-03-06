/**
 * Created by Jani on 2018. 02. 16..
 */
import {Charge} from "./Charge"


export class Spaceship extends Charge {
    start_distance = 0;
    new_distance = Infinity;
    counter = 0;


    applyRockets(force, target?) {
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
    }
}
