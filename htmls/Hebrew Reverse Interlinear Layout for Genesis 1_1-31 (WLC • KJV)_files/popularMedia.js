
(function() {
	BLB.rBub1006 = {
		init: function() {
			var matchedEl = document.location.hash.replace(/#/, '');
			if (matchedEl != '') { Dom.addClass(matchedEl, 'anchor');	}

			var targets = Dom.getElementsByClassName('audioStream', 'a', 'rtBub_1006');
			YEvent.addListener(targets, 'click', BLB.rBub1006.playBibleMP3);
		},

		playBibleMP3: function(ev) {
			var audioID = this.dataset.audioId;
			var logPath = this.dataset.audioLogpath;
			var strWindowFeatures = 'width=700,height=321,left=0,top=0,scrollbars=no,titlebar=no,status=no,resizable=yes,menubar=no,location=no';
			var audWindow = window.open('/audio_video/popPlayer.cfm?id='+audioID+'&rel='+logPath, 'BLBAudio', strWindowFeatures);
			audWindow.focus();
		}
	};

	YEvent.onDOMReady(BLB.rBub1006.init, BLB.rBub1006.init, true);

})();
