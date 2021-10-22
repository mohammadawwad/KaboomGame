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



scene("home", () => {
  function addButton(txt, p, f) {

    const btn = add([
      text(txt, 8),
      pos(p),
      area({ cursor: "pointer", }),
      scale(1),
      origin("center"),
    ]);

    btn.clicks(f);

    btn.hovers(() => {
      const t = time() * 10;
      btn.color = rgb(
        wave(0, 255, t),
        wave(0, 255, t + 2),
        wave(0, 255, t + 4),
      );
      btn.scale = vec2(1.2);
    }, () => {
      btn.scale = vec2(1);
      btn.color = rgb();
    });

  }

  addButton("Start", center(), () => go("level1"));
  // addButton("Quit", vec2(200, 200), () => debug.log("bye"));

  // reset cursor to default at frame start for easier cursor management
  action(() => cursor("default"));

});

go("home");








scene("level1", () => {
  
  // add a character to screen
  var speed = 70;
  const player = add(
    [
      sprite("player"),
      area(),
      scale(2.0),
      rotate(),
      body(),
      gravity(0),
      pos(center()),
      health(100000),
    ]
  );

  const weapon = add(
    [
      sprite("weapon"),
      area(),
      scale(2.0),
      rotate(),
      body(),
      gravity(0),
      pos(center()),
    ]
  );


  const enemy = add(
    [
      sprite("enemy"),
      pos(300, 40),
      area(),
      scale(3.0),
      rotate(),
      body(),
      gravity(0),
      health(5),
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

  player.collides("enemy", () => {
    player.hurt(10);
    enemy.hurt(5)
  });

  // triggers when hp reaches 0
  player.on("death", () => {
      destroy(player);
      go("lose");
  });
  enemy.on("death", () => {
      destroy(enemy);
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

});






scene("lose", () => {
	add([
		text("Game Over"),
		pos(center()),
		origin("center"),
	])
});