const playerColors = ["blue", "red", "orange", "yellow", "green", "purple"];

function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getKeyString(x, y) {
  return `${x}x${y}`;
}

(function () {

  let playerId;
  let playerRef;

  function initGame() {
    const allPlayersRef = firebase.database.ref(`players`);
    const allCoinsRef = firebase.database.ref(`coins`);

    allPlayersRef.on("value", (snapshot) => {
      //fires on change
    })
    allPlayersRef.on("child_added", (snapshot) => {
      //whenever new node is added
      const addedPlayer = snapshot.val();
      const characterElement = document.createElement("div");
      const characterElement.classList.add("Character", "grid-cell");
      if (addedPlayer.id == playerId) {
        chatacterElement.classList.add("you");
      }

      characterElement.innerHTML = ( `
        <div class="Character_shadow grid-cell"></div>
        <div class="Character_sprite grid-cell"></div>
        <div class="Character_name-container">
          <span class="Character_name"></span>
          <span class="Character_coins"></span>
        </div>
        <div class="Character_you-arrow"></div>
      `);

    })
  }

  firebase.auth().onAuthStateChanged((user) => {
    console.log(user.uid)
    if (user) {
      playerId = user.uid;
      playerRef = firebase.database().ref(`players/${playerId}`);

      playerRef.set({
        id: playerId,
        name: "Zach",
        direction: "right",
        color: randomFromArray(playerColors),
        x: 4,
        y: 5,
        coins: 0,
      })

      playerRef.onDisconnect().remove();

      initGame();
    }
  })

  firebase.auth().signInAnonymously().catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });

})();