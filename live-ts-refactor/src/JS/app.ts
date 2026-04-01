import type { Player } from "./types";
import Store from "./store.js";
import View from "./view.js";

const players: Player[] = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

function init() {
  const view = new View();
  const store = new Store("live-t3-sturage-key", players);

  // Current tab state changes
  store.addEventListener("statechange", () => {
    view.render(store.game, store.stats);
  });

  // A different tab state changes
  window.addEventListener("storage", () => {
    console.log("State changed from another tab");
    view.render(store.game, store.stats);
  });

  // The first load of the document
  view.render(store.game, store.stats);

  view.bindGameResetEvent((event) => {
    store.reset();
  });
  view.bindNewRoundEvent((event) => {
    store.newRound();
  });
  view.bindPlayerMoveEvent((square: Element) => {
    const existingMove = store.game.moves.find(
      (move) => move.squareId === +(square as HTMLElement).id,
    );

    if (existingMove) {
      return;
    }

    // Advance to the next state by pushing a move to the moves array
    store.playerMove(+(square as HTMLElement).id);
  });

  //console.log(view.$.turn);
}

window.addEventListener("load", init);
