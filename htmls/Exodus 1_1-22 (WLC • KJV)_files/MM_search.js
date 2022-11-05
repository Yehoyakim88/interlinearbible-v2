/*
	fileName:	MM_search.js
	Author:		Dan Davis
	Date:		10/22/2012

*/

(function() {
	BLB.mmSearch = {
		csEl: ['csr', 'csrf', 'csrt', 'cscs'],
		orderS: {mmv_pvr:1,mmv_prv:2,mmv_llvr:3,mmv_llrv:4,mmv_llsl:5,mmv_llvo:6,mmv_llro:7,mmv_pro:8},
		refDelimS: {mmv_rdn:0,mmv_rds:1,mmv_rdc:2,mmv_rdp:3},
		numDelimS: {mmv_ndnn:0,mmv_ndnd:1,mmv_nds:2,mmv_ndc:3,mmv_ndp:4},

		init: function() {
			if(BLB.blbIsLoaded) {
				var sp01 = Dom.get('menuBibleSearch');
				YEvent.delegate("menuOptionsClose", 'click', BLB.mmSearch.onClickHndlr, 'td > div > div');
				YEvent.delegate("mvOptionsMenu", 'click', BLB.mmSearch.onClickHndlr, 'td > div > div');
				YEvent.addListener('mvOptionsMenu', 'click', function(ev) { YEvent.stopPropagation(ev); });
				YEvent.addListener('advOptMenu', 'click', function(ev) { YEvent.stopPropagation(ev); });

				YEvent.addListener('menuOptionsClose', 'click', function(ev) { if(Dom.getStyle('mvOptionsMenu', 'display') != 'none') document.querySelector('#mvOptionsMenu').classList.add('hidden'); });
				YEvent.addListener('searchDrop', 'click', function(ev) {
					if(!document.querySelector('#mvOptionsMenu').classList.contains('hidden')) document.querySelector('#mvOptionsMenu').classList.add('hidden');
					if(!document.querySelector('#advOptMenu').classList.contains('hidden')) document.querySelector('#advOptMenu').classList.add('hidden');
				});

				if(BLB.mmSearch.mvOptionsMenu == undefined) {
					BLB.mmSearch.mvOptionsMenu = {
						order: BLB.copyOptions.order.replace(/co_/, 'mmv_'),
						refDelim: BLB.copyOptions.refDelim.replace(/co_/, 'mmv_'),
						numDelim: BLB.copyOptions.numDelim.replace(/co_/, 'mmv_'),
						misc: {
							mmv_abbrev: BLB.copyOptions.misc.co_abbrev,
							mmv_quoted: BLB.copyOptions.misc.co_quoted,
							mmv_sqrbrkt: BLB.copyOptions.misc.co_sqrbrkt,
							mmv_sblabbrev: BLB.copyOptions.misc.co_sblabbrev,
							mmv_endash: BLB.copyOptions.misc.co_endash,
							mmv_sorted: false
						}
					};
				}
				YEvent.delegate("advOptDivMenu", "click", BLB.mmSearch.onClickHndlr, "a");
				YEvent.delegate("advOptDivMenu", "click", BLB.mmSearch.onClickHndlr, "button");
				YEvent.delegate("advOptDivMenu", "change", BLB.mmSearch.onChangeHndlr, "select");
				YEvent.delegate("advOptDivMenu", "change", BLB.mmSearch.onChangeHndlr, "input[type=text]");
				YEvent.delegate("advOptDivMenu", "keyup", BLB.mmSearch.onChangeHndlr, "input[type=text]");
				YEvent.delegate("advOptDivMenu", "blur", BLB.mmSearch.onChangeHndlr, "input[type=text]");
				YEvent.delegate("menuSelectDropU", "click", BLB.mmSearch.onClickHndlr, "img");
				YEvent.delegate("menuSearchSel", "click", BLB.mmSearch.onClickHndlr, "span");
				YEvent.delegate("mvMenuFormSelectDropU", "click", BLB.mmSearch.onClickHndlr, "img");
				YEvent.delegate("mvMenuFormSearchSel", "click", BLB.mmSearch.onClickHndlr, "span");

				if(sp01.csr.selectedIndex != 0 ||
					sp01.csrf.selectedIndex != 0 ||
					sp01.csrt.selectedIndex != 0 ||
					sp01.cscs.value != '') {
						document.querySelector('#clearAnchorMenu').classList.remove('hidden');
						document.querySelector('#clrAdvOptMenu').classList.remove('hidden');
				}

				BLB.Menu.registerSubMegaMenus('mvOptionsMenu');
				BLB.Menu.registerSubMegaMenus('advOptMenu');
				BLB.Menu.registerSubMegaMenus('menuSearchSel');
				BLB.Menu.registerSubMegaMenus('mvMenuFormSearchSel');
				BLB.registerPickerMenus('menuSearchSel');
				BLB.registerPickerMenus('mvMenuFormSearchSel');

			} else {
				setTimeout(function() { BLB.mmSearch.init(); }, 100);
			}
		},

		onClickHndlr: function(ev, matchedEl, container) {
			switch(container.id) {
				// Display or hide the version select menu on the MM_search Bible search
				case 'menuSelectDropU':
					BLB.switchShowState('menuSearchSel', 'searchDrop');
					YEvent.stopPropagation(ev);
					break;
				// Update the search form and display of the selected translation - MM_search Bible search
				case 'menuSearchSel':
					var t = matchedEl.innerHTML;
					YEvent.stopPropagation(ev);
					if(t=="&nbsp;") return false;
					container.classList.add('hidden');
					BLB.updateSearchForms(t);
					break;
				// Display or hide the version select menu on the MM_search MultiVerse search
				case 'mvMenuFormSelectDropU':
					BLB.switchShowState('mvMenuFormSearchSel', 'searchDrop');
					YEvent.stopPropagation(ev);
					break;
				// Update the search form and display of the selected translation - MM_search MultiVerse search
				case 'mvMenuFormSearchSel':
					var t = matchedEl.innerHTML;
					YEvent.stopPropagation(ev);
					if(t=="&nbsp;") return false;
					container.classList.add('hidden');
					BLB.updateSearchForms(t);
					break;
				default:
					break;
			};

			switch(matchedEl.id) {
				case 'shAdvOptMenu':
					var sp01 = Dom.get('menuBibleSearch');
					if(document.querySelector('#advOptMenu').classList.contains('hidden') &&
						(sp01.csr.selectedIndex != 0 ||
						 sp01.csrf.selectedIndex != 0 ||
						 sp01.csrt.selectedIndex != 0 ||
						 sp01.cscs.value != '')) {
							document.querySelector('#clrAdvOptMenu').classList.remove('hidden');
					} else {
						document.querySelector('#clrAdvOptMenu').classList.add('hidden');
					}
					BLB.switchShowState('advOptMenu', 'searchDrop');
					YEvent.stopPropagation(ev);
					break;
				case 'clearAnchorMenu':
					document.querySelector('#clrAdvOptMenu').classList.add('hidden');
					BLB.mmSearch.clearForm();
					break;
				// Copy Options begin here
				case 'mmv_llvr': case 'mmv_llrv': case 'mmv_llsl': case 'mmv_llvo': case 'mmv_llro':
					BLB.mmSearch.mvOptionsMenu.order = matchedEl.id;
					Dom.addClass('numDelimMenu', 'numDelimOff');
					Dom.get('mvFormMenu').refFormat.value = BLB.mmSearch.orderS[matchedEl.id];
					Dom.getElementsByClassName('coOrder', 'img', 'mvOptionsMenu', function(el) {
						el.src = assetsSource + 'images/svg/contextBar/copyOptions/radioOff.svg';
					}, null, null);
					Dom.getElementsByClassName('numDelim', 'img', 'mvOptionsMenu', function(el) {
						el.src = assetsSource + 'images/svg/contextBar/copyOptions/radioOff.svg';
					}, null, null);
					Dom.getElementsByClassName('refDelim', 'img', 'mvOptionsMenu', function(el) {
						el.src = assetsSource + 'images/svg/contextBar/copyOptions/radioOff.svg';
					}, null, null);
					Dom.getFirstChild(matchedEl.id).src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
					Dom.getFirstChild('mmv_ndnn').src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
					if(BLB.mmSearch.mvOptionsMenu.order == 'mmv_llro')
						Dom.getFirstChild('mmv_rdn').src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
					else if(BLB.mmSearch.mvOptionsMenu.order != 'mmv_llvo')
						Dom.getFirstChild(BLB.mmSearch.mvOptionsMenu.refDelim).src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
					YEvent.stopPropagation(ev);
					break;
				case 'mmv_pvr': case 'mmv_prv': case 'mmv_pro':
					BLB.mmSearch.mvOptionsMenu.order = matchedEl.id;
					Dom.removeClass('numDelimMenu', 'numDelimOff');
					Dom.get('mvFormMenu').refFormat.value = BLB.mmSearch.orderS[matchedEl.id];
					Dom.getElementsByClassName('coOrder', 'img', 'mvOptionsMenu', function(el) {
						el.src = assetsSource + 'images/svg/contextBar/copyOptions/radioOff.svg';
					}, null, null);
					Dom.getElementsByClassName('numDelim', 'img', 'mvOptionsMenu', function(el) {
						el.src = assetsSource + 'images/svg/contextBar/copyOptions/radioOff.svg';
					}, null, null);
					Dom.getElementsByClassName('refDelim', 'img', 'mvOptionsMenu', function(el) {
						el.src = assetsSource + 'images/svg/contextBar/copyOptions/radioOff.svg';
					}, null, null);
					Dom.getFirstChild(matchedEl.id).src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
					if(BLB.mmSearch.mvOptionsMenu.order == 'mmv_pro') {
						Dom.getFirstChild('mmv_rdn').src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
						Dom.getFirstChild('mmv_ndnn').src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
					} else {
						Dom.getFirstChild(BLB.mmSearch.mvOptionsMenu.refDelim).src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
						Dom.getFirstChild(BLB.mmSearch.mvOptionsMenu.numDelim).src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
					}
					YEvent.stopPropagation(ev);
					break;
				case 'mmv_rdn': case 'mmv_rds': case 'mmv_rdc': case 'mmv_rdp':
					BLB.mmSearch.mvOptionsMenu.refDelim = matchedEl.id;
					Dom.get('mvFormMenu').refDelim.value = BLB.mmSearch.refDelimS[matchedEl.id];
					Dom.getElementsByClassName('refDelim', 'img', 'mvOptionsMenu', function(el) {
						el.src = assetsSource + 'images/svg/contextBar/copyOptions/radioOff.svg';
					}, null, null);
					if(BLB.mmSearch.mvOptionsMenu.order == 'mmv_llro' || BLB.mmSearch.mvOptionsMenu.order == 'mmv_pro')
						Dom.getFirstChild('mmv_rdn').src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
					else if(BLB.mmSearch.mvOptionsMenu.order != 'mmv_llvo')
						Dom.getFirstChild(BLB.mmSearch.mvOptionsMenu.refDelim).src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
					YEvent.stopPropagation(ev);
					break;
				case 'mmv_ndnn': case 'mmv_ndnd': case 'mmv_nds': case 'mmv_ndc': case 'mmv_ndp':
					BLB.mmSearch.mvOptionsMenu.numDelim = matchedEl.id;
					Dom.get('mvFormMenu').numDelim.value = BLB.mmSearch.numDelimS[matchedEl.id];
					Dom.getElementsByClassName('numDelim', 'img', 'mvOptionsMenu', function(el) {
						el.src = assetsSource + 'images/svg/contextBar/copyOptions/radioOff.svg';
					}, null, null);
					if(BLB.mmSearch.mvOptionsMenu.order.search(/^mmv_p(vr|rv)/) == 0) Dom.getFirstChild(BLB.mmSearch.mvOptionsMenu.numDelim).src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
					else Dom.getFirstChild('mmv_ndnn').src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
					YEvent.stopPropagation(ev);
					break;
				case 'mmv_sblabbrev':
					if(!BLB.mmSearch.mvOptionsMenu.misc['mmv_abbrev']) break;
					BLB.mmSearch.mvOptionsMenu.misc[matchedEl.id] = !BLB.mmSearch.mvOptionsMenu.misc[matchedEl.id];
					Dom.get('mvFormMenu')[matchedEl.id.split(/_/)[1]].value = BLB.mmSearch.oneZero(BLB.mmSearch.mvOptionsMenu.misc[matchedEl.id]);
					Dom.getFirstChild(matchedEl.id).src = assetsSource + 'images/svg/contextBar/copyOptions/check'+(BLB.mmSearch.mvOptionsMenu.misc[matchedEl.id]?'On':'Off')+'.svg';
					break;
				case 'mmv_abbrev':
					if(!BLB.mmSearch.mvOptionsMenu.misc[matchedEl.id]) {
						Dom.removeClass('mmv_sblabbrev', 'disabled');
						Dom.getFirstChild('mmv_sblabbrev').src = assetsSource + 'images/svg/contextBar/copyOptions/check'+(BLB.mmSearch.mvOptionsMenu.misc['mmv_sblabbrev']?'On':'Off')+'.svg';
					} else {
						Dom.addClass('mmv_sblabbrev', 'disabled');
						Dom.getFirstChild('mmv_sblabbrev').src = assetsSource + 'images/svg/contextBar/copyOptions/checkDisabled'+(BLB.mmSearch.mvOptionsMenu.misc['mmv_sblabbrev']?'On':'Off')+'.svg';
					}
				case 'mmv_quoted':
				case 'mmv_endash':
				case 'mmv_sqrbrkt':
				case 'mmv_sorted':
					BLB.mmSearch.mvOptionsMenu.misc[matchedEl.id] = !BLB.mmSearch.mvOptionsMenu.misc[matchedEl.id];
					Dom.get('mvFormMenu')[matchedEl.id.split(/_/)[1]].value = BLB.mmSearch.oneZero(BLB.mmSearch.mvOptionsMenu.misc[matchedEl.id]);
					Dom.getFirstChild(matchedEl.id).src = assetsSource + 'images/svg/contextBar/copyOptions/check'+(BLB.mmSearch.mvOptionsMenu.misc[matchedEl.id]?'On':'Off')+'.svg';
					YEvent.stopPropagation(ev);
					break;
				default:
					break;
			};
		},


		onChangeHndlr: function(ev, matchedEl, container) {
			var selectedIndex = 0;
			var cscsValue = '';

			document.querySelector('#clearAnchorMenu').classList.remove('hidden');

			switch(matchedEl.name) {
				case 'csr':
					var selectedIndex = matchedEl.selectedIndex;
					BLB.mmSearch.clearForm();
					matchedEl.selectedIndex = selectedIndex;
					break;
				case 'csrf':
					matchedEl.form.cscs.value = '';
					matchedEl.form.csr.selectedIndex = 0;
					matchedEl.form.csrt.selectedIndex=(matchedEl.form.csrt.selectedIndex==0?matchedEl.form.csrf.selectedIndex:matchedEl.form.csrt.selectedIndex);
					matchedEl.form.csrt.selectedIndex=(matchedEl.form.csrf.selectedIndex==0?0:matchedEl.form.csrt.selectedIndex);
					break;
				case 'csrt':
					matchedEl.form.cscs.value = '';
					matchedEl.form.csr.selectedIndex = 0;
					matchedEl.form.csrf.selectedIndex=(matchedEl.form.csrf.selectedIndex==0?matchedEl.form.csrt.selectedIndex:matchedEl.form.csrf.selectedIndex);
					matchedEl.form.csrf.selectedIndex=(matchedEl.form.csrt.selectedIndex==0?0:matchedEl.form.csrf.selectedIndex);
					break;
				case 'cscs':
					var cscsValue = matchedEl.value;
					BLB.mmSearch.clearForm();
					matchedEl.value = cscsValue;
					break;
				default:
					break;
			};
		},


		onBlurHndlr: function(ev, matchedEl, container) {
			if(matchedEl.name == 'cscs' && matchedEl.value != '') {
				var cscsValue = matchedEl.value;
				BLB.mmSearch.clearForm();
				matchedEl.value = cscsValue;
			}
		},

		clearForm: function() {
			formObj = Dom.get('menuBibleSearch');
			formObj.csr.selectedIndex = 0;
			formObj.csrf.selectedIndex = 0;
			formObj.csrt.selectedIndex = 0;
			formObj.cscs.value = '';
		},

		oneZero: function(trueFalse) {
			return trueFalse?1:0;
		}
	};

	YEvent.onDOMReady(BLB.mmSearch.init, BLB.mmSearch.init, true);

})();
