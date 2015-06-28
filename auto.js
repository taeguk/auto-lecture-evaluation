document.addEventListener("autoEvent", function(event) {
	console.log('autoEvent listener!');
	document.addEventListener('DOMSubtreeModified', function() {
		console.log('DOMSubtreeModified listener!');
		if(document.body.innerHTML.search('sapWD_Standard_radioButtonChange') != -1) {
			console.log('target frame!');

			var strEl = document.getElementsByTagName('textarea')[0];
			if(strEl.value.trim() == '') {
				strEl.value = "교수님 한 학기동안 감사했습니다. 교수님 한 학기동안 감사했습니다. 교수님 한 학기동안 감사했습니다. 교수님 한 학기동안 감사했습니다. ";
				var script = "sapWD_Standard_inputFieldChange(document.getElementsByTagName('textarea')[0]); ";
				location.href = "javascript: " + script + " void 0;";
			}

			var ts = document.getElementsByClassName('urCWhl');
			var is_finish = true;
			var idx;
			var check_box_first = true;
			for (var i = 0; i < ts.length;) {
				var el = ts[i].getElementsByTagName('input')[0];
				if(el.value == '30000019') {
					i += 2;
				} else if(el.type == 'checkbox' && check_box_first) {
					var j = i + Math.floor(Math.random() * 3);
					for(var k = i; k < i+3; ++k) {
						var el = ts[k].getElementsByTagName('input')[0];
						if(el.checked) {
							j = k;
							break;
						}
					}
					i = j;
					check_box_first = false;
				} else {
					var n = parseInt(el.value);
					var j = i + Math.floor(Math.random() * (n>3?3:n));
					if(n == NaN || n < 0 || n > 5) {
						j = i;
						n = 0;
					}
					for(var k = i; k < i+n; ++k) {
						var el = ts[k].getElementsByTagName('input')[0];
						if(el.checked) {
							j = k;
							break;
						}
					}
					i = j;
				}
				el = ts[i].getElementsByTagName('input')[0];
				if(!el.checked) {
					is_finish = false;
					idx = i;
					break;
				}
				if(el.value == '05') i += 5;
				else if(el.value == '04') i += 4;
				else if(el.value == '03') i += 3;
				else if(el.value == '02') i += 2;
				else if(el.value == '01') i += 1;
				else if(el.value == '30000019') i += 4;
				else if(el.value == '30000021') i += 3;
				else if(el.value == '30000026') i += 2;
				else if(el.value == '30000030') i += 1;
				else if(el.type == 'checkbox') i += Math.floor(Math.random() * 3) + 1;
				else i++;
			}
			if(is_finish) {
				console.log('auto finished!');
				this.removeEventListener('DOMSubtreeModified', arguments.callee, false);
			} else {
				console.log('auto - ' + idx);
				var script = "";
				if(el.type == "radio") script = "sapWD_Standard_radioButtonChange(document.getElementsByClassName('urCWhl')["+idx+"], 'click', true); ";
				else if(el.type == "checkbox") script = "sapWD_Standard_checkboxToggle(document.getElementsByClassName('urCWhl')["+idx+"], 'click', true); ";
				location.href = "javascript: " + script + " void 0;";
			}
		}
	});
	var junk = document.createElement('script');
	junk.type = 'text/javascript';
	junk.text = ''
	document.head.appendChild(junk);
});

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	var evt = document.createEvent('Event');
	evt.initEvent('autoEvent', true, false);
	document.dispatchEvent(evt);
});

