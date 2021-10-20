import kaboom from "kaboom";
//initiating Kaboom repo
// initialize context
kaboom();

// load assets
loadSprite("player", "sprites/boat1.png");

// add a character to screen
const player = add([
	// list of components
	sprite("player"),
	pos(80, 40),
	area(),
  rotate(),
  body(),
  gravity(0),
  pos(center()),
]);

// play a looping soundtrack (check out AudioPlayConf for more configs)
// const damageVol = play("score", {
//     volume: 0.8,
//     loop: true
// });

// // using the handle to control (check out AudioPlay for more controls / info)
// damageVol.pause();
// damageVol.play();



scene("lose", () => {
	add([
		text("Game Over"),
		pos(center()),
		origin("center"),
	])
})

let score = 0;
const scoreLabel = add([
	text(score),
	pos(24, 24),
])

// increment score every frame
action(() => {
	score++;
	scoreLabel.text = score;
});