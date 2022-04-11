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
    }
  })

  firebase.auth().signInAnonymously().catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });

})();