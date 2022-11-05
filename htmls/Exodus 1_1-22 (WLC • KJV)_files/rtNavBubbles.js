
(function() {
	BLB.RtNav = {
		timer: 0,
		init: function() {
			if(BLB.blbIsLoaded) {
				BLB.RtNav.bsaTimer = setInterval( function() {
					var bsarocks = Dom.getElementsByClassName('bsap');
					var fc = Dom.getFirstChild(bsarocks[0]);

					if(Dom.getFirstChild(fc) != null) {
						bsarocks[0].parentNode.removeChild(Dom.getPreviousSibling(bsarocks[0]));
						bsarocks[0].parentNode.removeChild(Dom.getPreviousSibling(bsarocks[0]));
						clearInterval(BLB.RtNav.bsaTimer);
					} else {
						BLB.RtNav.timer++;
						if(BLB.RtNav.timer > 100) {
							clearInterval(BLB.RtNav.bsaTimer);
						}
					}
				}, 100);

				YEvent.delegate("bodyCol2", "click", BLB.RtNav.onClickHndlr, "input ~ a[rel^='close.']");
				YEvent.delegate("bodyCol2", "click", BLB.RtNav.onClickHndlr, "div.close");

				BLB.RtNav.DragDrop.init();
			} else {
				setTimeout(function() { BLB.RtNav.init(); }, 100);
			}
		},

		onClickHndlr: function(ev, matchedEl, container) {
			if(container.id == 'bodyCol2') {
				var pDiv = Dom.get('popupDiv');
				var link = '';
				var el = matchedEl;
				var bubbleID = null;

				BLB.closePickerMenus('bodTag');

				if(matchedEl.className == 'close') {	// Close any other widget
					bubbleID = matchedEl.parentNode.parentNode.id.split(/_/)[1];
					BLB.closingBubbleID = bubbleID;
					BLB.yesNoKey.enable();
				}
				document.querySelector('#popupDivContents').innerHTML = BLB.popupDivContents;
				pDiv.classList.remove('hidden');
				Dom.setStyle(pDiv, 'width', '300px');
				BLB.setXY(el, pDiv);
				BLB.confirmPopup(link, bubbleID);
				YEvent.stopPropagation(ev);
			}
		},

		DragDrop: {
			init: function() {
				new YAHOO.util.DDTarget('bodyCol2');
				var rows = Dom.getElementsByClassName('rtBubWidget', 'div', 'bodyCol2');
				rows.shift(); // Drop the first widget, since we don't want it movable  -Dan
				for(var i=0;i<rows.length;i++) {
					var container = new BLB.RtNav.DragDropList(rows[i].id, "", {dragElId:"rtNavBubDDfDiv"});
					container.setHandleElId('rtBubHndl_'+rows[i].id.split(/_/)[1]);
					Dom.getFirstChild(rows[i]).style.cursor='move';
				}
			}
		},


		DragDropList: function(id, sGroup, config) {
			BLB.RtNav.DragDropList.superclass.constructor.call(this, id, sGroup, config);
			var el = this.getDragEl();
			var clickEl = this.getEl();
			Dom.setStyle(el, "opacity", 0.67); // The proxy is slightly transparent

			this.goingUp = false;
			this.lastY = 0;
		}
	};


	YAHOO.extend(BLB.RtNav.DragDropList, YAHOO.util.DDProxy, {
		startDrag: function(x, y) {
			// make the proxy look like the source element
			var proxyEl = this.getDragEl();
			var srcEl = this.getEl();
			this.lastX = Dom.getX(srcEl);

			Dom.setStyle(srcEl, "visibility", "hidden");
			Dom.addClass(proxyEl, srcEl.id);
			proxyEl.innerHTML = srcEl.innerHTML.replace(/id="[^"]+"/, '');	//"
		},

		endDrag: function(e) {
			var srcEl = this.getEl();
			var proxyEl = this.getDragEl();
			var myBLB = new mBLB();
			var rows = Dom.getElementsByClassName('rtBubWidget', 'div', 'bodyCol2');
			var thisOrder = 0;

			rows.shift(); // Drop the first widget, since we don't want it movable  -Dan
			for(var i=0;i<rows.length;i++)
				if(rows[i].id == srcEl.id)
					thisOrder = i+2;

			// Show the proxyEl element and animate it to the location of the src element
			Dom.setStyle(proxyEl, "visibility", "");
			var a = new YAHOO.util.Motion(
					proxyEl, {
						points: {
							to: Dom.getXY(srcEl)
						}
					},
					0.2,
					YAHOO.util.Easing.elasticIn
				);

			myBLB.setCallbackHandler(null);
			myBLB.setErrorHandler(BLB.genericErrorHandler);

			myBLB.setRtNavOrder(srcEl.id.replace(/rtBub_/, ''), thisOrder);

			// Hide the proxyEl and show the source element when finished with the animation
			a.onComplete.subscribe(function() {
				Dom.setStyle(proxyEl, "visibility", "hidden");
				Dom.setStyle(srcEl, "visibility", "");
				Dom.removeClass(proxyEl, srcEl.id);
			});
			a.animate();
		},

		onDragDrop: function(e, id) {
			// If there is one drop interaction, the bubble was dropped either on the column,
			// or it was dropped on the current location of the source element.
			if (DDM.interactionInfo.drop.length === 1) {
				// The position of the cursor at the time of the drop (YAHOO.util.Point)
				var pt = DDM.interactionInfo.point;

				// The region occupied by the source element at the time of the drop
				var region = DDM.interactionInfo.sourceRegion;

				// Check to see if we are over the source element location.  We will
				// append to the bottom of the column once we are sure it was a drop in
				// the negative space (the area of the column without any bubble items)
				if (!region.intersect(pt) && !this.goingUp) {
					var destEl = Dom.get(id);
					var destDD = DDM.getDDById(id);
					destEl.appendChild(this.getEl());
					destDD.isEmpty = false;
					DDM.refreshCache();
				}
			}
		},

		onDrag: function(e) {
			// Keep track of the direction of the drag for use during onDragOver
			var y = YEvent.getPageY(e);
			var dragEl = this.getDragEl();

			if (y < this.lastY) {
				this.goingUp = true;
			} else if (y > this.lastY) {
				this.goingUp = false;
			}
			this.lastY = y;
			Dom.setX(dragEl, this.lastX);
		},

		onDragOver: function(e, id) {
			var srcEl = this.getEl();
			var destEl = Dom.get(id);

			if (destEl.nodeName.toLowerCase() == "div" && Dom.hasClass(destEl, 'rtBubWidget') ) {
				var orig_p = srcEl.parentNode;
				var p = destEl.parentNode;

				if (this.goingUp) {
					p.insertBefore(srcEl, destEl); // insert above
				} else {
					p.insertBefore(srcEl, destEl.nextSibling); // insert below
				}
				DDM.refreshCache();
			}
		}
	});

	YEvent.onDOMReady(BLB.RtNav.init, BLB.RtNav, true);

})();
