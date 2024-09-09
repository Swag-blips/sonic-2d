import { makeSonic } from "../entities/sonic.js";
import k from "../kaplayCtx.js";

export default function mainMenu() {
  if (!k.getData("best-score")) {
    k.setData("best-score", 0);
  }

  k.onButtonPress("jump", () => k.go("game"));

  const bgPieceWidth = 1920;
  const platformWidth = 1280;

  // Create a single background and platform
  const bg1 = k.add([
    k.sprite("chemical-bg"),
    k.pos(0, 0),
    k.scale(2),
    k.opacity(0.8),
  ]);
  const bg2 = k.add([
    k.sprite("chemical-bg"),
    k.pos(bgPieceWidth, 0),
    k.scale(2),
    k.opacity(0.8),
  ]);

  const platform1 = k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]);
  const platform2 = k.add([
    k.sprite("platforms"),
    k.pos(platformWidth, 450),
    k.scale(4),
  ]);

  k.add([
    k.text("SONIC RING RUN", {
      font: "mania",
      size: 96,
    }),
    k.pos(k.center().x, 200),
    k.anchor("center"),
  ]);

  k.add([
    k.text("PRESS SPACE/CLICK/TOUCH to play", {
      font: "mania",
      size: 32,
    }),
    k.pos(k.center().x, k.center().y - 200),
    k.anchor("center"),
  ]);
  makeSonic(k.vec2(200, 745));

  k.onUpdate(() => {
    // Move the backgrounds left
    bg1.move(-100, 0);
    bg2.move(-100, 0);

    // If the first background moves off-screen, reset its position to the right of the second background
    if (bg1.pos.x + bgPieceWidth < 0) {
      bg1.pos.x = bg2.pos.x + bgPieceWidth;
    }
    // If the second background moves off-screen, reset its position to the right of the first background
    if (bg2.pos.x + bgPieceWidth < 0) {
      bg2.pos.x = bg1.pos.x + bgPieceWidth;
    }

    // Move the platforms left
    platform1.move(-4000, 0);
    platform2.move(-4000, 0);

    // If the first platform moves off-screen, reset its position to the right of the second platform
    if (platform1.pos.x + platformWidth < 0) {
      platform1.pos.x = platform2.pos.x + platformWidth;
    }
    // If the second platform moves off-screen, reset its position to the right of the first platform
    if (platform2.pos.x + platformWidth < 0) {
      platform2.pos.x = platform1.pos.x + platformWidth;
    }
  });
}
