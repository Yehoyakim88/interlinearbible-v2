
(function() {
	BLB.adsSpace = {
		gptAdSpacesViewed: {},
		gptAdSpacesPending: {},

		/*
			Determine if an ad space is visible and should be fetched from Google Ad Manager
			If the ad space is not visible, mark if for review on window resize
		*/
		RegisterDFP: function(gptId) {
			if(BLB.adsSpace.gptAdSpacesViewed.hasOwnProperty(gptId)) return false;

			var gptIdElement = document.querySelector('#'+gptId);

			// Defer
			if(gptIdElement.offsetParent === null) {
				BLB.adsSpace.gptAdSpacesPending[gptId] = '';

			// Display
			} else {
				BLB.adsSpace.gptAdSpacesViewed[gptId] = '';
				googletag.cmd.push(function() { googletag.display(gptId); });
			}
		}
	};

	BLB.Menu = {
		menuAnims: [],
		menuAnimsTimerIn: [],
		menuAnimsTimerOut: [],
		lastAnimatedMenu: null,
		subMegaMenus: [],
		alertsTimer:0,
		maxLocalStoragePerKey:262144,
		localStorage_whiteList: {
			blb_visits: true,
			blb_viewport: true,
			drive_2022_Winter: true,
			ScriptureMark: true,
			BLBAP: true
		},
		localStorage_blackList: {
			snowplowOutQueue_snowplow_cf_get: true
		},

		whyReg: function(ev, matchedEl) {
			var pDiv = Dom.get('popupDiv');
			// BLB.clearPDivStyles();
			link = matchedEl.rel;
			document.querySelector('#popupDivContents').innerHTML = BLB.popupDivContents;
			pDiv.classList.remove('hidden');
			Dom.setStyle(pDiv, 'width', '300px');
			Dom.setStyle(pDiv, 'z-index', '521');
			BLB.setXY(matchedEl, pDiv, -275, 5);
			BLB.toolTipPopup(link, null, false);
			YEvent.stopPropagation(ev);
		},

		init: function() {
			if(BLB.blbIsLoaded) {
				var attributes = {
					opacity: { from:0.0, to:1.0 }
				};

				BLB.registerPickerMenus('advOptMenu');
				BLB.registerPickerMenus('mvOptionsMenu');
				BLB.registerPickerMenus('devotionsDrop');
				BLB.registerPickerMenus('searchDrop');
				BLB.registerPickerMenus('studyDrop');
				BLB.registerPickerMenus('appsDrop');
				BLB.registerPickerMenus('ministryDrop');
				BLB.registerPickerMenus('donationsDrop');
				BLB.registerPickerMenus('helpDrop');
				BLB.registerPickerMenus('aboutDrop');
				BLB.registerPickerMenus('viewDesktopMode');

				Dom.getElementsByClassName('menuDrop', 'div', 'menuTop').forEach( function(element, index) {
					BLB.Menu.menuAnims[element.id] = new YAHOO.util.Anim(element, attributes);
					BLB.Menu.menuAnims[element.id].duration = 0;
					BLB.Menu.menuAnimsTimerIn[element.id] = 0;
					BLB.Menu.menuAnimsTimerOut[element.id] = 0;
				});

				// View Desktop Mode
				BLB.Menu.fixupViewportHack(JSON.parse(localStorage.getItem('blb_viewport')));

				document.querySelectorAll('.show-hide-menu-trigger').forEach(function(item) {
					item.addEventListener('click', function(ev) {
						if (ev != null) { BLB.evDispatchCheck(ev.target); }
						var target = this.dataset.target;
						BLB.closePickerMenus(target);
						document.querySelector('#'+target).classList.toggle('hidden');
						YEvent.stopPropagation(ev);
					});
				});
				document.querySelectorAll('.view-desktop-mode').forEach(function(item) {
					item.addEventListener('click', function(ev) {
						var target = ev.target.closest('.choice');
						YEvent.stopPropagation(ev);
						if(target.classList.contains('choice')) 
							if(!target.classList.contains('checked')) {
								var blb_viewport = localStorage.getItem('blb_viewport');

								target.parentNode.childNodes.forEach(function(item) {
									if(item.nodeType == 1) item.classList.remove('checked');
								});
								target.classList.add('checked');
								setTimeout(function(){ BLB.closePickerMenus('bodTag'); }, 100);

								if(blb_viewport == null) blb_viewport = false;
								blb_viewport = JSON.parse(blb_viewport);
								blb_viewport = !blb_viewport;
								localStorage.setItem('blb_viewport', blb_viewport);
								BLB.Menu.fixupViewportHack(blb_viewport);
							}
					});
				});
				YEvent.addListener('dView', 'click', function() {
					var blb_viewport = localStorage.getItem('blb_viewport');
					if(blb_viewport == null) blb_viewport = false;
					blb_viewport = JSON.parse(blb_viewport);
					blb_viewport = !blb_viewport;
					localStorage.setItem('blb_viewport', blb_viewport);
					BLB.Menu.fixupViewportHack(blb_viewport); 
					window.scrollTo(0,0);
				});

			try {
				// Check for audio players that need playback tracking
				BLB.Menu.initAudioTracking();
				BLB.Menu.cleanLocalStorage();

				var showDrive_2022_Winter_Popup = false;

				// Create or update visit tracking
				// One entry for each unqiue day and increment the counter for each visit today
				var referrers = {'blueletterbible.org':true, 'blb.org':true, 'sowingcircle.org':true};
				var blb_visits = localStorage.getItem('blb_visits');
				var referrer = (document.referrer?document.referrer.split(/\//)[2].split(/\./):'www.blueletterbible.org'.split(/\./));
				var nowDateTime = new Date();
				var nowDate = new Date(nowDateTime.getFullYear(), nowDateTime.getMonth(), nowDateTime.getDate(), 0, 0, 0, 0);
				var dateToday = nowDate.getTime();					// dateToday represents today, as a day, not now, as a moment
				var twoMonths = 86400 * 1000 * 31 * 2;				// 2 months of milliseconds
				var blb_visits_json = {};
				var daysVisited = 0;

				referrer = [referrer[1], referrer[2]].join('.');

				// Create or increment the counter for each visit today
				if(blb_visits == null) {
					blb_visits_json[dateToday] = 1;								// Set the default
				} else {
					blb_visits_json = ColdFusion.JSON.decode(blb_visits);
					var hitCount = blb_visits_json[dateToday];
					if(hitCount) blb_visits_json[dateToday]++;
					else blb_visits_json[dateToday] = 1;
				}
				// If the they came from a BLB accepted referring, then save the changes, else ignore and dump
				if(referrers[referrer]) {
					blb_visits = ColdFusion.JSON.encode(blb_visits_json);
					localStorage.setItem('blb_visits', blb_visits);
				}

				// Show the popup if they have at least 6 unique visit days
				if(Object.values(blb_visits_json).length >= 6) showDrive_2022_Winter_Popup = true;
			} catch(e) { ; }

				/**********************************************************
				If a person donoates and we happen to reset this by renaming the campaign, make an exception so that donors get a 12 month reprieve from the time of donation. -Jim
				  2022 Winter donation drive
				**********************************************************/

	 		try {
	 			// Fetch the localStorage key
	 			var drive_2022_Winter = localStorage.getItem('drive_2022_Winter');
	 			var nowDateTime = new Date();
	 			var sevenDays = 86400 * 1000 * 7;
	 			var el_drive_2022_Winter = document.querySelector('#drive_2022_Winter'); // Not shown on Bible pages

	 			// Show the popup
				if(el_drive_2022_Winter && drive_2022_Winter == null && showDrive_2022_Winter_Popup) {			// null means we're fresh at seeing the overlay
					Dom.removeClass('drive_2022_Winter_Coat', 'hidden');
					Dom.removeClass('drive_2022_Winter', 'hidden');
					BLB.evDispatch({
						event_category: "Appeal",
						event: "[IMPRESSION] Donation Popup",
						event_label: "2021-10-13 [IMPRESSION] Donation Popup"
					});
				//  What kind of no-show?  perm or remind later?
				} else if(drive_2022_Winter > 0) {
					if((nowDateTime.getTime() - drive_2022_Winter) > sevenDays) {				// 86400 (1 day in seconds) * 1000 (milliseconds) * 7 (days)
						Dom.removeClass('drive_2022_Winter_Coat', 'hidden');
						Dom.removeClass('drive_2022_Winter', 'hidden');
						BLB.evDispatch({
							event_category: "Appeal",
							event: "[RE-IMPRESSION] Donation Popup",
							event_label: "2021-10-13 [RE-IMPRESSION] Donation Popup"
						});
					}
				}

				// Handle popup click events
				YEvent.delegate('drive_2022_Winter_Wrapper', "click", function(ev, matchedEl, container) {
					var myParent = matchedEl.parentNode;
					var dismiss = myParent.dataset.dismiss;
					var link = myParent.dataset.link;
					// Never show this campaign again
					// Can happen from a donate or dismiss action
					if(dismiss == 'perm') {
						localStorage.setItem('drive_2022_Winter', 0);
						if(link != '') {
							window.open(link);
							BLB.evDispatch({
								event_category: "Appeal",
								event: "[DONATE NOW] Donation Popup",
								event_label: "2021-10-13 [DONATE NOW] Donation Popup"
							});
						} else {
							BLB.evDispatch({
								event_category: "Appeal",
								event: "[DISMISS] Donation Popup",
								event_label: "2021-10-13 [DISMISS] Donation Popup"
							});
						}
						Dom.addClass('drive_2022_Winter_Coat', 'hidden');
						Dom.addClass('drive_2022_Winter', 'hidden');
					// Remind me later action
					} else if(dismiss == 'now') {											// Setting drive_2022_Winter > 0 indicates a temp non-display
						localStorage.setItem('drive_2022_Winter', nowDateTime.getTime());	// Store today in milliseconds
						BLB.evDispatch({
							event_category: "Appeal",
							event: "[REMIND LATER] Donation Popup",
							event_label: "2021-10-13 [REMIND LATER] Donation Popup"
						});
						Dom.addClass('drive_2022_Winter_Coat', 'hidden');
						Dom.addClass('drive_2022_Winter', 'hidden');
					}
				}, "div>a");
				// Clicking the clearcoat is like "Remind Me Later"
				document.querySelector('#drive_2022_Winter_Coat').addEventListener('click', function() {
					localStorage.setItem('drive_2022_Winter', nowDateTime.getTime());		// Store today in milliseconds
					BLB.evDispatch({
						event_category: "Appeal",
						event: "[REMIND LATER] Donation Popup",
						event_label: "2021-10-13 [REMIND LATER] Donation Popup"
					});
					Dom.addClass('drive_2022_Winter_Coat', 'hidden');
					Dom.addClass('drive_2022_Winter', 'hidden');
				});
			} catch(e) { ; }

			/**********************************************************
				End 2021 Spring donation drive
			**********************************************************/


			/*****************************
				 GDPR Cookie Notificaiton
			*****************************/
			try {

	 			var gdrp_cookieBanner = localStorage.getItem('gdrp_cookieBanner');
				if(gdrp_cookieBanner == null) {
					var cookieBanner = document.getElementById('cookie-wrapper');
					var cookieButton = document.getElementById('agree-button');
					Dom.removeClass(cookieBanner, 'hidden');
					aniFadeIn = new YAHOO.util.Anim(cookieBanner, {opacity: { from:0, to:1 }}, 1.1);
					aniFadeIn.animate();

					cookieButton.addEventListener('click', function() {
						localStorage.setItem('gdrp_cookieBanner', true);
						aniFadeAway = new YAHOO.util.Anim(cookieBanner, {opacity: { from:1, to:0 }}, 0.8);
						aniFadeAway.onComplete.subscribe(function() { Dom.addClass(cookieBanner, 'hidden') });
						aniFadeAway.animate();
					});
				}

			} catch(e) { console.log(e); }
			/*****************************
				 /GDPR Cookie Notificaiton
			*****************************/


				if(BLB.isTouchEnabled) {
					YEvent.delegate("menuTop", "touchstart", BLB.Menu.onTouchHndlr, "a.nav-menu__link");
				}

				YEvent.delegate("menuTop", "click", function(ev) { YEvent.stopPropagation(ev); }, "div.menuDrop");

				YEvent.delegate("menuTop", "mouseover", BLB.Menu.onMouseOverHndlr, "a.nav-menu__link");
				YEvent.delegate("menuTop", "mouseout", BLB.Menu.onMouseOutHndlr, "a.nav-menu__link");

				YEvent.delegate("menuTop", "mouseover", BLB.Menu.onMouseOverHndlr, "div.menuDrop");
				YEvent.delegate("menuTop", "mouseout", BLB.Menu.onMouseOutHndlr, "div.menuDrop");

				YEvent.delegate("menuTop", "mouseover", BLB.Menu.onMouseOverHndlr, "div.popup");
				YEvent.delegate("menuTop", "mouseout", BLB.Menu.onMouseOutHndlr, "div.popup");

				YEvent.delegate("menuTop", "mouseout", BLB.Menu.onMouseOutHndlr, "ul#menuBlock");

				YEvent.delegate("menuTop", "click", BLB.Menu.onClickHndlr, "a[rel^='helps.']");

				//All of the Mega Menus have a nested that when clicked, targets /knowgod.cfm
				YEvent.delegate(Dom.getElementsByClassName('menuDrop'), "click", function() {
						document.location.href='/knowgod.cfm';
					}, "div.knowGod");

				YEvent.addListener(window, 'resize', function() {
	/*				var xy = [
						Dom.getViewportWidth(),
						Dom.getViewportHeight()
					];
					var w = Dom.get('homeLogin').offsetWidth;
					var h = Dom.get('homeLogin').offsetHeight;

					xy[0] = (xy[0]-w)/2;
					xy[1] = (xy[1]-h)/(xy[1]>1000?4:2);
					Dom.setXY('homeLogin', xy);
	*/
				// Check to see if there are any sticky rows that need repositioned
					BLB.checkStickyRows();

					// Determine if there are still pending ads to view
					for(var gptId in BLB.adsSpace.gptAdSpacesPending) {
						if(BLB.adsSpace.gptAdSpacesPending.hasOwnProperty(gptId)) {
							delete BLB.adsSpace.gptAdSpacesPending[gptId];
							BLB.adsSpace.RegisterDFP(gptId);
						}
					}
				});

				YEvent.addListener('forgotMyPasswdA', 'click', function(ev) {
					Dom.get('blbLForm03').reset();
					document.querySelector('#login01').classList.add('hidden');
					document.querySelector('#forget01').classList.remove('hidden');
					// document.querySelector('#eMailExist').classList.add('hidden');
					document.querySelector('#loginTitle').innerHTML = "Forgot Password";
				});
				YEvent.addListener('registerMeA', 'click', function(ev) {
					Dom.get('blbLForm01').reset();
					document.querySelector('#login01').classList.add('hidden');
					document.querySelector('#register01').classList.remove('hidden');

					document.querySelector('#eMailChk').classList.add('hidden');
					document.querySelector('#eMailErr').classList.add('hidden');
					document.querySelector('#uPassChk').classList.add('hidden');
					document.querySelector('#uPassErr').classList.add('hidden');
					document.querySelector('#fNameChk').classList.add('hidden');
					document.querySelector('#uNameErr').classList.add('hidden');
					document.querySelector('#uNameChk').classList.add('hidden');

					document.querySelector('#loginTitle').innerHTML = "Create New Account";
				});

				YEvent.addListener('devoLoginAccount', 'click', function(ev) { devoLinks(ev, true); });
				YEvent.addListener('dbrp-loginAccount', 'click', function(ev) { devoLinks(ev, true); });
				YEvent.addListener('dp-loginAccount', 'click', function(ev) { devoLinks(ev, true); });

				YEvent.addListener('devoCreateAccount', 'click', function(ev) { devoLinks(ev, false); });
				YEvent.addListener('dbrp-createAccount', 'click', function(ev) { devoLinks(ev, false); });
				YEvent.addListener('dp-createAccount', 'click', function(ev) { devoLinks(ev, false); });
				
				function devoLinks(ev, loggingIn) {
					var homeLogin = document.querySelector('#homeLogin');
					var clearCoat = document.querySelector('#clearCoat');
					var login01 = document.querySelector('#login01');
					var register01 = document.querySelector('#register01');
					var myAni_0 = new YAHOO.util.Anim(clearCoat, {opacity: { from:0, to:0.8 }});
					var myAni_1 = new YAHOO.util.Anim(homeLogin, {opacity: { from:0, to:1 }});

					if(ev) YEvent.stopPropagation(ev);

					clearCoat.classList.remove('hidden');
					homeLogin.classList.remove('hidden');

					if (loggingIn) {
						document.querySelector('#loginTitle').innerHTML = "Login To Your Account";
						login01.classList.remove('hidden');
						register01.classList.add('hidden');
					} else {
						document.querySelector('#loginTitle').innerHTML = "Create New Account";
						login01.classList.add('hidden');
						register01.classList.remove('hidden');
					}

					myAni_0.duration = 0.250;
					myAni_1.duration = 0.1;
					myAni_0.onComplete.subscribe(function() { myAni_1.animate(); });
					myAni_0.animate();

					Dom.get('blbLForm01').reset();
					document.querySelector('#eMailChk').classList.add('hidden');
					document.querySelector('#eMailErr').classList.add('hidden');
					document.querySelector('#uPassChk').classList.add('hidden');
					document.querySelector('#uPassErr').classList.add('hidden');
					document.querySelector('#fNameChk').classList.add('hidden');
					document.querySelector('#uNameErr').classList.add('hidden');
					document.querySelector('#uNameChk').classList.add('hidden');
				}

				
				YEvent.addListener('cancelMeA', 'click', function(ev) {
					Dom.get('blbLForm02').reset();
					document.querySelector('#login01').classList.remove('hidden');
					document.querySelector('#register01').classList.add('hidden');
					document.querySelector('#failedLogin').classList.add('hidden');
					document.querySelector('#emailForgot').classList.add('hidden');
					document.querySelector('#loginTitle').innerHTML = "Login To Your Account";
				});
				YEvent.addListener('returnMeA', 'click', function(ev) {
					Dom.get('blbLForm03').reset();
					document.querySelector('#login01').classList.remove('hidden');
					document.querySelector('#forget01').classList.add('hidden');
					document.querySelector('#failedLogin').classList.add('hidden');
					document.querySelector('#emailForgot').classList.add('hidden');
					document.querySelector('#loginTitle').innerHTML = "Login To Your Account";
				});
				YEvent.addListener('resendA', 'click', function(ev) {
					var myAppBarControls = new appBarControls();
					myAppBarControls.setHTTPMethod('POST');
					myAppBarControls.setCallbackHandler(function(msg){ if(msg) document.querySelector('#emailResend').classList.add('hidden'); });
					myAppBarControls.setErrorHandler(BLB.genericHandler);
					myAppBarControls.resendActivation();
				});
				YEvent.addListener('logMeOutA', 'click', function(ev) {
					var myAppBarControls = new appBarControls();
					myAppBarControls.setHTTPMethod('POST');
					myAppBarControls.setCallbackHandler(function(msg){ if(msg) window.location.reload(); });
					myAppBarControls.setErrorHandler(BLB.genericHandler);
					myAppBarControls.getLoggedOut();
				});
				YEvent.addListener('logMeOutA_mobile', 'click', function(ev) {
					var myAppBarControls = new appBarControls();
					myAppBarControls.setHTTPMethod('POST');
					myAppBarControls.setCallbackHandler(function(msg){ if(msg) window.location.reload(); });
					myAppBarControls.setErrorHandler(BLB.genericHandler);
					myAppBarControls.getLoggedOut();
				});
				YEvent.addListener('blbLForm01', 'submit', function(ev) {
					if(this.userEmail.value !== '' && this.userPass.value !== '') {
						var myAppBarControls = new appBarControls();
						this.submit.disabled=true;
						myAppBarControls.setHTTPMethod('POST');
						myAppBarControls.setCallbackHandler(BLB.Menu.loginHandler);
						myAppBarControls.setErrorHandler(BLB.genericHandler);
						myAppBarControls.getLoggedIn(this.userEmail.value, this.userPass.value, this.stayFresh.checked);
					}
					YEvent.stopEvent(ev);
					return false;
				});
				YEvent.delegate("loginPasswordRow", "click", BLB.Menu.togglePass, ".fa");
				YEvent.delegate("registerPassRow", "click", BLB.Menu.togglePass, ".fa");
				YEvent.delegate("registerConfirmRow", "click", BLB.Menu.togglePass, ".fa");
				YEvent.addListener('blbLForm02', 'submit', function(ev) {
					var cid = this.cid.value;
					var ue = this.userEmail.value.toLowerCase();
					var un = this.userID.value;
					var up = this.userPass.value;
					var up2 = this.userPass2.value;
					var fn = this.fName.value;
					var atpos = ue.indexOf("@");
					var dotpos = ue.lastIndexOf(".");
					var tld = ue.split(/\./);

					document.querySelector('#eMailChk').classList.add('hidden');
					document.querySelector('#eMailErr').classList.add('hidden');
					document.querySelector('#uPassChk').classList.add('hidden');
					document.querySelector('#uPassErr').classList.add('hidden');
					document.querySelector('#fNameChk').classList.add('hidden');
					document.querySelector('#uNameErr').classList.add('hidden');
					document.querySelector('#uNameChk').classList.add('hidden');

					tld = tld[tld.length-1];

					if(ue.length === 0 || un.length === 0 || up.length === 0) {

					// Validate email
					} else if (atpos<1 || dotpos<atpos+2 || BLB.tld[tld] === undefined) {
						document.querySelector('#eMailErr').classList.remove('hidden');
					// Validate username
					} else if(un.search(/[^A-Za-z0-9._-]/) >= 0) {
						document.querySelector('#uNameChk').classList.remove('hidden');
					// Validate First name
					} else if(fn.length < 2) {
						document.querySelector('#fNameChk').classList.remove('hidden');
					// Validate password length
					} else if(up.length < 6) {
						document.querySelector('#uPassChk').classList.remove('hidden');
					// Valdiate passwords match
					} else if(up != up2) {
						document.querySelector('#uPassErr').classList.remove('hidden');
					} else {
						var myAppBarControls = new appBarControls();
						var s = ColdFusion.JSON.encode(Y_UA);
						this.submit.disabled=true;
						myAppBarControls.setHTTPMethod('POST');
						myAppBarControls.setCallbackHandler(BLB.Menu.userRegistration);
						myAppBarControls.setErrorHandler(BLB.genericHandler);
						myAppBarControls.userRegistration(ue,un,fn,up,up2,cid,s);
					}
					YEvent.stopEvent(ev);
					return false;
				});
				YEvent.addListener('blbLForm03', 'submit', function(ev) {
					if(this.userEmail.value !== '') {
						var myAppBarControls = new appBarControls();
						this.submit.disabled=true;
						myAppBarControls.setHTTPMethod('POST');
						myAppBarControls.setCallbackHandler(BLB.Menu.forgottenPasswdHandler);
						myAppBarControls.setErrorHandler(BLB.genericHandler);
						myAppBarControls.forgotPassword(this.userEmail.value);
					}
					YEvent.stopEvent(ev);
					return false;
				});

				YEvent.delegate("homeLoginMenu", "click", BLB.Menu.onClickHndlr, "a[rel^=index.]");
				YEvent.delegate("mobile-homeLoginMenu", "click", BLB.Menu.onClickHndlr, "a[rel^=index.]");
				YEvent.delegate("homeLogin", "click", BLB.Menu.onClickHndlr, "a[rel^='helps.']");
				YEvent.delegate("homeLogin", "click", BLB.Menu.onClickHndlr, "#tapToClose");

				YEvent.addListener('clearCoat', 'click', BLB.Menu.closeOverlay);
				YEvent.addListener('homeLoginClose', 'click', BLB.Menu.closeOverlay);
				YEvent.addListener('homeGear', 'click', function(ev) {
					var lpn = location.pathname;
					var myAppBarControls = new appBarControls();
					if(location.search !== '') lpn += location.search;
					if(location.hash !== '') lpn += location.hash;
					myAppBarControls.setHTTPMethod('GET');
					myAppBarControls.getGoBackPage(lpn);
					return true;
				});

				YEvent.addListener('homeGear_Resp', 'click', function(ev) {
					var lpn = location.pathname;
					var myAppBarControls = new appBarControls();
					if(location.search !== '') lpn += location.search;
					if(location.hash !== '') lpn += location.hash;
					myAppBarControls.setHTTPMethod('GET');
					myAppBarControls.getGoBackPage(lpn);
					return true;
				});
				
				if(typeof Client != 'undefined' && 'loginForm' in Client) {
					var p = Dom.getFirstChild('homeLoginMenu');
					p = Dom.getFirstChild(p);
					BLB.Menu.onClickHndlr(null, p, Dom.get('homeLoginMenu'));
				}

				// Check to see if there are any sticky rows that need repositioned
				BLB.checkStickyRows();
				// Set up Staff Environment Indicator and selectors
				BLB.Menu.refreshStaffLinks();

			} else {
				setTimeout(function() { BLB.Menu.init(); }, 100);
			}
		},

		refreshStaffLinks: function() {
			var betaTag = document.querySelector('#betaTag');
			if (betaTag) {
			// Setup events || Refresh staff link href targets for beta button drop down
				if (!betaTag.onmouseenter) {
				// Map click/mouse(enter|leave) events to update the link and toggle the 'hover' class for mouse and touch
					betaTag.onmouseenter = function() {
						BLB.Menu.refreshStaffLinks(); 
						document.querySelector('#betaTag').classList.add('envHover');
					}
					betaTag.onclick = function() {
						var open = document.querySelector('#betaTag').classList.toggle('envHover');
						if (open) { BLB.Menu.refreshStaffLinks(); }
					}
					betaTag.onmouseleave = function() {
						document.querySelector('#betaTag').classList.remove('envHover');
					}
				}
				else {				
				// Loop over each link and map it to the applicable LIVE|DEV|.NET variant
					var envLinks = document.querySelectorAll('.envStaffLink');
					for (var i = 0; i < envLinks.length; i++) {
						envLinks[i].href = envLinks[i].dataset.prot+envLinks[i].dataset.site+location.pathname+location.hash+location.search;
					};
				}
			}
		},

		// Remove black listed local storage or entries larger than 256k bytes
		cleanLocalStorage: function() {
			Object.entries(localStorage).forEach(function(item) {
				var key = item[0];
				var value = item[1];
				if(!BLB.Menu.localStorage_whiteList[key] && (BLB.Menu.localStorage_blackList[key]) || value.length > BLB.Menu.maxLocalStoragePerKey)
					localStorage.removeItem(key);
			});
		},

		fixupViewportHack: function(blb_viewport) {
			if(blb_viewport) {
				Dom.addClass('bodTag', 'viewport');
				if(document.querySelector('#dView')) Dom.get('dView').innerHTML = '<p>View Mobile Optimized</p>';
				document.querySelectorAll('.view-desktop-mode>div.choice.one').forEach(function(item) {item.classList.add('checked'); });
				document.querySelectorAll('.view-desktop-mode>div.choice.two').forEach(function(item) {item.classList.remove('checked'); });
				Dom.get('viewport').setAttribute('content', 'width=1024');
			} else {
				Dom.removeClass('bodTag', 'viewport');
				if(document.querySelector('#dView')) Dom.get('dView').innerHTML = '<p>View Desktop Site</p>';
				document.querySelectorAll('.view-desktop-mode>div.choice.one').forEach(function(item) {item.classList.remove('checked'); });
				document.querySelectorAll('.view-desktop-mode>div.choice.two').forEach(function(item) {item.classList.add('checked'); });
				Dom.get('viewport').setAttribute('content', 'width=device-width, initial-scale=1.0');
			}
		},

		closeOverlay: function(ev) {
			var homeLogin = document.querySelector('#homeLogin');
			var clearCoat = document.querySelector('#clearCoat');
			var login01 = document.querySelector('#login01');
			var forget01 = document.querySelector('#forget01');
			var register01 = document.querySelector('#register01');
			var register02 = document.querySelector('#register02');
			var myAni_0 = new YAHOO.util.Anim(clearCoat, {opacity: { to:0 }});
			var myAni_1 = new YAHOO.util.Anim(homeLogin, {opacity: { from:1, to:0 }});

			if(!document.querySelector('#register02').classList.contains('hidden')) window.location.reload();

			myAni_0.duration = 0.250;
			myAni_1.duration = 0.1;
			myAni_0.onComplete.subscribe(function() {
				clearCoat.classList.add('hidden');
			});
			myAni_1.onComplete.subscribe(function() {
				homeLogin.classList.add('hidden');
				myAni_0.animate();
			});
			myAni_1.animate();
			BLB.closePickerMenus('homeLogin');
			login01.classList.remove('hidden');
			forget01.classList.add('hidden');
			register01.classList.add('hidden');
			register02.classList.add('hidden');
			document.querySelector('#loginTitle').innerHTML = "Login To Your Account";
			if(ev) YEvent.stopPropagation(ev);
		},

		togglePass: function(ev, matchedEl, container) {
			if (matchedEl == null || matchedEl.dataset == null || matchedEl.dataset.cat == null) { return false; }
			var cat = matchedEl.dataset.cat;
			var val = matchedEl.dataset.val;
			var passToggles = document.querySelectorAll('[data-cat="togglePass"]');
			var inputType, showGroup, hideGroup;
			switch (cat) {
				case 'togglePass':
					if (val == "show") {
						inputType = "text";
						showGroup = "hide";
						hideGroup =  "show";
					}
					else if (val == "hide") {
						inputType = "password";
						showGroup = "show";
						hideGroup =  "hide";
					}
					passToggles.forEach(function(el) {
						if (el.dataset != null && el.dataset.val == showGroup) { el.classList.remove('hide')}
						else if (el.dataset != null && el.dataset.val == hideGroup) { el.classList.add('hide')}
					})
					document.querySelector('#loginPasswordRow .passInput').type = inputType;
					document.querySelector('#registerPassRow .passInput').type = inputType;
					document.querySelector('#registerConfirmRow .passInput').type = inputType;
				break;
			}
		},

		loginHandler: function(msg) {
			if(msg) { window.location.reload(); return false; }
			else BLB.Menu.displayAlert('failedLogin');
			Dom.get('blbLForm01').submit.disabled=false;
			BLB.Menu.alertsTimer = setTimeout(BLB.Menu.resetAlerts, 5000);
		},


		userRegistration: function(msg) {
			document.querySelector('#eMailChk').classList.add('hidden');
			document.querySelector('#eMailErr').classList.add('hidden');
			document.querySelector('#uPassChk').classList.add('hidden');
			document.querySelector('#uPassErr').classList.add('hidden');
			document.querySelector('#fNameChk').classList.add('hidden');
			document.querySelector('#uNameErr').classList.add('hidden');
			document.querySelector('#uNameChk').classList.add('hidden');
			switch(msg) {
				case 'eMailChk': case 'eMailErr': case 'uPassChk': case 'uPassErr':
				case 'fNameChk': case 'uNameErr': case 'uNameChk':
					BLB.Menu.displayAlert(msg);
					break;
				case 'noCID':
					alert('An unknown error ocurred while trying to create your registration. Please refresh your browser page and retry your registration.');
					break;
				case 'success':
					document.querySelector('#register02').classList.remove('hidden');
					BLB.Menu.alertsTimer = setTimeout(function() {window.location.reload();}, 5000);
					break;
				case 'Error_ID-10t':
					alert('An unknown error ocurred while trying to create your registration.');
					break;
				default:
					break;
			}
			Dom.get('blbLForm02').submit.disabled=false;
			BLB.Menu.alertsTimer = setTimeout(BLB.Menu.resetAlerts, 5000);
		},

		forgottenPasswdHandler: function(msg) {
			// if(msg==1) {
				// document.querySelector('#eMailExist').classList.add('hidden');
				document.querySelector('#failedLogin').classList.add('hidden');
				document.querySelector('#forget01').classList.add('hidden');
				document.querySelector('#login01').classList.remove('hidden');
				BLB.Menu.displayAlert('emailForgot');
				Dom.get('blbLForm02').reset();
			// } else if(msg===0) {
				// BLB.Menu.displayAlert('eMailExist');
			// }
			Dom.get('blbLForm03').submit.disabled=false;
			BLB.Menu.alertsTimer = setTimeout(BLB.Menu.resetAlerts, 5000);
		},

		displayAlert: function(el) {
			var h = 0;
			var mb = 0;
			el = document.querySelector('#'+el);
			el.classList.remove('hidden');
			clearTimeout(BLB.alertsTimer);
			h = Dom.getStyle(el, 'height').replace(/px/, '');
			mb = Dom.getStyle(el, 'margin-bottom').replace(/px/, '');
			Dom.setStyle(el, 'height', 0);
			Dom.setStyle(el, 'opacity', 0);
			var myAni_0 = new YAHOO.util.Anim(el, {marginBottom:{to:mb}, height:{to:h}, opacity:{to:1}});
			myAni_0.duration=0.2;
			myAni_0.animate();
		},

		resetAlerts: function() {
			Dom.getElementsByClassName('alert', 'P', 'bodTag', function(el) {
				if(!el.classList.contains('hidden')) {
					var myAni_0 = new YAHOO.util.Anim(el, {marginBottom:{to:0}, height:{to:0}, opacity:{to:0}});
					myAni_0.onComplete.subscribe(function() {Dom.setStyle(el, 'margin-bottom', ''); Dom.setStyle(el, 'height', ''); Dom.setStyle(el, 'opacity', 1); el.classList.add('hidden'); });
					myAni_0.animate();
				}
			});
		},

		onClickHndlr: function(ev, matchedEl, container) {
			switch(container.id) {
				case 'menuTop':
					if(matchedEl.tagName == 'A' && (matchedEl.innerHTML == '&nbsp;[?]' || matchedEl.innerHTML == '?')) {
						relA = matchedEl.rel.split(/\./);
						if(relA[0] == 'helps') {	// Show the individual search / widget helps
							var pDiv = Dom.get('popupDiv');
							// BLB.clearPDivStyles();
							Dom.get('menuTop').appendChild(pDiv);
							link = matchedEl.rel;
							document.querySelector('#popupDivContents').innerHTML = BLB.popupDivContents;
							pDiv.classList.remove('hidden');
							Dom.setStyle(pDiv, 'width', '300px');
							Dom.setStyle(pDiv, 'z-index', 510);
							BLB.setXY(matchedEl, pDiv);
							BLB.toolTipPopup(link, null, false);
							YEvent.stopPropagation(ev);
						}
					}
					break;
				case 'homeLoginMenu': case 'mobile-homeLoginMenu':
					var login01 = document.querySelector('#login01');
					var homeLogin = document.querySelector('#homeLogin');
					var clearCoat = document.querySelector('#clearCoat');
					var myAni_0 = new YAHOO.util.Anim(clearCoat, {opacity: { from:0, to:0.8 }});
					var myAni_1 = new YAHOO.util.Anim(homeLogin, {opacity: { from:0, to:1 }});

					login01.classList.remove('hidden');
					clearCoat.classList.remove('hidden');
					homeLogin.classList.remove('hidden');

					myAni_0.duration = 0.250;
					myAni_1.duration = 0.1;
					myAni_0.onComplete.subscribe(function() { myAni_1.animate(); });
					myAni_0.animate();
					Dom.get('blbLForm01').userEmail.focus();
					if(ev) YEvent.stopPropagation(ev);
					break;
				case 'homeLogin':
					if(matchedEl.id === 'tapToClose') {
						BLB.Menu.closeOverlay();
						return false;
					}
					var relA = matchedEl.rel.split(/\./);
					if(relA[0] == 'helps') {	// Show the help
						var pDiv = Dom.get('popupDiv');
						// BLB.clearPDivStyles();
						link = matchedEl.rel;
						document.querySelector('#popupDivContents').innerHTML = BLB.popupDivContents;
						pDiv.classList.remove('hidden');
						Dom.setStyle(pDiv, 'width', '300px');
						Dom.setStyle(pDiv, 'z-index', '521');
						BLB.setXY(matchedEl, pDiv, 0, 10);
						BLB.toolTipPopup(link, null, false);
						YEvent.stopPropagation(ev);
					}
					break;
				default:
					break;
			}
			return false;
		},

		onTouchHndlr: function(ev, matchedEl, container) {
			switch(container.id) {
				case 'menuTop':
					if(matchedEl.tagName.toLowerCase() == 'a' && Dom.isAncestor('menuBlock', matchedEl)) {
						var menuID = matchedEl.id.split(/_/)[1]+'Drop';
						if(document.querySelector('#'+menuID).classList.contains('hidden'))
							BLB.Menu.startMenuAnim(matchedEl);
						else
							BLB.Menu.stopMenuAnim(menuID);
					}
					break;
				default:
					break;
			}
			YEvent.preventDefault(ev);
			return false;
		},

		onMouseOverHndlr: function(ev, matchedEl, container) {
			switch(container.id) {
				case 'menuTop':
					if(matchedEl.tagName.toLowerCase() == 'a' && Dom.isAncestor('menuBlock', matchedEl)) {
						var menuID = matchedEl.id.split(/_/)[1]+'Drop';
						var animDelay = 700;	// Delay for mouseover to reveal menu
						var allHidden = true;
						for(var x in BLB.Menu.menuAnimsTimerIn)
							if(!document.querySelector('#'+x).classList.contains('hidden'))
								allHidden = false;
						if(!allHidden) animDelay = 300;
						clearTimeout(BLB.Menu.menuAnimsTimerOut[menuID]);
						if(BLB.lastAnimatedMenu)
							clearTimeout(BLB.Menu.menuAnimsTimerOut[BLB.Menu.lastAnimatedMenu]);
						if(document.querySelector('#'+menuID).classList.contains('hidden'))
							BLB.Menu.menuAnimsTimerIn[menuID] = setTimeout(function() { BLB.Menu.startMenuAnim(matchedEl); }, animDelay);
					} else if(matchedEl.tagName.toLowerCase() == 'div' && Dom.hasClass(matchedEl, 'menuDrop')) {
						clearTimeout(BLB.Menu.menuAnimsTimerOut[matchedEl.id]);
					} else if(matchedEl.tagName.toLowerCase() == 'div' && Dom.hasClass(matchedEl, 'popup')) {
						clearTimeout(BLB.Menu.menuAnimsTimerOut[BLB.Menu.lastAnimatedMenu]);
					}
					break;
				default:
					break;
			}
			YEvent.preventDefault(ev);
			return false;
		},

		onMouseOutHndlr: function(ev, matchedEl, container) {
			switch(container.id) {
				case 'menuTop':
					if(Dom.isAncestor('menuBlock', matchedEl) || Dom.hasClass(matchedEl, 'menuDrop')) {
						var menuID = matchedEl.id.split(/_/)[1]+'Drop';
						if(matchedEl.id.search(/Drop$/) > 0) menuID = matchedEl.id;
						for(var x in BLB.Menu.menuAnimsTimerIn)
							clearTimeout(BLB.Menu.menuAnimsTimerIn[x]);
						BLB.Menu.menuAnimsTimerOut[menuID] = setTimeout(function() { BLB.Menu.stopMenuAnim(menuID); }, 350);
						YEvent.stopPropagation(ev);
					} else if(Dom.isAncestor('menuBlock', matchedEl) || Dom.hasClass(matchedEl, 'popup')) {
						for(var y in BLB.Menu.menuAnimsTimerIn)
							clearTimeout(BLB.Menu.menuAnimsTimerIn[y]);
						BLB.Menu.menuAnimsTimerOut[BLB.Menu.lastAnimatedMenu] = setTimeout(function() { BLB.Menu.stopMenuAnim(BLB.Menu.lastAnimatedMenu); }, 350);
						YEvent.stopPropagation(ev);
					}
					if(matchedEl.tagName.toLowerCase() == 'a') BLB.onMouseOutHndlr(ev, matchedEl, container);
					break;
				default:
					break;
			}
			return false;
		},

		// Menubar hover stopper
		startMenuAnim: function(matchedEl) {
			var x = Dom.getX(matchedEl);
			var width = matchedEl.offsetWidth;
			var menuArrow = Dom.get('menuArrow');
			var menuArrowWidth = Dom.getStyle(menuArrow, 'width');
			var menuId = matchedEl.id.split(/_/)[1]+'Drop';
			var dropMenu = document.querySelector('#'+menuId);

			dropMenu.appendChild(menuArrow);
			menuArrowWidth = parseInt(menuArrowWidth.replace(/\D/g), 10);
			x += width/2 - menuArrowWidth/2;
			dropMenu.classList.remove('hidden');
			Dom.setX(menuArrow, x, true);

			BLB.Menu.menuAnims[menuId].onComplete.unsubscribeAll();
			BLB.Menu.menuAnims[menuId].onComplete.subscribe(function() {
					var myself = this.getEl();
					BLB.Menu.menuAnimsTimerIn[myself.id] = 0;
				});
			if(BLB.Menu.lastAnimatedMenu) BLB.Menu.stopMenuAnim(BLB.Menu.lastAnimatedMenu);
			BLB.Menu.menuAnims[dropMenu.id].animate();
			BLB.Menu.lastAnimatedMenu = menuId;
		},

		// Menubar hover stopper
		stopMenuAnim: function(menuId) {
			//var imgEl = Dom.get('MM_'+menuId.replace(/Drop/, ''));
			//imgEl.src = imgEl.src.replace(/_b\.png/, '_a.png');

			BLB.Menu.menuAnims[menuId].onComplete.unsubscribeAll();
			BLB.Menu.menuAnims[menuId].onComplete.subscribe(function() {
					var myself = this.getEl();
					myself.classList.add('hidden');
					if(BLB.Menu.lastAnimatedMenu == myself.id) BLB.Menu.lastAnimatedMenu = null;
					BLB.Menu.menuAnimsTimerOut[myself.id] = 0;
					BLB.Menu.closeSubMegaMenus('bodTag');
					Dom.get('bodTag').appendChild(Dom.get('popupDiv'));
	//				BLB.closePickerMenus('bodTag');
				});
			BLB.Menu.menuAnims[menuId].animate();
		},

		// Internal Menus that are pop-up like need to be silenced when MM menus are closed
		// Call this BLB.Menu.registerSubMegaMenus() to register those items
		registerSubMegaMenus: function(el) {
			var iL = BLB.pickerMenus.length;
			var ele = Dom.get(el);
			if(ele) {
				var elID = ele.id;
				for(var i=0;i<iL;i++) if(BLB.Menu.subMegaMenus[i] == elID) return false;
				BLB.Menu.subMegaMenus.push(elID);
				return true;
			}
			return false;
		},

		closeSubMegaMenus: function(el) {
			var ns = Dom.get(el);
			var iL = BLB.Menu.subMegaMenus.length;
			for(var i=0;i<iL;i++) if(BLB.Menu.subMegaMenus[i] != ns.id) try { document.querySelector('#'+BLB.Menu.subMegaMenus[i]).classList.add('hidden'); } catch(error) {}
		},

		pwReset: function(formObj){
			var ue = formObj.email.value.toLowerCase();
			var up = formObj.userPass.value;
			var up2 = formObj.userPass2.value;
			var atpos = ue.indexOf("@");
			var dotpos = ue.lastIndexOf(".");
			var tld = ue.split(/\./);

			tld = tld[tld.length-1];

			if(ue.length == 0 || up.length == 0 || up2.length == 0 || atpos<1 || dotpos<atpos+2 || BLB.tld[tld] == undefined) {
				return false;
			} else if(up.length < 6) {
				BLB.Menu.displayAlert('uPassResetChk');
				BLB.Menu.alertsTimer = setTimeout(BLB.Menu.resetAlerts, 5000);
				return false;
			} else if(up != up2) {
				BLB.Menu.displayAlert('uPassResetErr');
				BLB.Menu.alertsTimer = setTimeout(BLB.Menu.resetAlerts, 5000);
				return false;
			}

			return true;
		},

		initAudioTracking: function() {
			var els = document.querySelectorAll('audio.trackPlayback');
			for (var i = 0; i < els.length; i++) {
				els[i].playCount = 0;
				els[i].onplay = function() {
					this.playCount++;
					if (this.playCount == 1) {
						var req = new XMLHttpRequest();
						req.open("GET", "/tools/tracking/catcher.cfm?group="+encodeURI(this.dataset.group)+'&name='+encodeURI(this.dataset.name), true);
						req.send();
					}
				}
			}
		},

	};

	YEvent.onDOMReady(BLB.Menu.init, BLB.Menu.init, true);

})();
