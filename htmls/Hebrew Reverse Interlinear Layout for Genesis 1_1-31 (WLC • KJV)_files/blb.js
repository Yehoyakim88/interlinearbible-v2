
var Y = YAHOO;
var YEvent = Y.util.Event;
var Dom = Y.util.Dom;
var KeyListener = Y.util.KeyListener;
var History = YAHOO.util.History;
var DDM = YAHOO.util.DragDropMgr;

// Polyfill for Chrome 49 & IE11 -- Remove in two years 11/11/2019
var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

(function() {
	Client = {};
	if(typeof String.prototype.trim !== 'function') {
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/g, '');
		};
	}

	BLB = {

		Bible: {
			isBible:false,
			isLexicon:false,
			isSearch:false,
			isHTA:false
		},

		audioTag: document.createElement('AUDIO'),
		speakerImagesPosition:2,
		animationTimer:0,
		lexPronunc:null,

		isTouchEnabled: (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)),
		n: 0,
		copySupported: false,
		lastScrolldistance:0,
		blbIsLoaded: false,
		closingBubbleID: null,
		protoTypesLoaded: false,
		imgPreloads: [],
		noHoverImgs: [],
		pickerMenus: [],
		menuTimer: 0,
		menuAnim0: {stop:function(){}, animate:function(){}},
		menuAnim1: {stop:function(){}, animate:function(){}},
		menuAnim2: {stop:function(){}, animate:function(){}},
		menuAnim3: {stop:function(){}, animate:function(){}},
		footnoteTimer01: [],
		footnoteCollection: [],
		popupDivContents: '',
		stickyDivContents: '',
		popupDivLink: null,
		vpH: Dom.getViewportHeight(),
		vpW: Dom.getViewportWidth(),
		followers: {
			followFace:'http://www.facebook.com/blueletterbible',
			followTwitter:'https://twitter.com/BlueLetterBible',
			followPinterest:'http://pinterest.com/blueletterbible/',
			followInstagram:'https://www.instagram.com/blueletterbible/',
			followYouTube:'https://www.youtube.com/channel/UCGF1fDwSyXL0VqtiEzLeB5g'
		},
		sharers: {
			shareFace:'http://www.facebook.com/sharer/sharer.php?u=SHORTURL',
			shareTwitter:'https://twitter.com/intent/tweet?text=SHORTURL',
			shareDelicious:'http://www.delicious.com/save?url=SHORTURL&title=TITLE',
			shareStumble:'http://www.stumbleupon.com/submit?url=SHORTURL&title=TITLE',
			shareReddit:'http://www.reddit.com/submit?url=SHORTURL&title=TITLE',
			shareDigg:'http://digg.com/submit?url=SHORTURL&title=TITLE',
			shareTumblr:'http://tumblr.com/widgets/share/tool?canonicalUrl=SHORTURL&title=TITLE',
			shareLinkedin:'https://www.linkedin.com/shareArticle?mini=true&url=SHORTURL&title=TITLE&summary=&source=',
			shareEmail:''
		},
		gameTime: 7000000,

		init: function() {
			if(BLB.protoTypesLoaded) {
				var d = new Date();
				var n = d.getTime();
				var fo = Dom.get('nlSubscribe');

				try {BLB.nl = BLB.getRadioValue(fo.blb_nl);} catch(e) {}

				BLB.Translation = Translation;
				BLB.copySupported = Clipboard.isSupported();
				
				if(BLB.copySupported) {
					var copyObjs = new Clipboard('[data-clipboard]');
					copyObjs.on('success', function(ev) {
						BLB.showTooltip(ev.trigger, 'Copied!');
						setTimeout(BLB.clearTooltip, 1000);
					});
					copyObjs.on('error', function(ev) {
						BLB.showTooltip(ev.trigger, fallbackMessage(ev.action));
					});
				} else {
					Dom.addClass('appLinkDrop', 'noCopy');

					Dom.addClass('linkCopy', 'hidden');
					Dom.addClass('citeMLACopy', 'hidden');
					Dom.addClass('citeAPACopy', 'hidden');
					Dom.addClass('citeCHGCopy', 'hidden');
					Dom.addClass('citeSBLCopy', 'hidden');

				}

				BLB.buildEmailForm();
				BLB.dContent = Dom.getFirstChild(Dom.get('footNoteDiv')).innerHTML;
				Dom.getElementsBy(BLB.preloadNavImgs, 'img', 'bodTag');
				Dom.getElementsBy(BLB.preloadNavImgs, 'input', 'appBar');
				Dom.getElementsBy(BLB.preloadNavImgs, 'input', 'bodyCol2');

				BLB.registerPickerMenus('appLinkDrop');
				BLB.registerPickerMenus('appCiteDrop');
				BLB.registerPickerMenus('sharePop');
				BLB.registerPickerMenus('followPop');
				BLB.registerPickerMenus('appSearchSel');
				BLB.registerPickerMenus('appSearchSel_Resp');
				BLB.registerPickerMenus('fontDrop');
				BLB.registerPickerMenus('appBarAdvOptMenu');
				BLB.registerPickerMenus('appBarAdvOptMenu_Resp');
				BLB.registerPickerMenus('popupDiv');
				BLB.registerPickerMenus('ctxtQuiknav');
				BLB.registerPickerMenus('ctxtQuiknav__chap');

				YEvent.addListener('appBarQN_Resp', 'click', function(ev) {
					BLB.switchShowState('ctxtQuiknav');
					document.querySelector('#ctxtQuiknav__books').classList.remove('hidden');
					BLB.buildCtxtQuiknavBook();
					document.querySelector('#ctxtQuiknav__chap').classList.add('hidden');
					YEvent.stopPropagation(ev);
				});

				YEvent.addListener('appBarQN', 'click', function(ev) {
					if (ev != null) { BLB.evDispatchCheck(ev.target); }
					BLB.switchShowState('ctxtQuiknav');
					document.querySelector('#ctxtQuiknav__books').classList.remove('hidden');
					BLB.buildCtxtQuiknavBook();
					document.querySelector('#ctxtQuiknav__chap').classList.add('hidden');
					YEvent.stopPropagation(ev);
				});

				YEvent.addListener("appBarAO", 'click', function(ev) {
						if (ev != null) { BLB.evDispatchCheck(ev.target); }
						BLB.switchShowState('appBarAdvOptMenu');
						BLB.closePickerMenus('appBarAdvOptMenu');
						YEvent.stopPropagation(ev);
				});
				YEvent.addListener("appBarAO_Resp", 'click', function(ev) {
						BLB.switchShowState('appBarAdvOptMenu_Resp');
						BLB.closePickerMenus('appBarAdvOptMenu_Resp');
						YEvent.stopPropagation(ev);
				});
				YEvent.addListener("mobilePrint", 'click', function(ev) {
					BLB.closePickerMenus('appCiteDrop');
					BLB.closePickerMenus('sharePop');
					window.print();
				});
				YEvent.delegate("appBarAdvOptMenu", 'click', function(e,m,c) {
						YEvent.stopPropagation(e);
				}, 'div');
				YEvent.delegate("appBarAdvOptMenu_Resp", 'click', function(e,m,c) {
						YEvent.stopPropagation(e);
				}, 'div');

				YEvent.delegate("ctxtQuiknav", 'click', function(e,m,c) {
						if(m.classList.contains('quicknav-close'))
							BLB.closePickerMenus('bodTag');
						YEvent.stopPropagation(e);
					}, 'img');
				YEvent.delegate("ctxtQuiknav__books", 'click', function(e,m,c) {
						BLB.buildCtxtQuiknavChapters(m.dataset.shortName);
						YEvent.stopPropagation(e);
					}, 'a.books-cell');

				YEvent.delegate("ctxtQuiknav__chap", 'click', function(e,m,c) {
						document.querySelector('#ctxtQuiknav__books').classList.remove('hidden');
						document.querySelector('#ctxtQuiknav__chap').classList.add('hidden');
						YEvent.stopPropagation(e);
					}, 'a.back-btn');

				YEvent.delegate("ctxtQuiknav__chap", 'click', function(e,m,c) {
						var linkArray = ['', BLB.Translation.toLowerCase(), m.dataset.shortName.toLowerCase(), m.dataset.chapter, 1];
						if(typeof redLetter !== 'undefined') linkArray.push('rl'+(redLetter?1:0));
						if(typeof showStrongs !== 'undefined') linkArray.push('ss'+(showStrongs?1:0));
						var link = linkArray.join('/');
						document.location = link;
						YEvent.stopPropagation(e);
						return false;
					}, 'a.books-cell');

				YEvent.addListener("ctxtQuiknav", 'click', function(e,m,c) {
					YEvent.stopPropagation(e);
				});

				YEvent.addListener('fontDrop', 'click', function(ev) { YEvent.stopPropagation(ev); });
				YEvent.addListener('sharePop', 'click', function(ev) { YEvent.stopPropagation(ev); });
				YEvent.addListener('followPop', 'click', function(ev) { YEvent.stopPropagation(ev); });
				YEvent.delegate("nlSubscribe", "click", BLB.onClickHndlr, "button");
				YEvent.delegate("nlSubscribe", "click", function(e, m, c) {
						Dom.getFirstChild(m).checked=true;
					}, "p");

				BLB.popupDivContents = Dom.get('popupDivContents').innerHTML;
				BLB.stickyDivContents = Dom.get('stickyDivContents').innerHTML;

				YEvent.delegate(document.getElementsByTagName('FORM'), "mouseover", BLB.onMouseOverHndlr, "input");
				YEvent.delegate(document.getElementsByTagName('FORM'), "mouseout", BLB.onMouseOutHndlr, "input");
				YEvent.delegate("bodTag", "mouseover", BLB.onMouseOverHndlr, "img");
				YEvent.delegate("bodTag", "mouseout", BLB.onMouseOutHndlr, "img");
				YEvent.delegate("bodTag", "mouseover", BLB.onMouseOverHndlr, "a");
				YEvent.delegate("bodTag", "mouseout", BLB.onMouseOutHndlr, "a");
				YEvent.delegate("selectDropU", "click", BLB.onClickHndlr, "img");
				YEvent.delegate("selectBox_Resp", "click", BLB.onClickHndlr, "button");
				YEvent.delegate("appVersion", "click", BLB.onClickHndlr, "img");

				// Handle clicks outside of our menus, so we can close them
				YEvent.delegate("bodTag", "click", BLB.onClickHndlr, "a");
				YEvent.delegate("bodTag", "click", BLB.onClickHndlr, "*");

				YEvent.delegate("appSearchSel", "click", BLB.onClickHndlr, "span");
				YEvent.delegate("appSearchSel_Resp", "click", BLB.onClickHndlr, "span");
				YEvent.delegate("appVerSel", "click", BLB.onClickHndlr, "span");
				YEvent.delegate("appVerSel_Resp", "click", BLB.onClickHndlr, "span");
				YEvent.delegate("appSettings", "click", BLB.onClickHndlr, "a");
				YEvent.delegate("popupDiv", "click", function(ev) { YEvent.stopPropagation(ev); }, "div#popupDivContents");
				YEvent.delegate("searchDrop", "click", BLB.onClickHndlr, "a");
				YEvent.delegate("aboutDrop", "click", BLB.onClickHndlr, "a");
				YEvent.delegate("appSoc", "click", BLB.onClickHndlr, "a");
				YEvent.delegate("mobAppSoc", "click", BLB.onClickHndlr, "a");
				YEvent.delegate("sharePop", "click", BLB.onClickHndlr, "a");
				YEvent.delegate("followPop", "click", BLB.onClickHndlr, "a");
				YEvent.delegate("appLinkDrop", "click", BLB.onClickHndlr, "*");
				YEvent.delegate("appCiteDrop", "click", BLB.onClickHndlr, "*");
				YEvent.delegate("bodyCol2", "click", BLB.onClickHndlr, "a[rel^='helps.']");
				YEvent.delegate("bodyCol1", "click", BLB.onClickHndlr, "a[rel^='helps.']");
				YEvent.delegate(Dom.getElementsByClassName("help"), "click", BLB.onClickHndlr, "span");

				YEvent.delegate("bodyCol1", "click", function(e, m, c) {
					var pDiv = Dom.get('popupDiv');
					var link = m.dataset.helps;
					if(BLB.popupDivLink == link) return;
					BLB.popupDivLink = link;
					document.querySelector('#popupDivContents').innerHTML = BLB.popupDivContents;
					pDiv.classList.remove('hidden');
					BLB.setXY(m, pDiv);
					BLB.toolTipPopup(link, null, false);
					YEvent.stopPropagation(e);
				}, "a[data-helps]");

				YEvent.delegate("pageControls", "click", BLB.onClickHndlr, "img");
				YEvent.delegate("fontDrop", "click", BLB.onClickHndlr, "img");
				YEvent.delegate("toolsHndl", "mouseover", BLB.onMouseOverHndlr, "img");
				YEvent.delegate("toolsHndl", "mouseout", BLB.onMouseOutHndlr, "img");
				YEvent.delegate("toolsHndl", "click", BLB.onClickHndlr, "img");

				YEvent.delegate("appBarAdvOptMenu", "change", BLB.onChangeHndlr, "select");
				YEvent.delegate("appBarAdvOptMenu", "change", BLB.onChangeHndlr, "input[type=text]");
				YEvent.delegate("appBarAdvOptMenu", "keyup", BLB.onChangeHndlr, "input[type=text]");
				YEvent.delegate("appBarAdvOptMenu", "blur", BLB.onChangeHndlr, "input[type=text]");

				YEvent.delegate("appBarAdvOptMenu_Resp", "change", BLB.onChangeHndlr, "select");
				YEvent.delegate("appBarAdvOptMenu_Resp", "change", BLB.onChangeHndlr, "input[type=text]");
				YEvent.delegate("appBarAdvOptMenu_Resp", "keyup", BLB.onChangeHndlr, "input[type=text]");
				YEvent.delegate("appBarAdvOptMenu_Resp", "blur", BLB.onChangeHndlr, "input[type=text]");

				YEvent.delegate("responsiveNav", "click", BLB.onClickHndlr, "*");
				YEvent.delegate("navVerseSwitcher", "click", BLB.onClickHndlr, "*");


				// Fire up limiting script

				// Get all elements that are going to have their
				// children limited.
				var loadMoreEles = Dom.getElementsByClassName('__ln-loadmore');

				for (var i = 0; i < loadMoreEles.length; i++) {
					var thresh = loadMoreEles[i].getAttribute('data-loadmax');
					var totals = loadMoreEles[i].hasAttribute('data-showtotals');
					new LoadNext({ baseElement: loadMoreEles[i], showTotals: totals, rowThreshold: thresh });
				}


				// Init text trimming script
				// Get all elements to be trimmed
				var trimTextEles = Dom.getElementsByClassName('__tt-trimtext');

				for (var i = 0; i < trimTextEles.length; i++) {
					var limit = trimTextEles[i].getAttribute('data-lines');
					new TrimText({ baseElement: trimTextEles[i], showLines: limit });
				}

				BLB.yesNoKey = new KeyListener(document, {shift:false, ctrl:false, alt:false, keys:[BLB.keyCodes.y, BLB.keyCodes.n]}, function(ev, evA) {
					switch(evA[0]) {
						case BLB.keyCodes.y:
							BLB.confirmClose(true);
							break;
						case BLB.keyCodes.n:
							BLB.confirmClose(false);
							break;
						default:
							break;
					}
				}, 'keyup');

				YEvent.addListener('rtNavLexSearch', 'submit', BLB.nullForm);
				YEvent.addListener('rtNavFaqSearch', 'submit', BLB.nullForm);
				YEvent.addListener('rtNavBibleSearch', 'submit', BLB.nullForm);
				YEvent.addListener('appBarSearch', 'submit', BLB.searchSubmit);
				YEvent.addListener('appBarSearch_Resp', 'submit', BLB.searchSubmit);
				YEvent.addListener('footNoteDiv', 'mouseover', function() {
					clearTimeout(BLB.footnoteTimer01.shift());
				});
				YEvent.addListener('footNoteDiv', 'mouseout', function() {
					BLB.footnoteTimer01.push( setTimeout(BLB.stopFootNoteAnim, 1000) );
				});

				try {
					if(location.hash.length !== 0) {
						var hash = Dom.get(location.hash.replace(/^#/, ''));
						if(hash) {
							BLB.snapTo(hash);
							YEvent.onContentReady('bodTag', function() {
								BLB.snapTo(hash);
							}, null, null);
						}
					}
				} catch(error) {}

				// Ping-pong to keep the session alive if the browser remains open
				setTimeout(function() { BLB.letsPlay(n); }, BLB.gameTime);

				// appBar hider
				if(!Y.env.ua.mobile && Dom.get('toolsHndl')) {
					BLB.appBarPosition = 'down';
					if(Dom.get('copyOptions'))
						YEvent.addListener('copyOptions', 'mouseover', function() { BLB.appBarPosition = 'down'; clearTimeout(BLB.menuTimer); });

					if(Dom.get('contextBarT'))
						YEvent.addListener('contextBarT', 'mouseover', function() { BLB.appBarPosition = 'down'; clearTimeout(BLB.menuTimer); });

					YEvent.addListener('whole', 'mouseover', function(ev) {
							var distance = 107;
							if(!Dom.get('contextBarT'))
								distance = 100;
							if(BLB.appBarPosition == 'down' && ev.clientY > distance) {
								BLB.appBarPosition = 'goingUp';
								BLB.menuTimer = setTimeout(function() {BLB.showHideAppBars('up');}, 1000);
							}

							if(BLB.appBarPosition == 'goingUp' && ev.clientY < distance) {
								BLB.appBarPosition = 'down';
								clearTimeout(BLB.menuTimer);
							}
						});
				}

				YEvent.addListener(window, 'resize', function() {
					BLB.vpH = Dom.getViewportHeight();
					BLB.vpW = Dom.getViewportWidth();
					BLB.closePickerMenus('bodTag');
				});

				// Root word pronunciation
				YEvent.addListener(BLB.audioTag, 'ended', function(el) { BLB.playSpeaker(BLB.lexPronunc, 'paused'); });

				BLB.blbIsLoaded = true;
			} else {
				setTimeout(function() { BLB.init(); }, 100);
			}
		},

		buildCtxtQuiknavChapters: function(shortName) {
			var maxChapters = BLB.BookNumbers[shortName].split(/,/).length;
			var cellClass = "";
			var chaptersTable = document.querySelector('#ctxtQuiknav__chap > .books-table');

			var qnTitle = document.querySelector('#ctxtQuiknav__chap > .qn-title');
			qnTitle.innerHTML = BLB.BookLongName[shortName];

			if (BLB.BookOrder[shortName] > 39)  {
				qnTitle.className = "qn-title nt-title";
				cellClass = "nt-cell";		
			} else {
				qnTitle.className = "qn-title ot-title";
				cellClass = "ot-cell";
			}

			document.querySelector('#ctxtQuiknav__chap > .books-table').innerHTML = '';

			for(var i=1;i<=maxChapters;i++) {
				var a = document.createElement('A');
				a.innerHTML = i;
				a.dataset.shortName = shortName;
				a.dataset.chapter = i;
				a.classList.add(cellClass);
				a.classList.add('books-cell');
				chaptersTable.appendChild(a);
			}
			document.querySelector('#ctxtQuiknav__books').classList.add('hidden');
			document.querySelector('#ctxtQuiknav__chap').classList.remove('hidden');
			BLB.positionQuickNav();
		},

		buildCtxtQuiknavBook: function(shortName) {
			var otTable = document.querySelector('.books-table.ot-table');
			var ntTable = document.querySelector('.books-table.nt-table');
			otTable.innerHTML = '';
			ntTable.innerHTML = '';
			for(var i=1;i<=39;i++) {
				var a = document.createElement('A');
				a.dataset.shortName = BLB.BookOrder[i];
				a.classList.add('books-cell', 'ot-cell');
				a.innerHTML = ' '+BLB.BookOrder[i]+' ';
				otTable.appendChild(a);
			}
			for(var i=40;i<=66;i++) {
				var a = document.createElement('A');
				a.dataset.shortName = BLB.BookOrder[i];
				a.classList.add('books-cell', 'nt-cell');
				a.innerHTML = ' '+BLB.BookOrder[i]+' ';
				ntTable.appendChild(a);
			}
			BLB.positionQuickNav();
		},

		playPronuncation: function(container) {
			var mp3File = container.dataset.pronunc;
			if(container.classList.contains('prPlayerOn')) {
				container.classList.remove('prPlayerOn');
				BLB.audioTag.pause();
				BLB.playSpeaker(BLB.lexPronunc, 'paused');
			} else {
				BLB.playSpeaker(BLB.lexPronunc, 'paused');
				try {
					BLB.audioTag.src = '/lang/lexicon/lexPronouncePlayer.cfm?skin='+mp3File;
					BLB.audioTag.volume = 0.5;
					BLB.audioTag.play();
				} catch (e) {
					console.log("Error: " + e);
				}
				container.classList.add('prPlayerOn');
				BLB.playSpeaker(container, 'play');
			}
			BLB.lexPronunc = container;
		},

		playSpeaker: function(container, state) {
			if(container == null) return;
			if(state == 'play') {
				BLB.animationTimer = setInterval(function() {
					if(BLB.speakerImagesPosition == 2) BLB.speakerImagesPosition = -1;
					var img = container.querySelector('img');
					img.src = img.src.replace(/[123](?:_[ab])?\.svg/, ++BLB.speakerImagesPosition+1 + '.svg');
				}, 500);
			} else {
				clearInterval(BLB.animationTimer);
				BLB.animationTimer = 0;
				BLB.speakerImagesPosition = 2;
				var img = container.querySelector('img');
				img.src = img.src.replace(/[123](?:_[ab])?\.svg/, '2.svg');
				container.classList.remove('prPlayerOn');
			}
		},

		squisherAnimate: function() {
			var myBLB = new mBLB();
			myBLB.setHTTPMethod('POST');
			myBLB.setAsyncMode();
			myBLB.setSquishy(document.querySelector('#container').classList.toggle('fullColumn'));
		},

		checkStickyRows: function() {
		// console.info('sticky row check!');
		// PUSRPOSE: applies the properties needed to .stickyHeader elements to pin them to the top when scrolling
		// {{StickyHeaders var}} is an ARRAY of elements which should be PINNED to the top WHEN SCROLLING
			var stickyHeaders = document.querySelectorAll('.stickyHeader');
			if (stickyHeaders != null && stickyHeaders.length > 0) {			
			// {{foldTop var}} is the THRESHOLD where content STARTS TO GO UNDER THE MENU
				var foldTop = 0;
			// {foldEl var} is the element defining the TOP MENU of the page
				var foldEl = document.querySelector('#responsiveNav');
				if (foldEl == null || foldEl.clientHeight == 0) { foldEl = document.querySelector('#contextBarT')}
				if (foldEl == null || foldEl.clientHeight == 0) { foldEl = document.querySelector('#appBar')}
				if (foldEl == null || foldEl.clientHeight == 0) { foldEl = document.querySelector('#menuTop')}
				if (foldEl != null && foldEl.clientHeight != 0) { 
					foldTop += foldEl.getBoundingClientRect().top; 
					foldTop += foldEl.getBoundingClientRect().height - 1;
				}
				for (var x = 0; x < stickyHeaders.length; x++) {
					stickyHeaders[x].style.position = 'sticky';
					stickyHeaders[x].style.top = foldTop+'px';
				}
			}
		},

		getTrueHeight: function(el) {
		// PURPOSE: Returns the true height (including margin and border) of the supplied element id
			var ele = Dom.get(el);
			var elHeight = parseInt(ele.offsetHeight);
			var elMargin = parseInt(Dom.getStyle(ele, 'marginTop')) + parseInt(Dom.getStyle(ele, 'marginBottom'));
			var elBorder = parseInt(Dom.getStyle(ele, 'borderTopWidth')) + parseInt(Dom.getStyle(ele, 'borderBottomWidth'));
			return (elHeight+elMargin+elBorder);
		},

		buildAppBarQuiknavChapters: function(shortName) {
			var maxChapters = BLB.BookNumbers[shortName].split(/,/).length;
			var appBarQuiknav_chap = Dom.get('appBarQuiknav_chap');
			var h2 = document.createElement('H2');
			var div = document.createElement('DIV');
			var button = document.createElement('BUTTON');

			appBarQuiknav_chap.innerHTML = '';
			button.innerHTML = 'BOOKS';
			h2.innerHTML = BLB.BookLongName[shortName].toUpperCase() + ' :: Select a chapter';
			appBarQuiknav_chap.appendChild(h2);
			appBarQuiknav_chap.appendChild(button);
			appBarQuiknav_chap.appendChild(div);
			for(var i=1;i<=maxChapters;i++) {
				var a = document.createElement('A');
				a.innerHTML = i;
				a.setAttribute('rel', shortName+'_'+i);
				div.appendChild(a);
			}
			appBarQuiknav_chap.classList.remove('hidden');
			BLB.positionQuickNav();
		},

		positionQuickNav: function() {
			var quickNav = document.querySelector('#ctxtQuiknav');
			var respNav = document.querySelector('#responsiveNav');
			var appBar = document.querySelector('#appBar');
			if (quickNav && respNav && respNav.getBoundingClientRect().height > 0) {
				quickNav.style.top = (respNav.getBoundingClientRect().bottom)+'px';
			}
			else if (quickNav && appBar && appBar.getBoundingClientRect().height > 0) {
				quickNav.style.top = (20 + appBar.getBoundingClientRect().bottom)+'px';
			}
		},

		showHideAppBars: function(upDown) {
			var appBar = Dom.get('appBar');
			var contextBarT = Dom.get('contextBarT');
			var menuTop = Dom.get('menuTop');
			var whole = Dom.get('whole');
			var travelDuration;

			travelDuration = 0.500;
			if(upDown == 'up') {
				BLB.appBarPosition = 'goingUp';
				BLB.closePickerMenus('bodTag');
				BLB.menuAnim0 = new YAHOO.util.Anim('appBar', {top:{to:-45}}, travelDuration);
				BLB.menuAnim1 = new YAHOO.util.Anim('contextBarT', {top:{to:-75}}, travelDuration);
//				BLB.menuAnim2 = new YAHOO.util.Anim('menuTop', {top:{to:-103}}, travelDuration);
				BLB.menuAnim3 = new YAHOO.util.Anim('whole', {paddingTop:{to:68}}, travelDuration);
				BLB.menuAnim3.onComplete.subscribe(function() { BLB.appBarPosition = 'up'; });
			} else if(upDown == 'down') {
				BLB.appBarPosition = 'goingDown';
				BLB.menuAnim0 = new YAHOO.util.Anim('appBar', {top:{to:30}}, travelDuration);
				BLB.menuAnim1 = new YAHOO.util.Anim('contextBarT', {top:{to:0}}, travelDuration);
//				BLB.menuAnim2 = new YAHOO.util.Anim('menuTop', {top:{to:0}}, travelDuration);
				BLB.menuAnim3 = new YAHOO.util.Anim('whole', {paddingTop:{to:108}}, travelDuration);
				BLB.menuAnim3.onComplete.subscribe(function() { BLB.appBarPosition = 'down'; });
			}
			BLB.menuAnim0.animate();
			BLB.menuAnim1.animate();
			BLB.menuAnim2.animate();
			BLB.menuAnim3.animate();
		},

		letsPlay: function(t) {
			var d = new Date();
			var n = d.getTime();
			var myBLB = new mBLB();
			myBLB.setAsyncMode();
			myBLB.ping(n-t);
			setTimeout(function() { BLB.letsPlay(n); }, BLB.gameTime);
		},


		onClickHndlr: function(ev, matchedEl, container, addObj) {
			BLB.evDispatchCheck(matchedEl);
			var fc;
			var dc = matchedEl.getAttribute('data-clipboard');
			if(dc != null) return true;
			switch(container.id) {
				case 'nlSubscribe':
					var fo = Dom.get('nlSubscribe');
					var nl = BLB.getRadioValue(fo.blb_nl);
					if(nl == BLB.nl)
						return false;

					var myBLB = new mBLB();
					myBLB.setAsyncMode();
					try {
						var fo2 = Dom.get('personalPrefs');
						BLB.setRadioValue(fo2.blb_nl, nl.split(/,/).reverse()[0]);
						BLB.uPrefs.nl = parseInt(BLB.getRadioValue(fo2.blb_nl), 10);
					} catch(e) {}
					myBLB.setCallbackHandler(function() {
							BLB.nl = BLB.getRadioValue(fo.blb_nl);
							BLB.displayAlert('nlSuccess');
							BLB.alertsTimer = setTimeout(BLB.resetAlerts, 5000);
						});
					myBLB.setErrorHandler(BLB.genericErrorHandler);
					myBLB.setDevoSubscriptions(nl);
					break;
				case 'toolsHndl':
					BLB.appBarPosition = 'goingDown';
					clearTimeout(BLB.menuTimer);
					BLB.showHideAppBars('down');
					break;
				case 'fontDrop':
					if(matchedEl.id == 'fontSwitcher' || matchedEl.id == 'fd_close') {
						BLB.switchShowState('fontDrop');
					} else {
						BLB.fontController(matchedEl);
					}
					YEvent.stopPropagation(ev);
					break;
				case 'pageControls':
					if(matchedEl.id == 'fontSwitcher' || matchedEl.id == 'fd_close') {
						BLB.switchShowState('fontDrop');
						YEvent.stopPropagation(ev);
					}
					break;
				// Display or hide the version select menu on the app bar
				case 'selectDropU':
					BLB.closePickerMenus('appSearchSel');
					BLB.switchShowState('appSearchSel');
					YEvent.stopPropagation(ev);
					break;
				case 'selectBox_Resp':
					BLB.closePickerMenus('appSearchSel_Resp');
					BLB.switchShowState('appSearchSel_Resp');
					YEvent.stopPropagation(ev);
					break;
				case 'appVersion':
					BLB.closePickerMenus('appVerSel');
					BLB.showAppVersion();
					YEvent.stopPropagation(ev);
					break;
				case 'responsiveNav':
					BLB.closePickerMenus('responsiveNav');
					if(matchedEl.id !== 'searchHelps01_Resp') YEvent.stopPropagation(ev);
					break;
				// Hide pop-overs during a routine click event
				case 'bodTag':
					if(matchedEl.tagName.toLowerCase()!='embed') {
						BLB.closePickerMenus('bodTag');
						BLB.popupDivLink = null;
						if(BLB.conc !== undefined) BLB.conc.popupDivLink = null;
					}
					if(matchedEl.tagName.toLowerCase()=='a' &&
						matchedEl.hash.search(/#/)>=0 &&
						matchedEl.protocol+matchedEl.hostname+matchedEl.pathname+matchedEl.search == location.protocol+location.hostname+location.pathname+location.search) {
						var hash = Dom.get(matchedEl.hash.replace(/^#/, ''));
						if(hash !== null) {
							BLB.snapTo(hash);
							YEvent.preventDefault(ev);
						}
						YEvent.stopPropagation(ev);
					}
					if(matchedEl.id === 'searchHelps01' | matchedEl.id === 'searchHelps01_Resp') {
							var link = 'helps.searchPrime';
							var pDiv = Dom.get('popupDiv');
							if(BLB.popupDivLink == link) return;
							BLB.popupDivLink = link;
							BLB.closePickerMenus('bodTag');
							document.querySelector('#popupDivContents').innerHTML = BLB.popupDivContents;
							pDiv.classList.remove('hidden');
							BLB.setXY(this, pDiv, -120, 40);
							BLB.toolTipPopup(link, null, false);
							YEvent.stopPropagation(ev);
					}
					return false;
				case 'bodyCol1': case 'bodyCol2':
					if(matchedEl.tagName.toLowerCase()=='a') {
						var relA = matchedEl.rel.split(/\./);
						if(relA && relA[0] == 'helps') {	// Show the individual search / widget helps
							var pDiv = Dom.get('popupDiv');
							var link = matchedEl.rel;
							if(BLB.popupDivLink == link) return;
							BLB.popupDivLink = link;
							document.querySelector('#popupDivContents').innerHTML = BLB.popupDivContents;
							pDiv.classList.remove('hidden');
							BLB.setXY(matchedEl, pDiv);
							BLB.toolTipPopup(link, null, false);
							YEvent.stopPropagation(ev);
						}
					}
					break;
				// Update the search form and display of the selected translation
				case 'appSearchSel': case 'appSearchSel_Resp':
					var t = matchedEl.innerHTML;
					YEvent.stopPropagation(ev);
					if(t=="&nbsp;") return false;
					container.classList.add('hidden');
					BLB.updateSearchForms(t);
					break;
				// Update the search form and display of the selected translation
				case 'appVerSel':
					var title = matchedEl.title.split(/:/)[0];
					BLB.reloadOnTranslationChange(title);
					break;
				// Update the search form and display of the selected translation
				case 'appVerSel_Resp':
					var title = matchedEl.title.split(/:/)[0];
					BLB.reloadOnTranslationChange(title);
					break;
				// Set the 'goBackPage' link for the userPrefs page
				case 'appSettings':
					var lpn = location.pathname;
					var myAppBarControls = new appBarControls();
					if(location.search.length !== 0) lpn += location.search;
					if(location.hash.length !== 0) lpn += location.hash;
					myAppBarControls.setHTTPMethod('POST');
					myAppBarControls.setAsyncMode();
					myAppBarControls.getGoBackPage(lpn);
					break;
				case 'appSoc':
					fc = Dom.getFirstChild(matchedEl);
					if(fc.id == 'pageLink') {
						BLB.linkPage();
					} else if(fc.id == 'pageCite') {
						BLB.citePage('pageCite', -260, 5);
					} else if(fc.id == 'appShare') {
						BLB.closePickerMenus('sharePop');
						BLB.switchShowState('sharePop');
						BLB.setXY('appShare', 'sharePop', -105, 5);
					} else if(fc.id == 'appFollow') {
						BLB.closePickerMenus('followPop');
						BLB.switchShowState('followPop');
						BLB.setXY('appFollow', 'followPop', -105, 5);
					}
					YEvent.stopPropagation(ev);
					break;
				case 'mobAppSoc':
					fc = matchedEl;
					if(fc.id == 'pageCiteMobi') {
						BLB.citePage('pageCiteMobi', -60, 5);
					} else if(fc.id == 'appShareMobi') {
						BLB.closePickerMenus('sharePop');
						BLB.switchShowState('sharePop');
						BLB.setXY('appShareMobi', 'sharePop', -165, 5);
					} else if(fc.id == 'pageCopyOptionsMobi')
						BLB.contextBar.onClickHndlr(ev, matchedEl, container);
					YEvent.stopPropagation(ev);
					break;
				case 'sharePop':
				case 'followPop':
					fc = Dom.getFirstChild(matchedEl);
					BLB.sharePage(fc.id);
					YEvent.stopPropagation(ev);
					break;
				case 'appLinkDrop':
					if(matchedEl.id == 'linkClose') document.querySelector('#appLinkDrop').classList.add('hidden');
					YEvent.stopPropagation(ev);
					break;
				case 'appCiteDrop':
					if(matchedEl.id == 'citeClose') document.querySelector('#appCiteDrop').classList.add('hidden');
					YEvent.stopPropagation(ev);
					break;
				default:
					break;
			}
			return false;
		},


		onMouseOverHndlr: function(ev, matchedEl, container) {
			switch(container.id) {
				case 'toolsHndl':
					BLB.menuTimer = setTimeout(function() {BLB.showHideAppBars('down');}, 500);
					break;
				default:
					break;
			}
			switch(matchedEl.tagName) {
				// Image swap in top nav bar
				// Image swap 'Your Bible Version is'
				case 'IMG':
					if(BLB.noHoverImgs[matchedEl.src] || matchedEl.classList.contains('noSwap')) break;
					if(matchedEl.src.search(/\/images\/bibleMedia\//) > 0) break;
					if(matchedEl.src.search(/_a.(png|jpg|svg)$/) > 0) matchedEl.src = matchedEl.src.replace(/_a.(png|jpg|svg)/, '_b.$1');
					break;
				case 'A':
					if(matchedEl.rel == 'footnotes') BLB.showFootnote(matchedEl, true);
					if(matchedEl.href.search('/tools/redirect.cfm') > 0) {
						var lSearch = matchedEl.href.split('?')[1].split('&');

						for(var i=0;i<lSearch.length;i++) {
							var qq = lSearch[i].split('=');
							if(qq[0].toLowerCase() == 'site') {
								matchedEl.href = decodeURIComponent(qq[1]);
								matchedEl.dataset.evCat = 'offsiteLink';
								return false;
							}
						}
						matchedEl.href = '/';	// In case we failed to determine the link value
					}
					break;
				default:
					break;
			}
			switch(container.tagName) {
				// Hover control for right sided bubbles
				case 'FORM':
					if(matchedEl.type == 'image') matchedEl.src = matchedEl.src.replace(/_a.(png|jpg|svg)/, '_b.$1');
					break;
				default:
					break;
			}
			return false;
		},


		onMouseOutHndlr: function(ev, matchedEl, container) {
			switch(container.id) {
				case 'toolsHndl':
					clearTimeout(BLB.menuTimer);
					break;
				default:
					break;
			}
			switch(matchedEl.tagName) {
				// Image swap in top nav bar
				// Image swap 'Your Bible Version is'
				case 'IMG':
					if(BLB.noHoverImgs[matchedEl.src] || matchedEl.classList.contains('noSwap')) break;
					if(matchedEl.src.search(/_b.(png|jpg|svg)$/) > 0) matchedEl.src = matchedEl.src.replace(/_b.(png|jpg|svg)/, '_a.$1');
					break;
				case 'A':
					if(matchedEl.rel == 'footnotes') BLB.showFootnote(matchedEl, false);
					break;
				default:
					break;
			}
			switch(container.tagName) {
				// Hover control for right sided bubbles
				case 'FORM':
					if(matchedEl.type == 'image') matchedEl.src = matchedEl.src.replace(/_b.(png|jpg|svg)/, '_a.$1');
					break;
				default:
					break;
			}
			return false;
		},

		clearForm: function() {
			formObj = Dom.get('appBarSearch');
			formObj.csr.selectedIndex = 0;
			formObj.csrf.selectedIndex = 0;
			formObj.csrt.selectedIndex = 0;
			formObj.cscs.value = '';
		},

		onChangeHndlr: function(ev, matchedEl, container) {
			var selectedIndex = 0;
			var cscsValue = '';
			var t2i;
			switch(matchedEl.name) {
				case 'csr':
					selectedIndex = matchedEl.selectedIndex;
					BLB.clearForm();
					matchedEl.selectedIndex = selectedIndex;
					break;
				case 'csrf':
					matchedEl.form.cscs.value = '';
					matchedEl.form.csr.selectedIndex = 0;
					// If csrt (the other) is zero, make it follow csrf (us)
					matchedEl.form.csrt.selectedIndex=(matchedEl.form.csrt.selectedIndex===0?matchedEl.form.csrf.selectedIndex:matchedEl.form.csrt.selectedIndex);
					// If csrf (us) went zero, make csrt (them) zero
					matchedEl.form.csrt.selectedIndex=(matchedEl.form.csrf.selectedIndex===0?0:matchedEl.form.csrt.selectedIndex);
					if(matchedEl.form.csrt.selectedIndex < matchedEl.form.csrf.selectedIndex) {
						t2i = matchedEl.form.csrt.selectedIndex;
						matchedEl.form.csrt.selectedIndex = matchedEl.form.csrf.selectedIndex;
						matchedEl.form.csrf.selectedIndex = t2i;
					}
					break;
				case 'csrt':
					matchedEl.form.cscs.value = '';
					matchedEl.form.csr.selectedIndex = 0;
					// If csrf (the other) is zero, make it follow csrt (us)
					matchedEl.form.csrf.selectedIndex=(matchedEl.form.csrf.selectedIndex===0?matchedEl.form.csrt.selectedIndex:matchedEl.form.csrf.selectedIndex);
					// If csrt (us) went zero, make csrf (them) zero
					matchedEl.form.csrf.selectedIndex=(matchedEl.form.csrt.selectedIndex===0?0:matchedEl.form.csrf.selectedIndex);
					if(matchedEl.form.csrt.selectedIndex < matchedEl.form.csrf.selectedIndex) {
						t2i = matchedEl.form.csrt.selectedIndex;
						matchedEl.form.csrt.selectedIndex = matchedEl.form.csrf.selectedIndex;
						matchedEl.form.csrf.selectedIndex = t2i;
					}
					break;
				case 'cscs':
					cscsValue = matchedEl.value;
					BLB.clearForm();
					matchedEl.value = cscsValue;
					break;
				default:
					break;
			}
		},

		sharePage: function(shareId) {
		    /*
		     * This if block (shareId == "sharePinterest") is needed to load the pinterest js file on a click event
		     * This provides a pinterest overlay that allows for the user to pick which image they want to
		     * pin on pinterest.
		     */
		    var resource;
		    if(shareId == "sharePinterest") {
		        doc=document.createElement('script');
		        doc.setAttribute('type','text/javascript');
		        doc.setAttribute('charset','UTF-8');
		        doc.setAttribute('src','//assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);
		        document.body.appendChild(doc);
		    } else if(shareId in BLB.sharers) {
                resource=BLB.sharers[shareId];
                resource = resource.replace(/SHORTURL/, encodeURIComponent(location.href));
                resource = resource.replace(/TITLE/, encodeURIComponent(document.title));
                window.open(resource);
			} else if(shareId in BLB.followers) {
				resource=BLB.followers[shareId];
				window.open(resource);
			}
		},

		buildEmailForm: function() {
			var emailForm = Dom.get('emailForm');
			if(emailForm) {
				var sURL = new appBarControls();
				sURL.setHTTPMethod('POST');
				sURL.setAsyncMode();
				sURL.setCallbackHandler(function(msg) {
						if(msg===undefined || msg.length===0) return false;
						emailForm.sURL.value=msg;
						if(emailForm.subject.value.length === 0) emailForm.subject.value = document.title;
						return false;
					});
				sURL.setErrorHandler(BLB.genericHandler);
				sURL.setShortURL(location.href);
			}
		},

		sendLink: function(emailForm) {
			// var emailForm = Dom.get('emailForm');
			var sURL = emailForm.sURL.value;
			var toEmail = emailForm.toEmail.value;
			var subject = emailForm.subject.value;
			var body = emailForm.body.value;
			var atpos = toEmail.indexOf("@");
			var dotpos = toEmail.lastIndexOf(".");
			var abc = new appBarControls();
			var tld = toEmail.split(/\./);

			sURL = sURL.replace(/<[^>]+>/g, '');
			toEmail = toEmail.replace(/<[^>]+>/g, '');
			subject = subject.replace(/<[^>]+>/g, '');
			body = body.replace(/<[^>]+>/g, '');

			tld = tld[tld.length-1];

			document.querySelector('#appbarEmailErr').classList.add('hidden');
			document.querySelector('#appbarSubjectErr').classList.add('hidden');

			if(subject.length === 0) {
				BLB.displayAlert('appbarSubjectErr');
				setTimeout(BLB.resetAlerts, 5000);
				return false;
			// Validate email
			} else if (toEmail.length === 0 || atpos<1 || dotpos<atpos+2 || BLB.tld[tld] === undefined) {
				BLB.displayAlert('appbarEmailErr');
				setTimeout(BLB.resetAlerts, 5000);
				return false;
			}

			abc.setHTTPMethod('POST');
			abc.setAsyncMode();
			abc.setCallbackHandler(function(msg) {
				// var emailForm = Dom.get('emailForm');
				emailForm.toEmail.value = '';
				emailForm.body.value = '';
				BLB.displayAlert('emailSent');
				setTimeout(BLB.resetAlerts, 5000);
			});
			abc.setErrorHandler(BLB.genericHandler);
			abc.sendLink(toEmail, sURL, subject, body);

			return false;
		},

		displayAlert: function(el) {
			var h = 0;
			var mb = 0;
			el = document.querySelector('#'+el);
			if(!el.classList.contains('hidden')) return false;
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
			document.querySelectorAll('p.alert').forEach(function(item) {
				if(!item.classList.contains('hidden')) {
					var myAni_0 = new YAHOO.util.Anim(item, {marginBottom:{to:0}, height:{to:0}, opacity:{to:0}});
					myAni_0.onComplete.subscribe(function() {
						Dom.setStyle(item, 'margin-bottom', '');
						Dom.setStyle(item, 'height', '');
						Dom.setStyle(item, 'opacity', 1);
						item.classList.add('hidden');
					});
					myAni_0.animate();
				}
			});
		},

		linkPage: function() {
			BLB.closePickerMenus('appLinkDrop');
			if(document.querySelector('#appLinkDrop').classList.contains('hidden')) {
				var sURL = new appBarControls();
				sURL.setHTTPMethod('POST');
				sURL.setAsyncMode();
				sURL.setCallbackHandler(function(msg) {
						if(msg===undefined || msg.length===0) return false;
						var inp = Dom.getFirstChild('appLinkBox');
						BLB.tinyLocation=msg;
						document.querySelector('#appLinkDrop').classList.remove('hidden');
						inp.value = BLB.tinyLocation;
						inp.selectionStart = 0;
						inp.selectionEnd = BLB.tinyLocation.length;
						inp.focus();
						Dom.get('linkCopy').setAttribute("data-clipboard-text", BLB.tinyLocation);
						BLB.setXY('pageLink', 'appLinkDrop', -120, 5);
						return true;
					}
				);
				sURL.setErrorHandler(BLB.genericHandler);
				sURL.setShortURL(location.href);
			} else {
				document.querySelector('#appLinkDrop').classList.add('hidden');
			}
		},

		citePage: function(targetObj, Xoffset, Yoffset) {
			BLB.closePickerMenus('appCiteDrop');
			if(document.querySelector('#appCiteDrop').classList.contains('hidden')) {
				var sURL = new appBarControls();
				sURL.setHTTPMethod('POST');
				sURL.setAsyncMode();
				sURL.setCallbackHandler(function(msg) {
						if(msg===undefined || msg.length===0) return false;
						document.querySelector('#citeMLA').innerHTML = msg.MLA;
						document.querySelector('#citeAPA').innerHTML = msg.APA;
						document.querySelector('#citeCHG').innerHTML = msg.CHG;
						document.querySelector('#citeSBL').innerHTML = msg.SBL;
						document.querySelector('#appCiteDrop').classList.remove('hidden');
						BLB.setXY(targetObj, 'appCiteDrop', Xoffset, Yoffset);
						document.querySelector('#citeMLACopy').setAttribute("data-clipboard-text", document.querySelector('#citeMLA').textContent);
						document.querySelector('#citeAPACopy').setAttribute("data-clipboard-text", document.querySelector('#citeAPA').textContent);
						document.querySelector('#citeCHGCopy').setAttribute("data-clipboard-text", document.querySelector('#citeCHG').textContent);
						document.querySelector('#citeSBLCopy').setAttribute("data-clipboard-text", document.querySelector('#citeSBL').textContent);
						return true;
					}
				);
				sURL.setErrorHandler(BLB.genericHandler);
				sURL.getPageCitation(location.href, document.title);
			} else {
				document.querySelector('#appCiteDrop').classList.add('hidden');
			}
		},

		checkTextLength: function(ev, matchedEl) {
			if(matchedEl.value.length > 131)
				matchedEl.value = matchedEl.value.substring(0, 131);
			 else
			 	Dom.get('charSpan').innerHTML = 131 - matchedEl.value.length;
		},

		setRadioValue: function(radio, value) {
			for (var i=0,length=radio.length;i<length;i++)
				if (radio[i].value == value)
					return(radio[i].checked=true);
		},

		getRadioValue: function(radio) {
			for (var i=0,length=radio.length;i<length;i++)
				if (radio[i].checked)
					return(radio[i].value);
		},

		switchShowState: function(elId, cl) {
			var ns = Dom.get(elId);
			BLB.closePickerMenus(elId, cl);
			if(ns.classList.contains('hidden'))
				ns.classList.remove('hidden');
			else
				ns.classList.add('hidden');
		},

		closePickerMenus: function(el, cl) {
			var el = Dom.get(el);
			var cl = Dom.get(cl);
			var iL = BLB.pickerMenus.length;
			BLB.pickerMenus.forEach( function(element, index) {
				element = document.querySelector('#'+element);
				if(element != el && cl != element)
					try { element.classList.add('hidden'); } catch(e) {;}
			});

			if(Dom.get('imgTextPop') && el.id != 'imgTextPop') {
				Dom.removeClass(imgTextPop, 'show');
				Dom.addClass(imgTextPop, 'hide');
			}
			if(el.id != 'mobileNavMenuButton' && Dom.hasClass('mobileNavMenu', 'is-active')) {
				//taken from BLB.ResponsiveMenu.toggleHiddenPanel
				var menuTrigger  = document.querySelector('.js-nav-trigger');
				menuTrigger.classList.toggle('is-active');
				menuTrigger.nextElementSibling.classList.toggle('is-active');
				menuTrigger.innerHTML = (menuTrigger.innerHTML === "Menu") ? "Close" : "Menu";
			}
			if(el.id != 'navVerseSwitcher' && Dom.hasClass('appVerSel_Resp', 'is-active')) {
				Dom.removeClass(appVerSel_Resp, 'is-active');
			}

			Dom.removeClass(Dom.getFirstChild('appBarQuiknav_book'), 'opac');
			if(Dom.get('ctxtQuiknav_book'))	// Bible Page quikNav
				Dom.removeClass(Dom.getFirstChild('ctxtQuiknav_book'), 'opac');
		},

		updateSearchForms: function(t) {
			var homeSearchVersion = Dom.get('homeSearchVersion');
			var selectedSearchImg0 = Dom.get('searchPageSelectedSearchImg');
			var selectedSearchImg1 = Dom.get('searchWedgeSelectedSearchImg');
			var selectedSearchImg2 = Dom.get('selectedSearchImg');
			var selectedSearchImg3 = Dom.get('rtNavSelectedSearchImg');
			var selectedSearchImg4 = Dom.get('menuSelectedSearchImg');
			var selectedSearchImg5 = Dom.get('mvMenuFormSelectedSearchImg');
			var selectedSearchImg6 = Dom.get('mvFormSelectedSearchImg');
			var selectedSearchImg7 = Dom.get('tinySelectedSearchImg');
			var selectedSearchImg_Resp = Dom.get('selectedSearchImg_Resp');
			var searchWedgeSelectedSearchImg = Dom.get('searchWedgeSelectedSearchImg');
			var imgSrc = assetsSource + 'images/svg/search_'+t.toLowerCase()+'.svg';
			var imgAlt = 'Search ' + t;

			if(homeSearchVersion) {
				Dom.get('homeSearchForm').t.value = t;
				homeSearchVersion.innerHTML = t;
			}
			if(selectedSearchImg0) {
				selectedSearchImg0.src = imgSrc;
				selectedSearchImg0.alt = imgAlt;
				selectedSearchImg0.title = imgAlt;
				Dom.get('searchPageBibleSearch').t.value = t;
			}
			if(selectedSearchImg1) {
				selectedSearchImg1.src = imgSrc;
				selectedSearchImg1.alt = imgAlt;
				selectedSearchImg1.title = imgAlt;
				Dom.get('searchWedgeBibleSearch').t.value = t;
			}
			if(selectedSearchImg2) {
				selectedSearchImg2.src = imgSrc;
				selectedSearchImg2.alt = imgAlt;
				selectedSearchImg2.title = imgAlt;
				Dom.get('appBarSearch').t.value = t;
			}
			if(selectedSearchImg3) {
				selectedSearchImg3.src = imgSrc;
				selectedSearchImg3.alt = imgAlt;
				selectedSearchImg3.title = imgAlt;
				Dom.get('rtNavBibleSearch').t.value = t;
			}
			if(selectedSearchImg4) {
				selectedSearchImg4.src = imgSrc;
				selectedSearchImg4.alt = imgAlt;
				selectedSearchImg4.title = imgAlt;
				Dom.get('menuBibleSearch').t.value = t;
			}
			if(selectedSearchImg5) {
				selectedSearchImg5.src = imgSrc;
				selectedSearchImg5.alt = imgAlt;
				selectedSearchImg5.title = imgAlt;
				Dom.get('mvFormMenu').t.value = t;
			}
			if(selectedSearchImg6) {
				selectedSearchImg6.src = imgSrc;
				selectedSearchImg6.alt = imgAlt;
				selectedSearchImg6.title = imgAlt;
				Dom.get('mvFormWidge').t.value = t;
			}
			if(selectedSearchImg7) {
				selectedSearchImg7.src = imgSrc;
				selectedSearchImg7.alt = imgAlt;
				selectedSearchImg7.title = imgAlt;
				Dom.get('bibleTinyForm').t.value = t;
			}
			if(selectedSearchImg_Resp) {
				selectedSearchImg_Resp.innerHTML = t;
				Dom.get('appBarSearch_Resp').t.value = t;
			}
			if(searchWedgeSelectedSearchImg) {
				searchWedgeSelectedSearchImg.innerHTML = t;
			}
		},

		// Preload the onmouseover images
		preloadNavImgs: function(imgEl) {
			if(imgEl.src.search(/_b.(png|jpg|svg)/) > 0) {
				BLB.noHoverImgs[imgEl.src] = true;
				return;
			}
			if(imgEl.src.search(/_a.(png|jpg|svg)$/) > 0) {
				if(imgEl.id === undefined || imgEl.id === "") Dom.generateId(imgEl);
				BLB.imgPreloads['tmp_'+imgEl.id] = new Image();
				BLB.imgPreloads['tmp_'+imgEl.id].src = imgEl.src.replace(/_a.(png|jpg|svg)/, '_b.$1');
			}
			return true;
		},

		clearPopupStyles: function() {
			var popupDiv = document.querySelector('#popupDiv');
			popupDiv.style.removeProperty('top');
			popupDiv.style.removeProperty('bottom');
			popupDiv.style.removeProperty('left');
			popupDiv.style.removeProperty('right');
			popupDiv.style.removeProperty('position');
		},

		confirmClose: function(answer, elID) {
			var bubbleID = BLB.closingBubbleID;
			var side = 'idx';
			var el = null;

			elID = (elID===undefined?'':elID);

			BLB.closingBubbleID = null;

			BLB.closePickerMenus('bodTag');
			BLB.yesNoKey.disable();

			if(!answer) {
				return false;
			}

			if(elID !== '') el = Dom.get(elID);
			if(!el) {
				el = Dom.get('rtBub_'+bubbleID.replace(/\./, '_'));
				side = 'rgt';
			}
			var myAni_0 = new YAHOO.util.Anim(el, {
				height: { to:0 }
			});
			myAni_0.duration = 0.250;

			myAni_0.onComplete.subscribe(function() {
				var myBLB = new mBLB();
				myBLB.setAsyncMode();
				el.parentNode.removeChild(el);
				myBLB.closeWidget(bubbleID);
			});
			myAni_0.animate();

			return false;
		},

		// Generic tooltip popup call
		// Creates a popup overlay with the targetted contents
		confirmPopup: function(link, param) {
			var myBLB = new mBLB();
			myBLB.setAsyncMode();

			try {
				myBLB.setCallbackHandler(function(msg) {
					var dd1 = new Y.util.DD("popupDiv");
					document.querySelector('div#popupDiv>div#popupDivContents').innerHTML = msg;
					dd1.setHandleElId(document.querySelector('div.parse-title'));
					popupDivContents.querySelector('img.parse-close-btn').addEventListener('click', function() { document.querySelector('div#popupDiv').classList.add('hidden'); });
				});
				myBLB.setErrorHandler(function(htc, msg) {});
				myBLB.getConfirmContent(link, param);
			} catch(error) {}
		},

		// Generic tooltip popup call
		// Creates a popup overlay with the targeted contents
		toolTipPopup: function(link, param, draggable, callback) {
			var myBLB = new mBLB();

			myBLB.setAsyncMode();
			draggable = (draggable===undefined?false:draggable);

			try {
				myBLB.setCallbackHandler(function(msg) {
					var popupDivContents = document.querySelector('div#popupDiv>div#popupDivContents')
					popupDivContents.innerHTML = msg;
					if(draggable) {
						var dd1 = new YAHOO.util.DD('popupDiv');
						dd1.setHandleElId(popupDivContents.querySelector('div.parse-title'));
					}
					if(callback) callback();
					popupDivContents.querySelector('img.parse-close-btn').addEventListener('click', function() { BLB.closePickerMenus('bodTag'); });
				});
				myBLB.getToolTipContent(link, param);
			} catch(error) {}
		},

		toolTipPopupSticky: function(link, param, draggable, callback) {
			var myBLB = new mBLB();
			var stickyDiv = document.querySelector('div#stickyDiv');

			myBLB.setAsyncMode();
			draggable = (draggable===undefined?false:draggable);

			try {
				myBLB.setCallbackHandler(function(msg) {
					var stickyDivContents = stickyDiv.querySelector('div#stickyDivContents')
					stickyDivContents.innerHTML = msg;
					if(draggable) {
						var dd1 = new YAHOO.util.DD('stickyDiv');
						dd1.setHandleElId(stickyDivContents.querySelector('div.parse-title'));
					}
					if(callback) callback();
					stickyDivContents.querySelector('img.parse-close-btn').addEventListener('click', function() {
						BLB.closePickerMenus('bodTag');
						stickyDiv.classList.add('hidden');
						document.querySelectorAll('div#bodyCol1 .wordGlow_on_sticky').forEach(function(mItem) { mItem.classList.remove('wordGlow_on_sticky'); });
					});
				});
				myBLB.getToolTipContent(link, param);
			} catch(error) {}
		},

		// footnote callback handler
		fnCallBackHandler: function(msg) {
			var footNoteDiv = Dom.get('footNoteDiv');
			var fntBody = Dom.getFirstChild(footNoteDiv);
			if(msg!==undefined && msg.length !== 0) {
				fntBody.innerHTML = msg;
				if(BLB.footnoteCollection[Translation] === undefined) BLB.footnoteCollection[Translation] = [];
				BLB.footnoteCollection[Translation][fntBody.id] = msg;
			}
		},

		showFootnote: function(el, showHide) {
			var footNoteDiv = document.querySelector('#footNoteDiv');
			var fntBody = Dom.getFirstChild(footNoteDiv);
			var myTools = new mTools();

			myTools.setCallbackHandler(BLB.fnCallBackHandler);
			myTools.setErrorHandler(BLB.genericErrorHandler);

			if(showHide) {
				var ftntType = el.id.split(/_/)[0];
				var bibleID = el.id.split(/_/)[1];
				var fntIndex = el.id.split(/_/)[2];
				fntBody.id='l_'+el.id;
				clearTimeout(BLB.footnoteTimer01.shift());
				fntBody.innerHTML = BLB.dContent;
				footNoteDiv.classList.remove('hidden');
				BLB.setXY(el, footNoteDiv);
				if(BLB.footnoteCollection[Translation] !== undefined && BLB.footnoteCollection[Translation][fntBody.id] !== undefined)
					BLB.fnCallBackHandler(BLB.footnoteCollection[Translation][fntBody.id]);
				else
					myTools.getToolContent('footnote', Translation, bibleID, ftntType+':'+fntIndex);
			} else {
				BLB.footnoteTimer01.push( setTimeout(BLB.stopFootNoteAnim, 500) );
			}
		},

		// Footnote hover stopper
		stopFootNoteAnim: function() {
			BLB.footnoteTimer01.shift();
			document.querySelector('#footNoteDiv').classList.add('hidden');

		},

		nullForm: function(ev) {
			if(this.Criteria.value.length === 0) {
				YEvent.preventDefault(ev);
				return false;
			}
			return true;
		},

		// Watch the appBar search form for empty values on certain pages of BLB
		searchSubmit: function(ev) {
			var s, h, nsh;
			if(this.Criteria.value.length === 0) {
				var goForm = Dom.get('mvForm');
				if(goForm) {
					goForm.t.value = this.t.value;
					goForm.submit();
				}
				if(BLB.Bible.isLexicon || BLB.Bible.isSearch || BLB.Bible.isHTA) {
					s = location.search.split('?')[1].split('&');
					h = document.location.hash;
					nsh = BLB.reloadOnQueryStringChange(s, h, 't', this.t.value);
					document.location = nsh.ns+nsh.h;
				}
				if(BLB.Bible.isBible) {
					BLB.reloadOnTranslationChange(this.t.value);
				}
				if(location.pathname == '/search/search.cfm') {
					s = location.search.split('?')[1].split('&');
					h = document.location.hash;
					nsh = BLB.reloadOnQueryStringChange(s, h, 't', this.t.value);
					document.location = nsh.ns+nsh.h;
				}
				YEvent.preventDefault(ev);
				return false;
			}
			return true;
		},

		positionParseHover: function(targetObj, parseCodeObj, language) {
			var mInlineParseInfoPopup = document.querySelector('#inlineParseInfoPopup');
			var mTargetObjXY = Dom.getXY(targetObj);
			var mTargetObjWidth = targetObj.offsetWidth;
			var mTargetObjHeight = targetObj.offsetHeight;
			var mLanguage = parseCodeObj.dataset.poptextLanguage;
			var mSpeech = parseCodeObj.dataset.poptextSpeech;
			var mCodeOne = parseCodeObj.dataset.poptextCodeOne;

			mInlineParseInfoPopup.dataset.language = language;

			if(mLanguage) {
				var daLanguage = mInlineParseInfoPopup.querySelector('#daLanguage');
				daLanguage.innerHTML = mLanguage;
				daLanguage.classList.remove('hidden');
			} else mInlineParseInfoPopup.querySelector('#daLanguage').classList.add('hidden');

			if(mSpeech) {
				var daSpeech = mInlineParseInfoPopup.querySelector('#daSpeech');
				daSpeech.innerHTML = mSpeech;
				daSpeech.classList.remove('hidden');
			} else mInlineParseInfoPopup.querySelector('#daSpeech').classList.add('hidden');

			if(mCodeOne) {
				var daCodeOne = mInlineParseInfoPopup.querySelector('#daCodeOne');
				var mCodeTwo = parseCodeObj.dataset.poptextCodeTwo;
				daCodeOne.innerHTML = mCodeOne.replace(/^([a-z]+(?::|$))/i, '<span class="parse-bold">$1</span>');
				daCodeOne.classList.remove('hidden');
				if(mCodeTwo) {
					var daCodeTwo = mInlineParseInfoPopup.querySelector('#daCodeTwo');
					var mCodeThree = parseCodeObj.dataset.poptextCodeThree;
					daCodeTwo.innerHTML = mCodeTwo.replace(/^([a-z]+(?::|$))/i, '<span class="parse-bold">$1</span>');
					daCodeTwo.classList.remove('hidden');
					if(mCodeThree) {
						var daCodeThree = mInlineParseInfoPopup.querySelector('#daCodeThree');
						var mCodeFour = parseCodeObj.dataset.poptextCodeFour;
						daCodeThree.innerHTML = mCodeThree.replace(/^([a-z]+(?::|$))/i, '<span class="parse-bold">$1</span>');
						daCodeThree.classList.remove('hidden');
						if(mCodeFour) {
							var daCodeFour = mInlineParseInfoPopup.querySelector('#daCodeFour');
							var mCodeFive = parseCodeObj.dataset.poptextCodeFive;
							daCodeFour.innerHTML = mCodeFour.replace(/^([a-z]+(?::|$))/i, '<span class="parse-bold">$1</span>');
							daCodeFour.classList.remove('hidden');
							if(mCodeFive) {
								var daCodeFive = mInlineParseInfoPopup.querySelector('#daCodeFive');
								daCodeFive.innerHTML = mCodeFive.replace(/^([a-z]+(?::|$))/i, '<span class="parse-bold">$1</span>');
								daCodeFive.classList.remove('hidden');
							} else mInlineParseInfoPopup.querySelector('#daCodeFive').classList.add('hidden');
						} else mInlineParseInfoPopup.querySelector('#daCodeFour').classList.add('hidden');
					} else mInlineParseInfoPopup.querySelector('#daCodeThree').classList.add('hidden');
				} else mInlineParseInfoPopup.querySelector('#daCodeTwo').classList.add('hidden');

				mInlineParseInfoPopup.querySelector('#daInfoBlock').classList.remove('hidden');
			} else {
				mInlineParseInfoPopup.querySelector('#daInfoBlock').classList.add('hidden');
				mInlineParseInfoPopup.querySelector('#daCodeOne').classList.add('hidden');
			}

			// It must be visible to get a correct measurement
			mInlineParseInfoPopup.classList.remove('hidden');
			var mPopupWidth = parseInt(mInlineParseInfoPopup.clientWidth, 10);
			if(mPopupWidth%2 != 0) mPopupWidth++;

			mTargetObjXY[0] += (mTargetObjWidth - mPopupWidth)/2;
			mTargetObjXY[1] += mTargetObjHeight + 10;
			Dom.setXY(mInlineParseInfoPopup, mTargetObjXY);
		},

		setXY: function(srcObj, targetObj, xOffset, yOffset) {
			srcObj = Dom.get(srcObj);
			targetObj = Dom.get(targetObj);
			var xy = Dom.getXY(srcObj);
			var elWidth = srcObj.offsetWidth + 18;
			var elHeight = srcObj.offsetHeight;

			var popWidth = parseInt(targetObj.clientWidth, 10);
			var popHeight = parseInt(targetObj.clientHeight, 10);
			var thisY = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

			xOffset = (xOffset===undefined?0:xOffset);
			yOffset = (yOffset===undefined?0:yOffset);
			xy[0] += xOffset;
			xy[1] += yOffset;

			// If the box will overflow the right side, adjust its position
			if((xy[0] + popWidth) > BLB.vpW)
				xy[0] -= popWidth;


			//Add 40px to the right for userpreferences
			if (Dom.hasClass(targetObj, 'popup') && BLB.vpW < 640) {
				xy[0]+=40;
			}


	// If the box will overflow the left side, adjust its position without overflowing right again
			if(xy[0]<0 && (Dom.getXY(srcObj)[0] + popWidth < BLB.vpW)) {
				xy[0] = Dom.getXY(srcObj)[0];
			} else if(xy[0]<0 && Dom.getXY(srcObj)[0] - popWidth + elWidth - 18 > 0) {
				xy[0] = Dom.getXY(srcObj)[0] - popWidth + elWidth - 18;
			} else if(xy[0] < 0) {
				xy[0]=0;
			}

	// If the box will overflow the top or bottom side, adjust its position
			if((BLB.vpH + thisY) < (xy[1] + popHeight) && ((xy[1] - popHeight + yOffset) > 0)) {
				xy[1] -= (popHeight + yOffset);
			} else {
				xy[1] += elHeight + yOffset;
			}

			BLB.clearPopupStyles();
			Dom.setXY(targetObj, xy);
		},

		// Menus that are pop-up like need to be silenced when other areas of the
		// body are clicked.  Call this BLB.registerPickerMenus() to register those menus
		registerPickerMenus: function(el) {
			var iL = BLB.pickerMenus.length;
			var ele = Dom.get(el);
			if(ele) {
				var elID = ele.id;
				for(var i=0;i<iL;i++) if(BLB.pickerMenus[i] == elID) return false;
				BLB.pickerMenus.push(elID);
				return true;
			}
			return false;
		},

		//  Snap scrolling to element, positioned at top
		snapTo: function(el) {
			var y = Dom.getY(el);
			var because = false;

			if(y===undefined) return because;

			var top = (document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop);

			var view = parseInt(BLB.vpH + top);
			var topOffset = 110;

			[400,640,820,1024].some(function(width, index) {
				if(BLB.vpW < width) return topOffset = [135, 160, 145, 100][index];
			});

			window.scrollTo(0, y-topOffset);
		},

		//  Smooth scrolling to element, positioned at top
		doScroll: function(el) {
			var y = Dom.getY(el);
			var because = false;

			if(y===undefined) return because;
			var top = (document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop);

			var view = parseInt(BLB.vpH + top);
			var topOffset = 110;

			[400,640,820,1024].some(function(width, index) {
				if(BLB.vpW < width) return topOffset = [135, 160, 145, 100][index];
			});

			BLB.smoothScroll(top, y-topOffset);
		},

		smoothScroll: function(startY, stopY) {
			var distance = stopY > startY ? stopY - startY : startY - stopY;
			stopY = (isNaN(parseInt(stopY))?0:stopY);

			if(distance < 50) {
				window.scrollTo(0, stopY); return;
			}
			var speed = Math.round(distance / 20);
			var step = Math.round(distance / 20);
			var leapY = stopY > startY ? startY + step : startY - step;
			var timer = 0;
			if(stopY > startY) {
				for(var i=startY; i<stopY; i+=step ) {
					setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
					leapY += step;
					if (leapY > stopY) leapY = stopY; timer++;
				}
				return;
			} else {
				for(var j=startY; j>stopY; j-=step ) {
					setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
					leapY -= step;
					if (leapY < stopY) leapY = stopY;
					timer++;
				}
			}
		},

		showAppVersion: function() {
			return false;
		},

		reloadOnTranslationChange: function(t) {
			return false;
		},

		blbScriptLoader: function(fn, ft, elID) {
			var fr;
			if (ft == 'js') {
				fr = document.createElement('script');
				fr.setAttribute('type', 'text/javascript');
				fr.setAttribute('src', fn);
			} else if (ft == 'css') {
				fr = document.createElement('link');
				fr.setAttribute('rel', 'stylesheet');
				fr.setAttribute('type', 'text/css');
				fr.setAttribute('href', fn);
			}
			if(typeof fr != 'undefined') {
				document.getElementsByTagName("head")[0].appendChild(fr);
				fr.setAttribute('id', elID);
			}
		},

		// Whaa, something bad happened
		genericErrorHandler: function(htc, msg) {
	//		console.log(msg);
		},

		refPointsToBibleID: function(dBlob) {
			dBlob.shortName = (dBlob.shortName===undefined?undefined:BLB.BookNames[dBlob.shortName.toLowerCase()]);
			dBlob.verse = (dBlob.verse===undefined?(function(){throw new Error("Missing required member \'verse\'!");})():parseInt(dBlob.verse, 10));
			if(dBlob.shortName!==undefined && dBlob.chapter!==undefined) {
				dBlob.chapter = parseInt(dBlob.chapter, 10);
				return {bibleID:((BLB.BookChapters[dBlob.shortName]+dBlob.chapter)*1000+dBlob.verse)};
			} else if(dBlob.bookNum!==undefined && dBlob.chapter!==undefined) {
				dBlob.chapter = parseInt(dBlob.chapter, 10);
				return {bibleID:((BLB.BookChapters[BLB.BookOrder[dBlob.bookNum]]+dBlob.chapter)*1000+dBlob.verse)};
			} else if(dBlob.chapterID!==undefined) {
				return {bibleID:((chapterID*1000)+dBlob.verse)};
			}

			return (function(){throw new Error("Missing required member(s)!");})();
		},

		bibleIDToRefPoints: function(bibleID) {
			var shortName, chapter, verse, chapterID, bookNum, maxChapter, maxVerse, nextVerse, nextChapter, nextBookNum, nextShortName, nextBibleID, previousVerse, previousChapter, previousBookNum, previousShortName, previousBibleID;
			bibleID = (bibleID===undefined?(function(){throw new Error("Missing required member \'bibleID\'!");})():parseInt(bibleID, 10));
			chapterID = parseInt(bibleID/1000, 10);
			verse = bibleID - (chapterID*1000);
			for(var i=1;i<=66;i++)
				if(chapterID > BLB.BookChapters[BLB.BookOrder[i]]) {
					shortName = BLB.BookOrder[i];
					bookNum = BLB.BookOrder[shortName];
					chapter = chapterID - BLB.BookChapters[shortName];
					maxChapter = BLB.BookNumbers[shortName].split(/,/).length;
					maxVerse = parseInt(BLB.BookNumbers[shortName].split(/,/)[chapter-1], 10);
				}
			if(shortName===undefined || chapter > maxChapter || verse > maxVerse) return {};

			nextVerse = (verse+1>maxVerse?1:verse+1);
			nextChapter = (nextVerse==1?chapter+1:chapter);
			nextChapter = (nextChapter>maxChapter?1:nextChapter);
			nextBookNum = (nextVerse==1&&nextChapter==1?bookNum+1:bookNum);
			nextBookNum = (nextBookNum>66?1:nextBookNum);
			nextShortName = BLB.BookOrder[nextBookNum];
			nextBibleID = BLB.refPointsToBibleID({shortName:nextShortName, chapter:nextChapter, verse:nextVerse}).bibleID;

			previousVerse = verse-1;
			previousChapter = (previousVerse===0?chapter-1:chapter);
			previousBookNum = (previousChapter===0?bookNum-1:bookNum);
			previousShortName = (previousBookNum===0?BLB.BookOrder[66]:BLB.BookOrder[previousBookNum]);
			previousChapter = (previousChapter===0?BLB.BookNumbers[previousShortName].split(/,/).length:previousChapter);
			previousVerse = (previousVerse===0?parseInt(BLB.BookNumbers[previousShortName].split(/,/)[previousChapter-1], 10):previousVerse);
			previousBibleID = BLB.refPointsToBibleID({shortName:previousShortName, chapter:previousChapter, verse:previousVerse}).bibleID;

			return {shortName:shortName, chapter:chapter, verse:verse, bibleID:bibleID, chapterID:chapterID, bookNum:bookNum, maxChapter:maxChapter, maxVerse:maxVerse, nextBibleID:nextBibleID, previousBibleID:previousBibleID};
		},

		getQueryStringParameters: function() {
			var lSearch = location.search.split('?');
			var qs = [];

			if(lSearch.length == 2)
				lSearch = lSearch[1].split('&');
			else
				return qs;

			for(var i=0;i<lSearch.length;i++) {
				var qq = lSearch[i].split('=');
				qs[qq[0].toLowerCase()] = qq[1];
			}
			return qs;
		},

		reloadOnQueryStringChange: function(s, h, n, v) {
			var ns = '';
			var nqs = [];
			var f = false;
			if(s[0].length===0) s.shift();
			for(var i=0;i<s.length;i++) {
				var qq = s[i].split('=');
				if(qq[0]==n && v!==undefined && v.length!== 0) {
					qq[1] = v;
					f = true;
					nqs.push(qq[0]+'='+qq[1]);
				} else if(qq[0]!=n){
					nqs.push(qq[0]+'='+qq[1]);
				}
			}

			if(!f && v!==undefined && v.length!== 0)
				nqs.push(n+'='+v);
			if(nqs.length>0) ns = '?' + nqs.join('&');
			return {ns:ns, h:h};
		},

		fontController: function(matchedEl) {
			var myBLB = new mBLB();
			var fontBlack, fontBlue, fontDarkBlue, className, fntImgs, classList;
			myBLB.setAsyncMode();
			switch(matchedEl.id) {
				case 'fontPlus': case 'fontMinus':
					var currentFontSize = 0;
					className = '';

					for(var i=1;i<=5;i++) {
						if(Dom.removeClass('bodTag', 'fontSizeMinus'+i))
							currentFontSize = -i;
						if(Dom.removeClass('bodTag', 'fontSizePlus'+i))
							currentFontSize = i;
					}
					if(matchedEl.id == 'fontPlus' && currentFontSize++>4) currentFontSize--;
					if(matchedEl.id == 'fontMinus' && currentFontSize--<-4) currentFontSize++;
					if(currentFontSize>0) className = 'fontSizePlus'+currentFontSize;
					if(currentFontSize<0) className = 'fontSizeMinus'+Math.abs(currentFontSize);
					if(currentFontSize!==0) Dom.addClass('bodTag', className);
					myBLB.setBodyFontSize(className);
					break;
				case 'fontBlack':
					var bibleTable;
					if((bibleTable=Dom.get('bibleTable'))==null && (bibleTable=Dom.get('wordsTbody'))==null) return;
					fontBlack = Dom.get('fontBlack');
					fontBlue = Dom.get('fontBlue');
					fontDarkBlue = Dom.get('fontDarkBlue');
					fontBlack.src = fontBlack.src.replace(/_[ab]/, '_sel');
					fontBlue.src = fontBlue.src.replace(/_sel/, '_a');
					fontDarkBlue.src = fontDarkBlue.src.replace(/_sel/, '_a');
					Dom.addClass(Dom.get(bibleTable).parentNode, 'text000');
					Dom.removeClass(Dom.get(bibleTable).parentNode, 'text013');
					Dom.removeClass(Dom.get(bibleTable).parentNode, 'text036');
					myBLB.setBibleColor(0);
					break;
				case 'fontDarkBlue':
					var bibleTable;
					if((bibleTable=Dom.get('bibleTable'))==null && (bibleTable=Dom.get('wordsTbody'))==null) return;
					fontBlack = Dom.get('fontBlack');
					fontBlue = Dom.get('fontBlue');
					fontDarkBlue = Dom.get('fontDarkBlue');
					fontDarkBlue.src = fontDarkBlue.src.replace(/_[ab]/, '_sel');
					fontBlack.src = fontBlack.src.replace(/_sel/, '_a');
					fontBlue.src = fontBlue.src.replace(/_sel/, '_a');
					Dom.addClass(Dom.get(bibleTable).parentNode, 'text013');
					Dom.removeClass(Dom.get(bibleTable).parentNode, 'text036');
					Dom.removeClass(Dom.get(bibleTable).parentNode, 'text000');
					myBLB.setBibleColor(1);
					break;
				case 'fontBlue':
					var bibleTable;
					if((bibleTable=Dom.get('bibleTable'))==null && (bibleTable=Dom.get('wordsTbody'))==null) return;
					fontBlack = Dom.get('fontBlack');
					fontBlue = Dom.get('fontBlue');
					fontDarkBlue = Dom.get('fontDarkBlue');
					fontBlue.src = fontBlue.src.replace(/_[ab]/, '_sel');
					fontBlack.src = fontBlack.src.replace(/_sel/, '_a');
					fontDarkBlue.src = fontDarkBlue.src.replace(/_sel/, '_a');
					Dom.addClass(Dom.get(bibleTable).parentNode, 'text036');
					Dom.removeClass(Dom.get(bibleTable).parentNode, 'text013');
					Dom.removeClass(Dom.get(bibleTable).parentNode, 'text000');
					myBLB.setBibleColor(2);
					break;
				case 'fontDefault':
					for(var j=1;j<=5;j++) {
						Dom.removeClass('bodTag', 'fontSizeMinus'+j);
						Dom.removeClass('bodTag', 'fontSizePlus'+j);
					}
					myBLB.setBodyFontSize('');
					break;
				case 'fontArial': case 'fontTrebuchet': case 'fontGeorgia': case 'fontTimes':
					if(!Dom.hasClass(matchedEl, 'selected')) {
						className = matchedEl.id.replace(/font/, 'fontType');
						fntImgs = Dom.getChildrenBy(Dom.get('fd_ft'), function(el) { if(el.tagName.toLowerCase()=='img') return true; return false;});
						classList = Dom.get('bodTag').getAttribute('class');

						classList = classList.split(/ /);
						Dom.removeClass(fntImgs, 'selected');
						for(var k=0;k<fntImgs.length;k++)
							fntImgs[k].src = fntImgs[k].src.replace(/_sel.png/, '_a.png');
						for(var l=0;l<classList.length;l++)
							if(classList[l].search(/^fontType/) === 0)
								Dom.removeClass('bodTag', classList[l]);
						Dom.addClass(matchedEl, 'selected');
						matchedEl.src = matchedEl.src.replace(/_[ab].png/, '_sel.png');
						Dom.addClass('bodTag', className);
						myBLB.setBodyFontType(className);
					}
					break;
				case 'fontH_SBLHebrew': case 'fontH_Times': case 'fontH_Arial':
					if(!Dom.hasClass(matchedEl, 'selected')) {
						className = matchedEl.id;
						fntImgs = Dom.getChildrenBy(Dom.get('fd_ftH'), function(el) { if(el.tagName.toLowerCase()=='img') return true; return false;});
						classList = Dom.get('bodTag').getAttribute('class');

						classList = classList.split(/ /);
						Dom.removeClass(fntImgs, 'selected');
						for(var m=0;m<fntImgs.length;m++)
							fntImgs[m].src = fntImgs[m].src.replace(/_sel.png/, '_a.png');
						for(var n=0;n<classList.length;n++)
							if(classList[n].search(/^fontH_/) === 0)
								Dom.removeClass('bodTag', classList[n]);
						Dom.addClass(matchedEl, 'selected');
						matchedEl.src = matchedEl.src.replace(/_[ab].png/, '_sel.png');
						Dom.addClass('bodTag', className);
						myBLB.setBodyHebrewType(className);
					}
					break;
				case 'fontG_Gentium': case 'fontG_Times': case 'fontG_Arial':
					if(!Dom.hasClass(matchedEl, 'selected')) {
						className = matchedEl.id;
						fntImgs = Dom.getChildrenBy(Dom.get('fd_ftG'), function(el) { if(el.tagName.toLowerCase()=='img') return true; return false;});
						classList = Dom.get('bodTag').getAttribute('class');

						classList = classList.split(/ /);
						Dom.removeClass(fntImgs, 'selected');
						for(var o=0;o<fntImgs.length;o++)
							fntImgs[o].src = fntImgs[o].src.replace(/_sel.png/, '_a.png');
						for(var p=0;p<classList.length;p++)
							if(classList[p].search(/^fontG_/) === 0)
								Dom.removeClass('bodTag', classList[p]);
						Dom.addClass(matchedEl, 'selected');
						matchedEl.src = matchedEl.src.replace(/_[ab].png/, '_sel.png');
						Dom.addClass('bodTag', className);
						myBLB.setBodyGreekType(className);
					}
					break;
				default:
			}
		},

		showTooltip: function(elem , msg) {
			var copyTooltip = Dom.get('copyTooltip');
			Dom.removeClass(copyTooltip, 'hidden');
			Dom.addClass(copyTooltip, 'tooltipped');
			Dom.addClass(copyTooltip, 'tooltipped-s');
			copyTooltip.setAttribute('aria-label', msg);
			var xy = Dom.getXY(elem);
			var width = parseInt(elem.clientWidth, 10);
			var height = parseInt(elem.clientHeight, 10);

			Dom.setXY(copyTooltip, xy);
			Dom.setStyle(copyTooltip, 'width', width+'px');
			Dom.setStyle(copyTooltip, 'height', height+'px');

//			BLB.setXY(elem, copyTooltip);
		},

		clearTooltip: function(elem , msg) {
			var copyTooltip = Dom.get('copyTooltip');
			Dom.addClass(copyTooltip, 'hidden');
			Dom.removeClass(copyTooltip, 'tooltipped');
			Dom.removeClass(copyTooltip, 'tooltipped-s');
			copyTooltip.removeAttribute('aria-label', msg);
			Dom.setXY(copyTooltip, [0,0]);
		},

		showTooltip2: function(elem , msg) {
			Dom.addClass(elem, 'tooltipped');
			Dom.addClass(elem, 'tooltipped-s');
			elem.setAttribute('aria-label', msg);
		},

		clearTooltip2: function(elem , msg) {
			Dom.removeClass(elem, 'tooltipped');
			Dom.removeClass(elem, 'tooltipped-s');
			elem.removeAttribute('aria-label', msg);
		},

		parseInt: function(s) {
			var newS = s.replace(/[^0-9.]/g, '');
			if(newS != '')
				return parseInt(0 + newS, 10);
			return 0;
		},

		fallbackMessage: function(action) {
			var actionMsg = '';
			var actionKey = (action==='cut'?'X':'C');
			if(/iPhone|iPad/i.test(navigator.userAgent)) {
				actionMsg = 'No support :(';
			} else if(/Mac/i.test(navigator.userAgent)) {
				actionMsg = 'Press &#8984;-'+ actionKey+' to '+ action;
			} else {
				actionMsg = 'Press Ctrl-'+ actionKey+' to '+ action;
			}
			return actionMsg;
		},

		/*
		 * @method boundsChecker - Given <refElements>, determine and correct the book, chapter, verse for valid values
		 * @param refElements - Structure of components:
		 * 		shortName
		 * 		fromChapter
		 * 		fromVerse
		 * 		toChapter
		 * 		toVerse
		 *
		 *	Analyze the start and end points of a verse range
		 *	An extra key <altered> is added to alert the caller of any changes to the refElements paramter
		 */

		boundsChecker: function(refElements) {
			refElements.altered = false;

			/* Jude vs. Judges conflicts */
			if(refElements.refShortName == "Jde" && refElements.fromChapter > 1) {
				refElements.shortName = "Jdg";
				refElements.longName = "Judges";
			}
				
			var chaps = BLB.BookNumbers[refElements.shortName].split(/,/);

			/*
				Start chapter equal zero, or larger than the last chapter of said book?
				Reset to first chapter, first verse.
			*/
			if(refElements.fromChapter <= 0 || refElements.fromChapter > chaps.length) {
				refElements.fromChapter = 1;
				refElements.fromVerse = 1;
				refElements.altered = true;
			}
			/* If the toChapter is less than the fromChapter, reset toChapter = fromChapter */
			if(refElements.toChapter != 0 && refElements.toChapter < refElements.fromChapter) {
				refElements.toChapter = refElements.fromChapter;
				refElements.toVerse = refElements.fromVerse;
				refElements.altered = true;
			}
			/*
				End chapter equal zero, or larger than the last chapter of said book?
				Reset to last chapter, and last verse
			*/
			if(refElements.toChapter <= 0 || refElements.toChapter > chaps.length) {
				refElements.toChapter = chaps.length;
				refElements.toVerse = BLB.parseInt(chaps[refElements.toChapter-1], 10);
				refElements.altered = true;
			}
			/* If the chapter distance is one and the verses seemed revered, use only the start verse */
			if(refElements.toChapter == refElements.fromChapter && refElements.fromVerse > refElements.toVerse) {
				refElements.toVerse = refElements.fromVerse;
				refElements.altered = true;
			}
			/*
				Start verse equal zero, or larger than the last verse for said book, chapter?
				Reset to 1
			*/
			if(refElements.fromVerse <= 0 || refElements.fromVerse > BLB.parseInt(chaps[refElements.fromChapter-1], 10)) {
				refElements.fromVerse = 1;
				refElements.altered = true;
			}
			/*
				End verse equal zero, or larger than the last verse for said book, chapter?
				Reset to last verse
			*/
			if(refElements.toVerse <= 0 || refElements.toVerse > BLB.parseInt(chaps[refElements.toChapter-1], 10)) {
				refElements.toVerse = BLB.parseInt(chaps[refElements.toChapter-1], 10);
				refElements.altered = true;
			}

			return refElements;
		},

		// Tag every single word of any Greek Bible for use with the Greek word popover
		prepareALIBibleData: function(container) {
			container = container===undefined?'bodyCol1':container;
			container = document.querySelector('#'+container);
			container.querySelectorAll('span.grkTextTag, span.hbrTextTag').forEach(function(currentValue, index, array) {
				var wordCount = 1;
				var maqaf = false;
				tagTextNodes = function(Node) {
					var tagName = (Node.tagName||"").toLowerCase();
					if(Node.nodeType === 3) {
						var nodeText = Node.nodeValue;
						if(nodeText === ' ') {
							Node.parentNode.insertBefore(document.createTextNode(' '), Node);
							return;
						}
						nodeText.trim().split(/ /).forEach(function(currentValue, index, array) {
							if(currentValue.replace(/[\u1fbd\u1ffd\u00b7]/g, '') === '') {
								var span = document.createTextNode(currentValue + String.fromCharCode(160));
								Node.parentNode.insertBefore(span, Node);
							} else if(currentValue.replace(/[,.;:!?]/g, '') === "") {
								var span = document.createTextNode(currentValue);
								Node.parentNode.insertBefore(span, Node);
							} else {
								// Each new span gets a space before, unles it begins with a maqaf
								if(wordCount>1 && currentValue.search(/[\u05be\u05c0\u05c3]/) != 0) Node.parentNode.insertBefore(document.createTextNode(' '), Node);
								if(currentValue.search(/[\u05be]/) > 0) {
									currentValue.trim().split(/[\u05be]/).forEach(function(mCurrentValue, index, array) {
										if(index>0) Node.parentNode.insertBefore(document.createTextNode(String.fromCharCode(1470)), Node);
										// ** If the second word of a maqaf separated word was the search term, this trext node will end with that maqaf
										if(mCurrentValue == '') maqaf = true;
										else {
											var span = document.createElement("span");
											span.classList.add('data-word');
											span.innerHTML = mCurrentValue;
											span.dataset.word = wordCount++;
											Node.parentNode.insertBefore(span, Node);
										}
									});
								} else {
									var span = document.createElement("span");
									span.classList.add('data-word');
									span.innerHTML = currentValue;
									span.dataset.word = wordCount++;
									Node.parentNode.insertBefore(span, Node);
								}
							}
						});
						Node.parentNode.removeChild(Node);
					} else if(tagName.length>0 && tagName == 'span' && (Node.classList.contains('leadIn') || Node.classList.contains('leadOut') || Node.classList.contains('criteria')))  {
						// No space if from ** above
						if(wordCount>1 && !maqaf) {
							Node.parentNode.insertBefore(document.createTextNode(' '), Node);
							maqaf = false;
						}
						if(Node.classList.contains('criteria')) {
							// If a maqaf is inside the <span class="criteria">
							if(Node.childNodes[0].nodeValue.search(/[\u05be]/) > 0) {
								tagTextNodes(Node.childNodes[0]);
							} else {
								Node.classList.add('data-word');
								Node.dataset.word = wordCount++;
							}
						}
					} else if(tagName.length>0 && tagName == 'sup') {
						return;
					} else if(Node.classList.contains('lxx-verse') || Node.classList.contains('tr-verse') || Node.classList.contains('mgnt-verse') || Node.classList.contains('wlc-verse')) {
						Node.innerHTML += ' ';
						if(wordCount>1) Node.innerHTML = ' ' + Node.innerHTML;
					} else {
						var k = [];
						var v = 0, iCNL = 0;
						var cnl = Node.childNodes.length;
						while(iCNL < cnl)
							k.push(Node.childNodes[iCNL++]);
						v = 0;
						while(v < k.length) {
							tagTextNodes(k[v++]);
						}
					}
				}
				tagTextNodes(currentValue);
				currentValue.innerHTML = currentValue.innerHTML.replace(/<\/span><sup>/g, '</span>&nbsp;<sup>');
			});
			YEvent.delegate(container, "click", function(event, matchedEl, container) {
				BLB.closePickerMenus('stickyDiv');
				var stickyDiv = Dom.get('stickyDiv');
				var bibleID = matchedEl.closest('.grkTextTag').dataset.bibleId;

				var word = matchedEl.dataset.word;
				var link = 'lexicon.greekInflection';
				var param = {action:"word",Translation:Translation,Table:Translation,bibleID:bibleID,word:word};

				YEvent.stopPropagation(event);
				if(BLB.stickyDivLink == param) return;
				BLB.stickyDivLink = param;
				if(BLB.conc !== undefined) BLB.conc.stickyDivLink = null;

				document.querySelector('#stickyDivContents').innerHTML = BLB.stickyDivContents;
				stickyDiv.classList.remove('hidden');

				BLB.toolTipPopupSticky(link, param, true, function() {
					var speaker = stickyDiv.querySelector('img.parse-speaker');
					if(speaker) speaker.addEventListener('click', function() { BLB.playPronuncation(this.parentNode); });
					YEvent.removeDelegate("stickyDivContents", "click", BLB.rmacHpcDefinitionHandler);
					YEvent.delegate("stickyDivContents", "click", BLB.rmacHpcDefinitionHandler, "span.definitions");
				});

				const oL = Dom.getXY('bodyCol2')[0];
				const oW = document.querySelector('div#bodyCol2').offsetWidth;
				if(document.querySelector('div#bodyCol2').offsetParent != null) {
					if(BLB.vpW < oL + oW) stickyDiv.style.right = 15 + 'px';
					else stickyDiv.style.left = oL-11 + 'px';
					stickyDiv.style.position = 'fixed';
					stickyDiv.style.top = 105 + 'px';
				} else if(BLB.vpW<640) {
					stickyDiv.style.top = 153 + 'px';
					stickyDiv.style.left = 1 + '%';
					stickyDiv.style.position = 'fixed';
				} else {
					stickyDiv.style.top = 153 + 'px';
					stickyDiv.style.left = 20 + '%';
					stickyDiv.style.position = 'fixed';
				}

				document.querySelectorAll('div#bodyCol1 .wordGlow_on_sticky').forEach(function(mItem) { mItem.classList.remove('wordGlow_on_sticky'); });
				matchedEl.classList.add('wordGlow_on_sticky');
			}, 'span.grkTextTag span.data-word');

			YEvent.delegate(container, "click", function(event, matchedEl, container) {
				BLB.closePickerMenus('stickyDiv');
				var stickyDiv = Dom.get('stickyDiv');
				var bibleID = matchedEl.closest('.hbrTextTag').dataset.bibleId;

				var word = matchedEl.dataset.word;
				var link = 'lexicon.hebrewInflection';
				var param = {action:"word",Translation:Translation,Table:Translation,bibleID:bibleID,word:word};

				YEvent.stopPropagation(event);
				if(BLB.stickyDivLink == param) return;
				BLB.stickyDivLink = param;
				if(BLB.conc !== undefined) BLB.conc.stickyDivLink = null;

				stickyDiv.querySelector('#stickyDivContents').innerHTML = BLB.stickyDivContents;
				stickyDiv.classList.remove('hidden');

				BLB.toolTipPopupSticky(link, param, true, function() {
					document.querySelectorAll('div.parse-tabs-container>div.parse-tabs-btn-container>button.tab').forEach(function(mCurrentValue, index, array) {
						mCurrentValue.addEventListener('click', function() { BLB.tabSwitcher(this); });
						if(index == 1 && mCurrentValue.dataset.pos.search(/[VANP]/) == 0 && array[0].dataset.pos.search(/[RTC]/) == 0) BLB.tabSwitcher(mCurrentValue);
					});
			   		document.querySelectorAll('div#stickyDiv>div#stickyDivContents span.hebrew-word').forEach(function(mCurrentValue) {
			   			mCurrentValue.addEventListener('mouseover', BLB.hewbrewWordMouseOverHandler);
			   			mCurrentValue.addEventListener('mouseout', BLB.hewbrewWordMouseOutHandler);
						mCurrentValue.addEventListener('click', function() { BLB.tabSwitcher(this); });
			   		});
				
			   		var speaker = stickyDiv.querySelector('div#stickyDiv>div#stickyDivContents img.parse-speaker');
	   				if(speaker) speaker.addEventListener('click', function() { BLB.playPronuncation(this.parentNode); });
					YEvent.removeDelegate("stickyDivContents", "click", BLB.rmacHpcDefinitionHandler);
					YEvent.delegate("stickyDivContents", "click", BLB.rmacHpcDefinitionHandler, "span.definitions");
				});

				const oL = Dom.getXY('bodyCol2')[0];
				const oW = document.querySelector('div#bodyCol2').offsetWidth;
				if(document.querySelector('div#bodyCol2').offsetParent != null) {
					if(BLB.vpW < oL + oW) stickyDiv.style.right = 15 + 'px';
					else stickyDiv.style.left = oL-11 + 'px';
					stickyDiv.style.position = 'fixed';
					stickyDiv.style.top = 105 + 'px';
				} else if(BLB.vpW<640) {
					stickyDiv.style.top = 153 + 'px';
					stickyDiv.style.left = 1 + '%';
					stickyDiv.style.position = 'fixed';
				} else {
					stickyDiv.style.top = 153 + 'px';
					stickyDiv.style.left = 20 + '%';
					stickyDiv.style.position = 'fixed';
				}

				document.querySelectorAll('div#bodyCol1 .wordGlow_on_sticky').forEach(function(mItem) { mItem.classList.remove('wordGlow_on_sticky'); });
				matchedEl.classList.add('wordGlow_on_sticky');
			}, 'span.hbrTextTag span.data-word');
		},

		hewbrewWordMouseOverHandler:function() {
			var mWordID = this.dataset.who;

			if(mWordID === '') return;

			BLB.hewbrewWordMouseOutHandler();
			document.querySelectorAll('div#stickyDiv>div#stickyDivContents span.hebrew-word[data-who="'+mWordID+'"]').forEach(function(item) {
				item.classList.add('wordGlow_on');
			});
		},
		hewbrewWordMouseOutHandler:function() {
			document.querySelectorAll('div#stickyDiv>div#stickyDivContents span.hebrew-word').forEach(function(item) {
				item.classList.remove('wordGlow_on');
			});
		},

		tabSwitcher: function(matchedEl) {
			var mWho = matchedEl.dataset.who;
			document.querySelector('div.parse-popup div#tenseDefinition').classList.add('hidden');
			document.querySelectorAll('div.parse-tabs-container>div.parse-tabs-btn-container>button.tab').forEach(function(mCurrentValue, index, array) {
				mCurrentValue.classList.remove('active');
			});
			document.querySelectorAll('div.parse-tabs-container>div.parse-tabs-content').forEach(function(mCurrentValue, index, array) {
				mCurrentValue.classList.add('hidden');
			});
			document.querySelector('div.parse-tabs-container>div.parse-tabs-btn-container>button.tab[data-who="'+mWho+'"]').classList.add('active');
			document.querySelector('div.parse-tabs-container>div.parse-tabs-content[data-who="'+mWho+'"]').classList.remove('hidden');
			BLB.hewbrewWordMouseOutHandler();
			BLB.hewbrewWordMouseOverHandler.call(matchedEl);
		},

		rmacHpcDefinitionHandler: function(event, matchedEl, container) {
			var classification = matchedEl.dataset.classification;
			var definitionId = matchedEl.dataset.definitionId;
			var language = matchedEl.dataset.language;
			var myBLB = new mBLB();
			myBLB.setAsyncMode();

			myBLB.setCallbackHandler(function(returnContent) {
				var tenseDefinition = document.querySelector('div#tenseDefinition');
				var mClassification = returnContent.classification
				var mDefinitionId = returnContent.definitionId

				if(tenseDefinition == undefined) return false;
				if(mClassification != classification && mDefinitionId != definitionId) return tenseDefinition.classList.add('hidden');
				tenseDefinition.innerHTML = returnContent.msg;
				tenseDefinition.classList.remove('hidden');
				tenseDefinition.scrollIntoView(false);
			});
			myBLB.setErrorHandler(function(htc, msg) {});
			if(language === 'hebrew')
				myBLB.getHPC_TenseDefinition(classification, definitionId);
			else
				myBLB.getRMAC_TenseDefinition(classification, definitionId);
		},

		evDispatchCheck: function(matchedEl) {
		// PURPOSE: Check if the MatchedEl or its ancestor elements has the dataset properties needed to dispatch an event call
			if (matchedEl == null) { return false; }
			var ds = matchedEl.dataset;
			if ((ds == null || ds.evCat == null) && matchedEl.closest != null && matchedEl.closest('[data-ev-action]') != null) {
				ds = matchedEl.closest('[data-ev-action]').dataset;
			}
			if (matchedEl.href != null && ds.evCat != null && ds.evCat.toLowerCase() == "offsitelink") {
				var domain = matchedEl.href.replace(/.+\/\/|www.|\..+/ig, '');
				ds.evLabel = "User clicked link to: "+matchedEl.href;
				ds.evAction = "OffSite Link | "+domain.toUpperCase();
			}
			if (ds != null && ds.evCat != null && ds.evAction != null && ds.evLabel != null) {
				BLB.evDispatch({
					event: ds.evAction,
					event_category: ds.evCat,
					event_label: ds.evLabel
				});
			}
		},

		evDispatch: function(evData) {
		// PURPOSE: Using evData {event, event_category, event_action}, this function sends user interaction events to GA
		// USAGE: Add the following attributes to any clickable HTML element to enable GA event click tracking ( data-ev-cat="EVENT_GENERAL_CATEGORY" data-ev-action="GENERAL_DESC_OF_EVENT_GROUP" data-ev-label="DESC_OF_SPECIFIC_EVENT" )
			var now = new Date().getTime();
			if (BLB.lastEvDispatch == null || now - BLB.lastEvDispatch.time > 500) {
			// If this event is not a spam or duplicate, send it to GA
				BLB.lastEvDispatch = {data: evData, time: now};
				ga('send', {
				  hitType: 'event',
				  eventCategory: evData.event_category,
				  eventAction: evData.event,
				  eventLabel: evData.event_label
				});
			}
		}
	};

	YEvent.onDOMReady(BLB.init, BLB.init, true);
	YEvent._simpleRemove(window, "unload", YEvent._unload);
})();
