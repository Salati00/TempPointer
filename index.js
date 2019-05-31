import "./style.css";
var wsUri = "wss://c4lvz.sse.codesandbox.io/clientWeb";
var output;
let websocket;



function init() {
  testWebSocket();
}

function testWebSocket() {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function (evt) { onOpen(evt) };
  websocket.onmessage = function (evt) { onMessage(evt) };
  websocket.onclose = function (evt) { onClose(evt) };
  websocket.onerror = function (evt) { onError(evt) };
}

function onOpen(evt) {
  console.log("Connesso");
}

function onClose(evt) {
  console.log("Connesso");
}

function onMessage(evt) {
  /*
    [0] : Codice del messaggio
  */
  let data = evt.data.split('|')

  switch (data[0]) {
    //0X - Vengono cambiati valori relativi ai puntatori (Colore, Dimensione, ...)
    case '01':
      /*
        Cambio posizione del puntatore
        [1] : Movimento orizzontale
        [2] : Movimento verticale
        [3] : idPointer
      */
      document.getElementById(data[3]).style.left = data[1] + "px";
      document.getElementById(data[3]).style.top = data[2] + "px";
      break;
    //1X - Vengono cambiati valori relativi allo sfondo (Immagine)
    case '11':
      /*
        Cambio dell'immagine di sfondo
        [1] : URL
      */
      document.getElementById('background').src= data[1];
      
      break;
    //2X  - Richieste relative alle operazione fatte sul sito web (scrollBar)
    case '21':
      /*
        Cambio dell'immagine di sfondo
        [1] : scroll verticale
        [2] : scroll orizzontale
      */
      window.scrollTo(parseInt(data[2]), parseInt(data[1]));
      break;
  }
}

function onError(evt) { console.log(evt.data) }
function doSend(message) { websocket.send(message); }
init();