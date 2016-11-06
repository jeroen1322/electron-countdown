// Require moment.js
const moment = require('moment');
// Require ipcRender
const {ipcRenderer} = require('electron');
const remote = require('electron').remote;

// Helper function, to format the time
const secondsToTime = (s) => {
    let momentTime = moment.duration(s, 'seconds');
    let sec = momentTime.seconds() < 10 ? ('0' + momentTime.seconds()) : momentTime.seconds();
    let min = momentTime.minutes() < 10 ? ('0' + momentTime.minutes()) : momentTime.minutes();

    return `${min}:${sec}`;
};

function blink(){
  var f = document.getElementById('timerDiv');
  setInterval(function(){
    f.style.display = (f.style.display == 'none' ? '' : 'none');
  }, 1000);
}

// Listen to the 'timer-change' event
ipcRenderer.on('timer-change', (event, t) => {
    // Initialize time with value send with event
    let currentTime = t;

// Print out the time
    timerDiv.innerHTML = secondsToTime(currentTime);

// Execute every second
    let timer = setInterval(() => {

        // Remove one second
        currentTime = currentTime - 1;

        // Print out the time
        timerDiv.innerHTML = secondsToTime(currentTime);

        // When reaching 0. Stop.
        if (currentTime <= 0) {
            clearInterval(timer);
            blink();
        }
    }, 1000); // 1 second
});

document.getElementById("close-btn").addEventListener("click", function (e) {
     var window = remote.getCurrentWindow();
     window.close();
});
