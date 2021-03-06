import { Actor, IActor } from "./actors/Actor";
import { Barrier } from "./actors/Barrier";
import { Car } from "./actors/Car";
import { Chronometer } from "./actors/Chronometer";
import { FPSViewer } from "./actors/FPSViewer";
import { LapCounter } from "./actors/LapCounter";
import { Circuit, createCircuit } from "./state/Circuit";
import { MAP_A, MAP_B } from "./utils/keyboardMap";

window.onload = () => {
  console.log('brum brum!');

	var canvas = document.getElementById("canvas") as HTMLCanvasElement;
	var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

	let fps = new FPSViewer({ x: 5, y: 15 });
	let laps = new LapCounter({ x: 100, y: 15 });
	let chrono = new Chronometer({ x: 200, y: 15 });

	let carA = new Car({ x: 400, y: 900 }, MAP_A);
	// let carB = new Car({ x: 300, y: 300 }, MAP_B);

	let cars = [carA];

	createCircuit(carA);

	let actors: Array<IActor> = [fps, laps, chrono, Circuit, ...cars, ...Circuit.barriers];

	let lastFrame = 0;
	const render = (time: number) => {
		let delta = (time - lastFrame) / 1000;

		lastFrame = time;
		actors.forEach((e) => e.update(delta));
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		actors.forEach((e) => {
			ctx.save();
			e.draw(delta, ctx);
			ctx.restore();
		});
		window.requestAnimationFrame(render);
	};

	window.requestAnimationFrame(render);

	document.body.addEventListener("keydown", (e) => {
		// console.log(e.key);
		actors.forEach((actor) => {
			if (actor.keyboard_event_down) {
				actor.keyboard_event_down(e.key);
			}
		});
	});
	document.body.addEventListener("keyup", (e) => {
		// console.log(e.key);
		actors.forEach((actor) => {
			if (actor.keyboard_event_up) {
				actor.keyboard_event_up(e.key);
			}
		});
	});
};
