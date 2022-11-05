(function() {
	BLB.iGreek = {
		init: function() {
			BLB.registerPickerMenus('iGreekLegend');
			YEvent.delegate("refContent", "click", function(event, matchedEl, container) {
				BLB.closePickerMenus('stickyDiv');
				var flexBreak = matchedEl.closest('div.word-block-container');
				var stickyDiv = document.querySelector('#stickyDiv');
				var bibleID = flexBreak.dataset.bibleId;
				var table = flexBreak.dataset.translation;
				var wordBlock =  matchedEl.closest('div.word-block');
				var languageID = wordBlock.dataset.languageId;
				var link = 'lexicon.greekInflection';

				if(container.classList.contains('hebrew')) {
					link = 'lexicon.hebrewInflection';
				}

				if(languageID == undefined || languageID == '') return false;
				var param = {action:"rowid",Translation:Translation,Table:table,bibleID:bibleID,rowid:languageID};

				YEvent.stopPropagation(event);

				document.querySelector('#stickyDivContents').innerHTML = BLB.stickyDivContents;
				stickyDiv.classList.remove('hidden');
				BLB.setXY(matchedEl, stickyDiv);

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
					YEvent.removeDelegate("stickyDivContents", "click");
					YEvent.delegate("stickyDivContents", "click", BLB.rmacHpcDefinitionHandler, "span.definitions");
				});

				Dom.addClass(matchedEl, 'wordGlow_on');
			}, 'div.word-block-container>div.word-block div.interlinear-parse-code');


			YEvent.delegate("refContent", "mouseover", function(event, matchedEl, container) {
				var wordBlockContainer = matchedEl.closest('div.word-block-container');
				var targetLanguageID = matchedEl.dataset.relatedLanguageId;
				var language = 'greek';

				var leftClass = 'word-link-left';
				var rightClass = 'word-link-right';
				if(matchedEl.closest('.hebrew-rtl')) {
					var rightClass = 'word-link-left';
					var leftClass = 'word-link-right';
				}

				if(matchedEl.closest('div.word-block-container[data-translation="wlc"]')) language = 'hebrew';
				if(matchedEl.querySelector('div.interlinear-parse-code')) BLB.positionParseHover(matchedEl, matchedEl.querySelector('div.interlinear-parse-code'), language);

				if(targetLanguageID == undefined || targetLanguageID == '') targetLanguageID = matchedEl.dataset.languageId;
				if(targetLanguageID == undefined || targetLanguageID == '') return false;
				var matches = wordBlockContainer.querySelectorAll('div.word-block[data-language-id="'+targetLanguageID+'"], div.word-block[data-related-language-id="'+targetLanguageID+'"]');
				if(matches.length == 1) return matchedEl.classList.add('word-link');

				matches.forEach(function(mItem, mIndex) {
					mItem.classList.add('word-link');
					if(mIndex == matches.length-1) {
						mItem.classList.add(leftClass);
						mItem.dataset.pos2color = matches.item(mIndex-1).dataset.poscolor;
					} else if(mIndex == 0) {
						mItem.classList.add(rightClass);
						mItem.dataset.pos2color = matches.item(mIndex+1).dataset.poscolor;
					} else {
						mItem.classList.add(leftClass);
						mItem.classList.add(rightClass);
						mItem.dataset.pos2color = matches.item(mIndex-1).dataset.poscolor;
					}
				});

			}, 'div.word-block');

			YEvent.delegate("refContent", "mouseout", function(event, matchedEl, container) {
				var wordBlockContainer = matchedEl.closest('div.word-block-container');
				var targetLanguageID = matchedEl.dataset.relatedLanguageId;

				document.querySelector('#inlineParseInfoPopup').classList.add('hidden');
				if(targetLanguageID == undefined || targetLanguageID == '') targetLanguageID = matchedEl.dataset.languageId;
				if(targetLanguageID == undefined || targetLanguageID == '') return false;
				var matches = wordBlockContainer.querySelectorAll('div.word-block[data-language-id="'+targetLanguageID+'"], div.word-block[data-related-language-id="'+targetLanguageID+'"]');

				matches.forEach(function(item) {
					item.removeAttribute('data-pos2color');
					item.classList.remove('word-link');
					item.classList.remove('word-link-left');
					item.classList.remove('word-link-right');
				});

			}, 'div.word-block');

			document.querySelector('label.custom-select').addEventListener('mousedown', function(ev) {
				var selector = this;
				if(window.innerWidth >= 420) {	// override look for non mobile
					ev.preventDefault();

					const select = selector.querySelector('select.interlinear-select');
					const dropDownDiv = document.createElement('div');
					const dropDown = document.createElement('ul');

					dropDownDiv.classList.add('dropdown-container');
					dropDown.classList.add('dropdown-list');
					selector.appendChild(dropDownDiv);
					dropDownDiv.appendChild(dropDown);

					[...select.children].forEach(function(option) {
						const dropDownOption = document.createElement('li');
						dropDownOption.textContent = option.textContent;

						dropDownOption.addEventListener('mousedown', function(ev) {
							ev.stopPropagation();
							select.value = option.value;
							selector.value = option.value;
							selector.onchange();
							dropDownDiv.remove();
						});

						dropDown.appendChild(dropDownOption);   
					});

					// handle click out
					document.addEventListener('click', function(ev) {
						if(!selector.contains(ev.target)) {
							dropDownDiv.remove();
						}
					});
				}
			});

			document.querySelector('div.legend-container').addEventListener("click", function(ev) { YEvent.stopPropagation(ev); })
			YEvent.delegate(document.querySelector('div.legend-container'), 'click', function(event, matchedEl, container) {
				var toggleType = matchedEl.dataset.toggle;
				var myBLB = new mBLB();

				YEvent.stopPropagation(event);
				myBLB.setHTTPMethod('POST');
				myBLB.setAsyncMode();
				myBLB.setGreekTool(toggleType.replace(/-/g, ''));

				matchedEl.classList.toggle('checked');
				if(toggleType === 'interlinear-parse-code-color')
					document.querySelector('div#refContent').classList.toggle('parse-color-active');
				else
					document.querySelectorAll('div.scripture-block>div.word-block-container>div.word-block>div.'+toggleType).forEach(function(item) {
						item.classList.toggle('hidden');
					});
			}, 'div.toggle-row')
		},

		toggleDirection: function(that) {
			var pathName = document.location.pathname;

			document.querySelector('span.checkmark.checked').classList.remove('checked');
			that.querySelector('span.checkmark').classList.add('checked');
			if(pathName.search('/tools/interlinear-rev/') == 0) pathName = pathName.replace('/tools/interlinear-rev/', '/tools/interlinear/');
			else pathName = pathName.replace('/tools/interlinear/', '/tools/interlinear-rev/');
			document.location.pathname = pathName;
		},

		toggleNextSibling: function(that) {
			BLB.closePickerMenus('iGreekLegend');
			YEvent.stopPropagation(event);
			that.nextElementSibling.classList.toggle('hidden');
		},

		formSubmitHandler: function(formObject) {
			var refTrans = formObject.refTrans.value;
			var refInput = formObject.refInput.value;

			if(refTrans == 'TR' || refTrans == 'MGNT' || refTrans == 'WLC') {
				var blob = BLB.iGreek.validateReference(refInput);
				if(!blob.empty && blob.fromChapter == blob.toChapter) {
					var pathName = '/tools/interlinear/';
					var link = '';
					if(document.location.pathname.search('/tools/interlinear-rev/') == 0) pathName = '/tools/interlinear-rev/';
					if(blob.fromVerse == blob.toVerse)
						link = pathName + refTrans.toLowerCase() + '/' + blob.shortName.toLowerCase() + '/' + blob.fromChapter + '/' + blob.fromVerse + '/';
					else
						link = pathName + refTrans.toLowerCase() + '/' + blob.shortName.toLowerCase() + '/' + blob.fromChapter + '/' + blob.fromVerse + '-' + blob.toVerse + '/';

					if(link != document.location.pathname) document.location.href = link;
				}
			}

			return false;
		},

		// This needs to make its way into blb.js
		validateReference: function(refText) {
			var refElements = {};
			refElements.empty = true;
			refElements.altered = true;

			try {
				var refRegPat = new RegExp(/((?:[123i]+ ?)?[a-z]+)(?:[ .]+)?(.*)?/, 'i');
				refText = refText.replace(/^(?:3(?:(?:rd|\sde)\s)?|third\s)\s*/i, '3').replace(/^(?:2(?:(?:nd|\sde)\s)?|second\s)/i, '2').replace(/^(?:1(?:(?:st|\sde)\s)?|first\s)\s*/i, '1');
				var myRegResults = refRegPat.exec(refText);
				var shortName = myRegResults[1];
				var chapterVerse = myRegResults[2];

				shortName = shortName.replace(/^iii/i, '3').replace(/^ii/i, '2').replace(/^i([^s])/i, '1$1').replace(/^isam/i, '1sam').replace(/([123])\s*/, '$1').replace(/\./, '');
				chapterVerse = chapterVerse.replace(/(\d)\.(\d)/g, '$1:$2').replace(/(-|--|\u2013|\u2014)/, '-');
				if(!(shortName.toLowerCase() in BLB.BookNames)) return refElements;

				refElements.refShortName = shortName;
				refElements.shortName = BLB.BookNames[shortName.toLowerCase()];
				refElements.longName = BLB.BookLongName[refElements.shortName];
				var chaps = BLB.BookNumbers[refElements.shortName].split(/,/);

				//	Process the well-formed scripture reference, checking for chapter or verse spans
				//	Keeping a look out for one chapter books
				if(shortName != '' && chapterVerse == '') {
					var chapters = BLB.BookNumbers[refElements.shortName].split(/,/);
			        refElements.fromChapter = 1;
			        refElements.toChapter = chapters.length;
			        refElements.fromVerse = 1;
			        refElements.toVerse = chapters[refElements.toChapter-1];
			        refElements.empty = false;
			        refElements.altered = false;
					refElements.fromBibleID = (BLB.BookChapters[refElements.shortName] + refElements.fromChapter)*1000 + refElements.fromVerse;
					refElements.toBibleID = (BLB.BookChapters[refElements.shortName] + refElements.toChapter)*1000 + refElements.toVerse;
					return refElements;
				}

				// Some kind of span
				if(chapterVerse.search(/-/) >= 0) {
					var leftSide = chapterVerse.split(/-/)[0];
					var rightSide = chapterVerse.split(/-/)[1];
					if(leftSide.search(/:/) >= 0 && rightSide.search(/:/) >= 0) {			// Definitely a chapter span
						refElements.fromChapter = BLB.parseInt(leftSide.split(/:/)[0], 10);
						refElements.fromVerse = BLB.parseInt(leftSide.split(/:/)[1], 10);
						refElements.toChapter = BLB.parseInt(rightSide.split(/:/)[0], 10);
						refElements.toVerse = BLB.parseInt(rightSide.split(/:/)[1], 10);
					} else if(leftSide.search(/:/) >= 0 && rightSide.search(/:/) < 0) {		// Definitely a verse span
						refElements.fromChapter = BLB.parseInt(leftSide.split(/:/)[0], 10);
						refElements.fromVerse = BLB.parseInt(leftSide.split(/:/)[1], 10);
						refElements.toChapter = refElements.fromChapter;
						refElements.toVerse = BLB.parseInt(rightSide, 10);
					} else if(refElements.shortName.search(/(Jde|Oba|Phm|2Jo|3Jo)/) >= 0 && leftSide.search(/:/) < 0 && rightSide.search(/:/) < 0) {	// Definitely a verse span
						refElements.fromChapter = 1;
						refElements.fromVerse = BLB.parseInt(leftSide, 10);
						refElements.toChapter = 1;
						refElements.toVerse = BLB.parseInt(rightSide, 10);
					} else if(leftSide.search(/:/) < 0 && rightSide.search(/:/) < 0) {		// Definitely a chapter span
						refElements.fromChapter = BLB.parseInt(leftSide, 10);
						refElements.fromVerse = 1;
						refElements.toChapter = BLB.parseInt(rightSide, 10);
						try {
							refElements.toVerse = BLB.parseInt(chaps[refElements.toChapter-1], 10);
						} catch(e) {
							refElements.toVerse = 999;
							refElements.empty = false;
							refElements = BLB.boundsChecker(refElements);
							return refElements;
						}
					} else if(leftSide.search(/:/) < 0 && rightSide.search(/:/) >= 0) {		// Definitely a chapter span - Chapter to chapter:verse
						refElements.fromChapter = BLB.parseInt(leftSide, 10);
						refElements.fromVerse = 1;
						refElements.toChapter = BLB.parseInt(rightSide.split(/:/)[0], 10);
						refElements.toVerse = BLB.parseInt(rightSide.split(/:/)[1], 10);
					}
				// Chapter:Verse
				} else if(chapterVerse.search(/:/) >= 0) {
					refElements.fromChapter = BLB.parseInt(chapterVerse.split(/:/)[0], 10);
					refElements.fromVerse = BLB.parseInt(chapterVerse.split(/:/)[1], 10);
					refElements.toChapter = refElements.fromChapter;
					refElements.toVerse = refElements.fromVerse;
					if(refElements.fromChapter == 0) {
						refElements.fromChapter = 1;
						refElements.fromVerse = 1;
						refElements.toChapter = chaps.length;
						refElements.toVerse = BLB.parseInt(chaps.length[refElements.toChapter-1], 10);
					} else if(refElements.fromVerse == 0) {
						refElements.fromVerse = 1;
						refElements.toVerse = BLB.parseInt(chaps.length[refElements.toChapter-1], 10);
					}
				// One chapter books
				} else if(refElements.shortName.search(/(Jde|Oba|Phm|2Jo|3Jo)/) >= 0) {
					refElements.fromChapter = 1;
					refElements.fromVerse = BLB.parseInt(chapterVerse, 10);
					refElements.toChapter = 1;
					if(refElements.fromVerse > 1) refElements.toVerse = refElements.fromVerse;
					else refElements.toVerse = BLB.parseInt(BookNumbers[refElements.shortName], 10);
				// Chapter only
				} else if(BLB.parseInt(chapterVerse, 10) > 0) {
					refElements.fromChapter = BLB.parseInt(chapterVerse, 10);
					refElements.fromVerse = 1;
					refElements.toChapter = refElements.fromChapter;
						try {
							refElements.toVerse = BLB.parseInt(chaps[refElements.toChapter-1], 10);
						} catch(e) { 
							refElements.toVerse = 999;
							refElements = BLB.boundsChecker(refElements);
							refElements.empty = false;
							return refElements;
						}
				} else return;
			} catch(e) {
				return refElements;
			}

			refElements = BLB.boundsChecker(refElements);
			refElements.empty = false;
			
			return refElements;
		}
	};
	YEvent.onDOMReady(BLB.iGreek.init, BLB.iGreek, true);
})();
