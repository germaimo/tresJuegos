// function getPicture() {
//   let cameraOptions = {
//     quality: 75,
//     destinationType: Camera.DestinationType.DATA_URL
//   };
//   navigator.camera.getPicture(onSuccess, onFail, cameraOptions);
// }

function changePicture() {
  let cameraOptions = {
    quality: 75,
    destinationType: Camera.DestinationType.DATA_URL
  };
  navigator.camera.getPicture(onSuccessChange, onFail, cameraOptions);
}

function onSuccessChange(imgData) {
  let who = Storage.get("who");
  //let player = Storage.get("player" + who);
  document.getElementById("foto").src = "data:image/jpeg;base64," + imgData;
  one_player.img = "data:image/jpeg;base64," + imgData;
  
  Storage.put("player" + who, one_player);
}

function onSuccess(imgData) {
  document.getElementById("foto").src = "data:image/jpeg;base64," + imgData;
  player.img = "data:image/jpeg;base64," + imgData;
}


function onFail(msg) {
  alert("No se pudo tomar la foto. Motivo: " + msg);
}