document.addEventListener("autoEvent", function(event) {
  var text;
  var lowestScore;
  var highestScore;
  chrome.storage.sync.get({
    tellstring: '교수님 한 학기동안 감사했습니다. 교수님 한 학기동안 감사했습니다. 교수님 한 학기동안 감사했습니다. 교수님 한 학기동안 감사했습니다.',
    lowest: '3',
    highest: '5'
  }, function(items) {
    text = items.tellstring;
    lowestScore = 5 - parseInt(items.lowest);
    highestScore = 5 - parseInt(items.highest);
  });

	console.log('autoEvent listener!');
	document.addEventListener('DOMSubtreeModified', function() {
		console.log('DOMSubtreeModified listener!');
		if(document.body.innerHTML.search('sapWD_Standard_radioButtonChange') != -1) {
			console.log('target frame!');

			var strEl = document.getElementsByTagName('textarea')[0];
			if(strEl.value.trim() == '') {
				strEl.value = text;
				var script = "sapWD_Standard_inputFieldChange(document.getElementsByTagName('textarea')[0]); ";
				location.href = "javascript: " + script + " void 0;";
			}

			var ts = document.getElementsByClassName('urCWhl');
			var is_finish = true;
			var idx;
			for (var i = 0; i < ts.length;) {
				var el = ts[i].getElementsByTagName('input')[0];
				if(el.value == '30000019') {
					var j = i + 2;
					for(var k = i; k < i+4; ++k) {
						var el = ts[k].getElementsByTagName('input')[0];
						if(el.checked) {
							j = k;
							break;
						}
					}
					i = j;
				} else if(el.type == 'checkbox') {
					var cnt = 0;
					var k;
					for(k = i; k < ts.length; ++k) {
						var el = ts[k].getElementsByTagName('input')[0];
						if(el.type != 'checkbox') break;
						if(el.checked) ++cnt;
					}
					if(cnt >= ((k-i)>5?5:(k-i))) {
						i = k;
					} else {
						var el;
						var j;
						do {
							j = i + Math.floor(Math.random() * (k-i));
							el = ts[j].getElementsByTagName('input')[0];
						} while (el.checked);
						i = j;
					}
				} else {
					var n = parseInt(el.value);
					var j = i;
					if(n == NaN || n < 0 || n > 7) {
						j = i;
						n = 0;
					}
					else {
						var tmpMax = (n>lowestScore?lowestScore:n);
						var tmpMin = (n>highestScore?highestScore:n);
						j = i + tmpMin + Math.floor(Math.random() * (tmpMax-tmpMin+1));
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
				if(i >= ts.length) break;
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
				else if(el.type == 'checkbox') ;
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

