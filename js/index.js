
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		mudarPagina("home", "splash");
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function mudarPagina(novaPagina, paginaAntiga){	
	$("#" + paginaAntiga).hide();
	$("#" + novaPagina).show();
}

function tirarFoto(){		
	var origem;
	if ($("#selOrigem").val() == "camera"){
		origem = Camera.PictureSourceType.CAMERA;
	} else {
		origem = Camera.PictureSourceType.PHOTOLIBRARY;
	}
	var qualidade = $("#selQualidade").val();
	
	var encoding;
	if ($("#selEncoding").val() == "JPG"){
		encoding = Camera.EncodingType.JPEG
	} else {
		encoding = Camera.EncodingType.PNG;
	}	
	
	navigator.camera.getPicture(sucessoFoto, falhaFoto, 
	{ 
		quality : qualidade,
		sourceType : origem,
		encodingType: encoding,
		destinationType : Camera.DestinationType.DATA_URL 
	});	
}

function sucessoFoto(imageData) {
    var image = document.getElementById('imgMinhaImagem');
    image.src = "data:image/jpeg;base64," + imageData;
}

function falhaFoto(message) {
    alert('Falhou: ' + message);
}

var watchID = 0;

function abrirBussola(){
	var options = {
		frequency: 2000
	};
	watchID = navigator.compass.watchHeading(compassSuccess, compassError, options);	
}

function pegarGraus(){
	navigator.compass.getCurrentHeading(function(heading){
		$("#lblmagneticHeading").html(heading.magneticHeading);
		$("#lbltrueHeading").html(heading.trueHeading);
		$("#lblheadingAccuracy").html(heading.headingAccuracy);
		$("#lbltimestamp").html(heading.timestamp);			
	}, compassError);
}

function limparBussola(){
	navigator.compass.clearWatch(watchID);
}

function compassSuccess(heading) {
	$("#lblBussola").html(heading.magneticHeading + "°");
	var image = document.getElementById('imgBussola');
	image.src = "img/bussola.png";
	
	image.style.webkitTransform = "rotate(" + heading.magneticHeading + "deg)";
};

function compassError(error) {
    alert('CompassError: ' + error.code);
};