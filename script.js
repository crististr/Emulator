var select = document.getElementById("select");
var slider = document.getElementById("slider");
var chatframe = document.getElementById("chatframe");
var chatvisible = false;

var systems = {
	"nes": "nes",
	"smc": "snes",
	"gen": "sega",
	"gb": "gb",
	"gbc": "gbc",
	"gba": "gba",
}

function updatezoom() {
	var containerdiv = document.getElementById("container");
	var scale = slider.value / 10;
	var width = containerdiv.offsetWidth * scale;
	var height = containerdiv.offsetHeight * scale;
	containerdiv.style.transform = "scale(" + scale + ")";
	containerdiv.style.right = width / 4 + "px";
	containerdiv.style.top = height / 4 + "px";
}

function toggleframe() {
	if (chatvisible) {
		chatframe.style.transform = "translateY(100%)";
	} else {
		chatframe.style.transform = "translateY(0)";
	}
	chatvisible = !chatvisible;
}

function emulate(systemin, filein) {
    var resizeOwnEmulator = function(width, height) {
		var emulator = $('#emulator');
		emulator.css('width', width);
		emulator.css('height', height);
	}

	$(function() {
		function embed() {
			var emulator = $('#emulator');
			if(emulator) {
				var flashvars =  {
					system: systemin,
					url: "roms/" + filein
				};
				var params = {};
				var attributes = {};
				
				params.allowscriptaccess = 'sameDomain';
				params.allowFullScreen = 'true';
				params.allowFullScreenInteractive = 'true';
				
				swfobject.embedSWF('flash/Nesbox.swf', 'emulator', "640", "480", '11.2.0', 'flash/expressInstall.swf', flashvars, params, attributes);
			}
		}
		
		embed();
	});
	setTimeout(() => {
		updatezoom();
	}, 1000);
}

function checkselect() {
	var emulatordiv = document.getElementById("emulator");
	var iframediv = document.getElementById("iframediv");
	if (select.value == "---Select---") {
		emulatordiv.innerHTML = "";
	} else if (select.value == "redirect") {
		location = "https://bootheidiot.github.io/N64";
	} else if (select.value.includes("https://")) {
		emulatordiv.style.display = "none";
		iframediv.style.display = "block";
		iframediv.innerHTML = "<iframe src=" + select.value + "></iframe>";
	} else {
		emulatordiv.style.display = "block";
		iframediv.style.display = "none";
		var extension = select.value.split(".")[1];
		emulate(systems[extension], select.value);
	}
}

emulate("", "");
setTimeout(() => {
	document.getElementById("emulator").innerHTML = "";
}, 1000);
