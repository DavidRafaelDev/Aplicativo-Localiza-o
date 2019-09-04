// This is a JavaScript file
function retorno(){

}

function retorno2(buttonIndex) {
    if(buttonIndex == 1){
      navigator.notification.alert("Sim");
      navigator.notification.beep(1);
    }else{
       navigator.notification.alert("Não");
       navigator.notification.beep(2);
    }
    
}

$(document).on("click","#alerta",function(){
    //navigator.notification.alert("Olá Mundo - Primeiro App!",retorno,"Aviso!","ok!");
    //navigator.notification.beep(2);
    
    navigator.notification.confirm("Escolha uma opção!",retorno2,"Titulo",['Sim','Não']);
});

$(document).on("click","#vibrar",function(){
    navigator.vibrate(3000);
});

$(document).on("click","#codigo",function(){
   cordova.plugins.barcodeScanner.scan(
      function (result) {
          if(result.text == 888888){
            $(location).attr("href","produto1.html");
          }
      },
      function (error) {
          alert("Falha no scanner: " + error);
      },
      {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Place a barcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417,CODE_39", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      }
   );
});

$(document).on("click","#camera",function(){
    navigator.camera.getPicture(onSuccess, onFail, { 
    quality: 50,
    destinationType: Camera.DestinationType.FILE_URI,
    correctOrientation:true,
    saveToPhotoAlbum:true
  });

  function onSuccess(imageURI) {
      var image = document.getElementById('imagem');
      image.src = imageURI;
  }

  function onFail(message) {
      navigator.notification.alert('Erro ao capturar imagem: ' + message);
  }
});


var lat;
var long;
$(document).ready(function(){
   var onSuccess = function(position) {
              lat = position.coords.latitude;
              long = position.coords.longitude;
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        navigator.notification.alert('codigo: '    + error.code    + '\n' +
              'menssagem: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
});

// Verifica internet
document.addEventListener("offline", onOffline, false);
function onOffline() {
  navigator.notification.alert('Tá sem net mano');
  navigator.notification.beep(3);
 navigator.vibrate(6000);
}

// Mapa


$(document).on("click","#botao",function(){
        L.mapquest.key = 'A3ZlYGt6SkDDxASLnSBrO6AsWukFXWcT';

        var map = L.mapquest.map('map', {
          center: [lat, long],
          layers: L.mapquest.tileLayer('map'),
          zoom: 15
        });

        map.addControl(L.mapquest.control()); 
})
