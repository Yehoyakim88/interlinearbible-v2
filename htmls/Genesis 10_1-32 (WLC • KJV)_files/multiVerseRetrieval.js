
(function() {
	BLB.mvWidget = {
		orderS: {mv_pvr:1,mv_prv:2,mv_llvr:3,mv_llrv:4,mv_llsl:5,mv_llvo:6,mv_llro:7,mv_pro:8},
		refDelimS: {mv_rdn:0,mv_rds:1,mv_rdc:2,mv_rdp:3},
		numDelimS: {mv_ndnn:0,mv_ndnd:1,mv_nds:2,mv_ndc:3,mv_ndp:4},

		init: function() {
			if(BLB.blbIsLoaded) {
				YEvent.delegate("mvOptions", 'click', BLB.mvWidget.onClickHndlr, 'td > div > div');
				YEvent.delegate("mvFormSelectDropU", "click", BLB.mvWidget.onClickHndlr, "img");
				YEvent.delegate("mvFormSearchSel", "click", BLB.mvWidget.onClickHndlr, "span");

				if(BLB.mvWidget.mvOptions == undefined) {
					BLB.mvWidget.mvOptions = {
						order: BLB.copyOptions.order.replace(/co_/, 'mv_'),
						refDelim: BLB.copyOptions.refDelim.replace(/co_/, 'mv_'),
						numDelim: BLB.copyOptions.numDelim.replace(/co_/, 'mv_'),
						misc: {
							mv_abbrev: BLB.copyOptions.misc.co_abbrev,
							mv_quoted: BLB.copyOptions.misc.co_quoted,
							mv_sqrbrkt: BLB.copyOptions.misc.co_sqrbrkt,
							mv_sblabbrev: BLB.copyOptions.misc.co_sblabbrev,
							mv_endash: BLB.copyOptions.misc.co_endash,
							mv_sorted: false
						}
					};
				}
				BLB.registerPickerMenus('mvFormSearchSel');
			} else {
				setTimeout(function() { BLB.mvWidget.init(); }, 100);
			}
		},

		onClickHndlr: function(ev, matchedEl, container) {
			switch(matchedEl.id) {
				// Copy Options begin here
				case 'mv_llvr': case 'mv_llrv': case 'mv_llsl': case 'mv_llvo': case 'mv_llro':
					BLB.mvWidget.mvOptions.order = matchedEl.id;
					Dom.addClass('numDelimWidge', 'numDelimOff');
					Dom.addClass('refDelimWidge', 'numDelimOff');
					Dom.get('mvFormWidge').refFormat.value = BLB.mvWidget.orderS[matchedEl.id];
					Dom.getElementsByClassName('coOrder', 'img', 'mvOptions', function(el) {
						el.src = assetsSource + 'images/svg/contextBar/copyOptions/radioOff.svg';
					}, null, null);
					Dom.getElementsByClassName('numDelim', 'img', 'mvOptions', function(el) {
						el.src = assetsSource + 'images/svg/contextBar/copyOptions/radioOff.svg';
					}, null, null);
					Dom.getElementsByClassName('refDelim', 'img', 'mvOptions', function(el) {
						el.src = assetsSource + 'images/svg/contextBar/copyOptions/radioOff.svg';
					}, null, null);
					Dom.getFirstChild(matchedEl.id).src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
					Dom.getFirstChild('mv_ndnn').src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
					if(BLB.mvWidget.mvOptions.order == 'mv_llro') {
						Dom.removeClass('refDelimWidge', 'numDelimOff');
						Dom.getFirstChild('mv_rdn').src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
					} else if(BLB.mvWidget.mvOptions.order != 'mv_llvo') {
						Dom.removeClass('refDelimWidge', 'numDelimOff');
						Dom.getFirstChild(BLB.mvWidget.mvOptions.refDelim).src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
					}
					break;
				case 'mv_pvr': case 'mv_prv': case 'mv_pro':
					BLB.mvWidget.mvOptions.order = matchedEl.id;
					Dom.removeClass('numDelimWidge', 'numDelimOff');
					Dom.removeClass('refDelimWidge', 'numDelimOff');
					Dom.get('mvFormWidge').refFormat.value = BLB.mvWidget.orderS[matchedEl.id];
					Dom.getElementsByClassName('coOrder', 'img', 'mvOptions', function(el) {
						el.src = assetsSource + 'images/svg/contextBar/copyOptions/radioOff.svg';
					}, null, null);
					Dom.getElementsByClassName('numDelim', 'img', 'mvOptions', function(el) {
						el.src = assetsSource + 'images/svg/contextBar/copyOptions/radioOff.svg';
					}, null, null);
					Dom.getElementsByClassName('refDelim', 'img', 'mvOptions', function(el) {
						el.src = assetsSource + 'images/svg/contextBar/copyOptions/radioOff.svg';
					}, null, null);
					Dom.getFirstChild(matchedEl.id).src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
					if(BLB.mvWidget.mvOptions.order == 'mv_pro') {
						Dom.getFirstChild('mv_rdn').src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
						Dom.getFirstChild('mv_ndnn').src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
						Dom.addClass('numDelimWidge', 'numDelimOff');
					} else {
						Dom.getFirstChild(BLB.mvWidget.mvOptions.refDelim).src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
						Dom.getFirstChild(BLB.mvWidget.mvOptions.numDelim).src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
					}
					break;
				case 'mv_rdn': case 'mv_rds': case 'mv_rdc': case 'mv_rdp':
					BLB.mvWidget.mvOptions.refDelim = matchedEl.id;
					Dom.get('mvFormWidge').refDelim.value = BLB.mvWidget.refDelimS[matchedEl.id];
					Dom.getElementsByClassName('refDelim', 'img', 'mvOptions', function(el) {
						el.src = assetsSource + 'images/svg/contextBar/copyOptions/radioOff.svg';
					}, null, null);
					if(BLB.mvWidget.mvOptions.order == 'mv_llro' || BLB.mvWidget.mvOptions.order == 'mv_pro')
						Dom.getFirstChild('mv_rdn').src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
					else if(BLB.mvWidget.mvOptions.order != 'mv_llvo')
						Dom.getFirstChild(BLB.mvWidget.mvOptions.refDelim).src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
					break;
				case 'mv_ndnn': case 'mv_ndnd': case 'mv_nds': case 'mv_ndc': case 'mv_ndp':
					BLB.mvWidget.mvOptions.numDelim = matchedEl.id;
					Dom.get('mvFormWidge').numDelim.value = BLB.mvWidget.numDelimS[matchedEl.id];
					Dom.getElementsByClassName('numDelim', 'img', 'mvOptions', function(el) {
						el.src = assetsSource + 'images/svg/contextBar/copyOptions/radioOff.svg';
					}, null, null);
					if(BLB.mvWidget.mvOptions.order.search(/^mv_p(vr|rv)/) == 0) Dom.getFirstChild(BLB.mvWidget.mvOptions.numDelim).src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
					else Dom.getFirstChild('mv_ndnn').src = assetsSource + 'images/svg/contextBar/copyOptions/radioOn.svg';
					break;
				case 'mv_sblabbrev':
					if(!BLB.mvWidget.mvOptions.misc['mv_abbrev']) break;
					BLB.mvWidget.mvOptions.misc[matchedEl.id] = !BLB.mvWidget.mvOptions.misc[matchedEl.id];
					Dom.get('mvFormWidge')[matchedEl.id.split(/_/)[1]].value = BLB.mvWidget.oneZero(BLB.mvWidget.mvOptions.misc[matchedEl.id]);
					Dom.getFirstChild(matchedEl.id).src = assetsSource + 'images/svg/contextBar/copyOptions/check'+(BLB.mvWidget.mvOptions.misc[matchedEl.id]?'On':'Off')+'.svg';
					break;
				case 'mv_abbrev':
					if(!BLB.mvWidget.mvOptions.misc[matchedEl.id]) {
						Dom.removeClass('mv_sblabbrev', 'disabled');
						Dom.getFirstChild('mv_sblabbrev').src = assetsSource + 'images/svg/contextBar/copyOptions/check'+(BLB.mvWidget.mvOptions.misc['mv_sblabbrev']?'On':'Off')+'.svg';
					} else {
						Dom.addClass('mv_sblabbrev', 'disabled');
						Dom.getFirstChild('mv_sblabbrev').src = assetsSource + 'images/svg/contextBar/copyOptions/checkDisabled'+(BLB.mvWidget.mvOptions.misc['mv_sblabbrev']?'On':'Off')+'.svg';
					}
				case 'mv_quoted': case 'mv_endash': case 'mv_sqrbrkt': case 'mv_sorted':
					BLB.mvWidget.mvOptions.misc[matchedEl.id] = !BLB.mvWidget.mvOptions.misc[matchedEl.id];
					Dom.get('mvFormWidge')[matchedEl.id.split(/_/)[1]].value = BLB.mvWidget.oneZero(BLB.mvWidget.mvOptions.misc[matchedEl.id]);
					Dom.getFirstChild(matchedEl.id).src = assetsSource + 'images/svg/contextBar/copyOptions/check'+(BLB.mvWidget.mvOptions.misc[matchedEl.id]?'On':'Off')+'.svg';
					break;
				default:
					break;
			};
			switch(container.id) {
				// Display or hide the version select menu on the rtNav MultiVerse search
				case 'mvFormSelectDropU':
					BLB.closePickerMenus('mvFormSearchSel');
					BLB.switchShowState('mvFormSearchSel');
					YEvent.stopPropagation(ev);
					break;
				// Update the search form and display of the selected translation - rtNav MultiVerse search
				case 'mvFormSearchSel':
					var t = matchedEl.innerHTML;
					YEvent.stopPropagation(ev);
					if(t=="&nbsp;") return false;
					BLB.closePickerMenus('bodTag');
					BLB.updateSearchForms(t);
					break;
				default:
					break;
			};
		},

		oneZero: function(trueFalse) {
			return trueFalse?1:0;
		}
	};

	YEvent.onDOMReady(BLB.mvWidget.init, BLB.mvWidget.init, true);

})();
