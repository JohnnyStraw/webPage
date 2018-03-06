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
//# sourceMappingURL=Charge.js.map