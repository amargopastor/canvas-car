import { Actor, IActor } from "./Actor";
import { Point } from "../types/Point";
import { angleToRad } from "../utils/angleToRad";
import { checkLimits } from "../utils/checkLimits";
import { Carkey, KeyboardMap } from "../utils/keyboardMap";
const ferrariImg = require("../assets/ferrari.png");

type Size = { w: number; h: number };

export class Car extends Actor implements IActor {
	carSize: Size;
	carColor: string;
	angle: number;
	angleSpeed: number;
	carSpeed: number;
	carAcceleration: number;
	image: HTMLImageElement;
	keyboardMap: KeyboardMap;
	constructor(
		initialPos: Point,
		keyboardMap: KeyboardMap,
		size: Size = { w: 50, h: 100 },
	) {
		super(initialPos);
		this.keyboardMap = keyboardMap;
		this.carSize = size;
		this.carColor = "red";
		this.angle = 0;
		this.angleSpeed = 0;
		this.carSpeed = 0;
		this.carAcceleration = 0;

		// Car image
		this.image = new Image();
		this.image.src = ferrariImg;
	}
	update(delta: number) {
		this.angle += this.angleSpeed;
		this.angleSpeed *= 0.9;
		// Establecemos una velocidad en relación a la aceleración
		this.carSpeed = this.carSpeed * 0.9 + this.carAcceleration;
		// console.log(this.carSpeed);
		let newPos: Point = {
			x: this.position.x + Math.cos(angleToRad(this.angle)) * this.carSpeed,
			y: this.position.y + Math.sin(angleToRad(this.angle)) * this.carSpeed,
		};
		if (checkLimits(newPos)) {
			this.position = newPos;
		}
	}
	draw(delta: number, ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = this.carColor;
		ctx.translate(this.position.x, this.position.y);
		ctx.rotate(angleToRad(this.angle));
		ctx.rotate(angleToRad(180));
		ctx.drawImage(this.image, -50, -25, 100, 50);
	}
	keyboard_event_down(key: string) {
		let tecla = this.keyboardMap[key];
		if (tecla == Carkey.LEFT) {
			this.angleSpeed -= 4;
		} else if (tecla == Carkey.RIGHT) {
			this.angleSpeed += 4;
		} else if (tecla == Carkey.UP) {
			this.carAcceleration = 0.5;
		} else if (tecla == Carkey.DOWN) {
			this.carAcceleration = -0.5;
		}
	}
	keyboard_event_up(key: string) {
		let tecla = this.keyboardMap[key];
		if (tecla == Carkey.UP) {
			this.carAcceleration = 0;
		} else if (tecla == Carkey.DOWN) {
			this.carAcceleration = 0;
		}
	}
}