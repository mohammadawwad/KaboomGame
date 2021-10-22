import kaboom from "kaboom";
//initiating Kaboom repo
// initialize context
kaboom({
  background: [52, 165, 235],
});

// load assets
loadSprite("player", "sprites/boat1.png");
loadSprite("weapon", "sprites/gun1.png");
loadSprite("enemy", "sprites/enemy1.png");





// scene("home", () => {
//   const homeLabel = add(
//   [
//     text("Welcome"),
//     pos(center()),
//     scale(0.6),
//   ])
//   const startLabel = add(
//   [
//     text("Start"),
//     pos(center()-100),
//     scale(0.6),
//   ])



// });

// go("home");










// add a character to screen
var speed = 70;
const player = add(
  [
    sprite("player"),
    pos(80, 40),
    area(),
    scale(2.0),
    rotate(),
    body(),
    gravity(0),
    pos(center()),
    health(100),
  ],
  [
    sprite("weapon"),
    pos(80, 40),
    rotate(),
    body(),
    gravity(0),
    pos(center()),
  ]
);




let score = 0;
const scoreLabel = add([
	text(score),
	pos(24, 24),
  scale(0.4),
])

// increment score every frame
action(() => {
	score++;
	scoreLabel.text = "Coins: " + score;
});

let hp = 100;
const hpLabel = add([
	text(hp),
	pos(24, 52),
  scale(0.4),
])

// increment hp every frame
action(() => {
	player.hurt(1)
  hp--;
	hpLabel.text = "HP: " + hp;
});

// triggers when hp reaches 0
player.on("death", () => {
    destroy(player);
    go("lose");
});



var angle;
keyDown("left", () => {
    player.move(vec2(-speed, 0));
    angle = player.angle--;
    player.move(angle,0);
});

keyDown("right", () => {
    player.move(vec2(speed, 0));
    angle = player.angle++;
    player.move(angle,0);
});

keyDown("up", () => {
    player.move(vec2(0, -speed));
});

keyDown("down", () => {
    player.move(vec2(0, speed));
});





scene("lose", () => {
	add([
		text("Game Over"),
		pos(center()),
		origin("center"),
	])
})