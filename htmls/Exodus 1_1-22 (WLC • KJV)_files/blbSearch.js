
(function() {
	BLB.blbSearch_1001 = {
		csEl: ['csr', 'csrf', 'csrt', 'cscs'],

		init: function() {
			if(BLB.blbIsLoaded) {
				var rtNavBibleSearch = document.querySelector('#rtNavBibleSearch');
				YEvent.delegate("lexAdvOpt", "click", BLB.blbSearch_1001.onClickHndlr, "a");
				YEvent.delegate("showHideLexDiv", "click", BLB.blbSearch_1001.onClickHndlr, "div");
				YEvent.delegate("advOpt", "click", BLB.blbSearch_1001.onClickHndlr, "a");
				YEvent.delegate("advOpt", "change", BLB.blbSearch_1001.onChangeHndlr, "select");
				YEvent.delegate("advOpt", "change", BLB.blbSearch_1001.onChangeHndlr, "input[type=text]");
				YEvent.delegate("advOpt", "keyup", BLB.blbSearch_1001.onChangeHndlr, "input[type=text]");
				YEvent.delegate("advOpt", "blur", BLB.blbSearch_1001.onChangeHndlr, "input[type=text]");
				YEvent.delegate("rtNavSelectDropU", "click", BLB.blbSearch_1001.onClickHndlr, "img");
				YEvent.delegate("rtNavSearchSel", "click", BLB.blbSearch_1001.onClickHndlr, "span");

				document.querySelector('#rtBub_1001_1_other_searches').addEventListener("click", function() {
					document.querySelector('#rtBub_1001_1_other_searches_i').classList.toggle('fa-angle-double-down');
					document.querySelector('#rtBub_1001_1_other_searches_i').classList.toggle('fa-angle-double-up');
					document.querySelector('#rtBub_1001_2').classList.toggle('hidden');
					document.querySelector('#rtBub_1001_3').classList.toggle('hidden');
				});
				if(rtNavBibleSearch.csr.selectedIndex != 0 ||
					rtNavBibleSearch.csrf.selectedIndex != 0 ||
					rtNavBibleSearch.csrt.selectedIndex != 0 ||
					rtNavBibleSearch.cscs.value != '') {
						rtNavBibleSearch.querySelector('#clearOpt').classList.toggle('hidden');
						rtNavBibleSearch.querySelector('#clrAdvOpt').classList.toggle('hidden');
				}
				BLB.registerPickerMenus('rtNavSearchSel');
			} else {
				setTimeout(function() { BLB.blbSearch_1001.init(); }, 100);
			}
		},


		onClickHndlr: function(ev, matchedEl, container) {
			switch(container.id) {
				// Display or hide the version select menu on the rtNav Bible search
				case 'rtNavSelectDropU':
					BLB.closePickerMenus('rtNavSearchSel');
					BLB.switchShowState('rtNavSearchSel');
					document.querySelector('#rtBub_1001_1_other_searches_i').classList.remove('fa-angle-double-down');
					document.querySelector('#rtBub_1001_1_other_searches_i').classList.add('fa-angle-double-up');
					document.querySelector('#rtBub_1001_2').classList.remove('hidden');
					document.querySelector('#rtBub_1001_3').classList.remove('hidden');
					YEvent.stopPropagation(ev);
					break;
				// Update the search form and display of the selected translation - _rtNav
				case 'rtNavSearchSel':
					var t = matchedEl.innerHTML;
					YEvent.stopPropagation(ev);
					if(t=="&nbsp;") return false;
					BLB.switchShowState('rtNavSearchSel');
					BLB.updateSearchForms(t);
					break;
				case 'showHideLexDiv':
					Dom.getFirstChild(matchedEl).checked = true;
					break;
				default:
					break;
			};

			switch(matchedEl.id) {
				case 'shLexAdvOpt':
					BLB.switchShowState('showHideLexDiv');
					BLB.closePickerMenus('showHideLexDiv');
					YEvent.stopPropagation(ev);
					break;
				case 'shAdvOpt':
					var rtNavBibleSearch = document.querySelector('#rtNavBibleSearch');
					BLB.closePickerMenus('showHideDiv');
					BLB.switchShowState('showHideDiv');
					if(rtNavBibleSearch.csr.selectedIndex != 0 ||
						rtNavBibleSearch.csrf.selectedIndex != 0 ||
						rtNavBibleSearch.csrt.selectedIndex != 0 ||
						rtNavBibleSearch.cscs.value != '') {
							document.querySelector('#clrAdvOpt').classList.toggle('hidden');
					} else {
						document.querySelector('#clrAdvOpt').classList.add('hidden');
					}
					YEvent.stopPropagation(ev);
					break;
				case 'clearAnchor':
					document.querySelector('#clearOpt').classList.add('hidden');
					document.querySelector('#clrAdvOpt').classList.add('hidden');
					BLB.blbSearch_1001.clearForm();
					YEvent.stopPropagation(ev);
					break;
				default:
			};
		},


		onChangeHndlr: function(ev, matchedEl, container) {
			var selectedIndex = 0;
			var cscsValue = '';
			var rtNavBibleSearch = document.querySelector('#rtNavBibleSearch');

			switch(matchedEl.name) {
				case 'csr':
					var selectedIndex = matchedEl.selectedIndex;
					BLB.blbSearch_1001.clearForm();
					matchedEl.selectedIndex = selectedIndex;
					if(matchedEl.value == '00') matchedEl.selectedIndex = 0;
					break;
				case 'csrf':
					matchedEl.form.cscs.value = '';
					matchedEl.form.csr.selectedIndex = 0;
					// If csrt (the other) is zero, make it follow csrf (us)
					matchedEl.form.csrt.selectedIndex=(matchedEl.form.csrt.selectedIndex==0?matchedEl.form.csrf.selectedIndex:matchedEl.form.csrt.selectedIndex);
					// If csrf (us) went zero, make csrt (them) zero
					matchedEl.form.csrt.selectedIndex=(matchedEl.form.csrf.selectedIndex==0?0:matchedEl.form.csrt.selectedIndex);
					if(matchedEl.form.csrt.selectedIndex < matchedEl.form.csrf.selectedIndex) {
						var t2i = matchedEl.form.csrt.selectedIndex;
						matchedEl.form.csrt.selectedIndex = matchedEl.form.csrf.selectedIndex;
						matchedEl.form.csrf.selectedIndex = t2i;
					}
					break;
				case 'csrt':
					matchedEl.form.cscs.value = '';
					matchedEl.form.csr.selectedIndex = 0;
					// If csrf (the other) is zero, make it follow csrt (us)
					matchedEl.form.csrf.selectedIndex=(matchedEl.form.csrf.selectedIndex==0?matchedEl.form.csrt.selectedIndex:matchedEl.form.csrf.selectedIndex);
					// If csrt (us) went zero, make csrf (them) zero
					matchedEl.form.csrf.selectedIndex=(matchedEl.form.csrt.selectedIndex==0?0:matchedEl.form.csrf.selectedIndex);
					if(matchedEl.form.csrt.selectedIndex < matchedEl.form.csrf.selectedIndex) {
						var t2i = matchedEl.form.csrt.selectedIndex;
						matchedEl.form.csrt.selectedIndex = matchedEl.form.csrf.selectedIndex;
						matchedEl.form.csrf.selectedIndex = t2i;
					}
					break;
				case 'cscs':
					var cscsValue = matchedEl.value;
					BLB.blbSearch_1001.clearForm();
					matchedEl.value = cscsValue;
					break;
				default:
					break;
			};
			if(rtNavBibleSearch.csr.selectedIndex != 0 ||
				rtNavBibleSearch.csrf.selectedIndex != 0 ||
				rtNavBibleSearch.csrt.selectedIndex != 0 ||
				rtNavBibleSearch.cscs.value != '') {
					document.querySelector('#clearOpt').classList.remove('hidden');
			} else {
				document.querySelector('#clearOpt').classList.add('hidden');
			}
		},

		clearForm: function() {
			rtNavBibleSearch = document.querySelector('#rtNavBibleSearch');
			rtNavBibleSearch.csr.selectedIndex = 0;
			rtNavBibleSearch.csrf.selectedIndex = 0;
			rtNavBibleSearch.csrt.selectedIndex = 0;
			rtNavBibleSearch.cscs.value = '';
		}

	};

	YEvent.onDOMReady(BLB.blbSearch_1001.init, BLB.blbSearch_1001.init, true);

})();
