// Saves options to chrome.storage
function save_options() {
  var tellstring = document.getElementById('tellstring').value;
  var lowest = document.getElementById('lowest').value;
  var highest = document.getElementById('highest').value;
  chrome.storage.sync.set({
    tellstring: tellstring,
    lowest: lowest,
    highest: highest
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    tellstring: '교수님 한 학기동안 감사했습니다. 교수님 한 학기동안 감사했습니다. 교수님 한 학기동안 감사했습니다. 교수님 한 학기동안 감사했습니다.',
    lowest: '1',
    highest: '5'
  }, function(items) {
    document.getElementById('tellstring').value = items.tellstring;
    document.getElementById('lowest').value = items.lowest;
    document.getElementById('highest').value = items.highest;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
