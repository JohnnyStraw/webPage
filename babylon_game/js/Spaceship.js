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
//# sourceMappingURL=Spaceship.js.map