import { Circuit } from "../state/Circuit";
import { Point } from "../types/Point";
import { angleToRad } from "../utils/angleToRad";
import { Actor, IActor } from "./Actor";

export class Barrier extends Actor {
	barrierWith: number;
	angle: number;
	car: IActor;
	touched: boolean;
	barrierindex: number;
	constructor(
		initialPos: Point,
		bw = 100,
		angle: number = 45,
		car: IActor,
		barrierindex: number,
	) {
		super(initialPos);
		this.barrierWith = bw;
		this.angle = angle;
		this.car = car;
		this.touched = false;
		this.barrierindex = barrierindex;
	}
	update() {
		let carPos = this.car.position;
        if(carPos!== undefined){
            let myPos = this.position;
            let distance = Math.sqrt(
                Math.pow(myPos.x - carPos.x, 2) + Math.pow(myPos.y - carPos.y, 2),
            );
            // console.log(Circuit.currentBarrier, this.barrierindex);
            if (distance < 30) {
                if (Circuit.touchingBarrier(this.barrierindex)) {
                    this.touched = true;
                }
            }
        }
	}
	draw(delta: number, ctx: CanvasRenderingContext2D) {
		// Trasladamos y toamos el canvas según la barrera que vayamos a pintar
		ctx.translate(this.position.x, this.position.y);
		ctx.rotate(angleToRad(this.angle));
		this.touched ? (ctx.strokeStyle = "green") : (ctx.strokeStyle = "red");

		// Pintamos una línea
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(-this.barrierWith / 2, 0);
		ctx.lineTo(this.barrierWith / 2, 0);
		ctx.arc(0, 0, 3, 0, angleToRad(360));
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
	}
}