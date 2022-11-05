(function() {
	BLB.ResponsiveMenu = {

		init: function() {
			if(BLB.blbIsLoaded) {
				BLB.registerPickerMenus('appVerSel_Resp');
				document.querySelector('.js-nav-trigger').addEventListener('click', function(ev) {
					BLB.closePickerMenus('mobileNavMenuButton');
					this.classList.toggle('is-active');
					Dom.get('mobileNavMenu').classList.toggle('is-active');
					this.innerHTML = (this.innerHTML === "Menu") ? "Close" : "Menu";
					YEvent.stopPropagation(ev);
				});
				document.querySelector('#navVerseSwitcher').addEventListener('click', function(ev) {
					BLB.closePickerMenus('appVerSel_Resp');
					document.querySelector('#appVerSel_Resp').classList.toggle('hidden');
					YEvent.stopPropagation(ev);
				});
			} else {
				setTimeout(function() { BLB.ResponsiveMenu.init(); }, 100);
			}
		}
	};

	YEvent.onDOMReady(BLB.ResponsiveMenu.init, BLB.ResponsiveMenu.init, true);

})();