// This function turns on the phone and makes it full screen
function powerOn() {
    let elem = document.documentElement;
    
    // Command the browser to enter full screen
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari support */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 support */
        elem.msRequestFullscreen();
    }

    // Hide the black power screen, show the phone UI
    document.getElementById("power-screen").classList.add("hidden");
    document.getElementById("phone-ui").classList.remove("hidden");
    
    // Set the initial real-world time and start the clock loop!
    updateTime();
    setInterval(updateTime, 1000); // Updates the time every second
}

// This function checks the password just like before
function checkPassword() {
    const password = document.getElementById("password-input").value;
    const errorMessage = document.getElementById("error-message");
    const lockScreen = document.getElementById("lock-screen");
    const homeScreen = document.getElementById("home-screen");

    if (password === "1234") {
        lockScreen.classList.add("slide-up");
        errorMessage.classList.add("hidden");

        setTimeout(function() {
            lockScreen.classList.add("hidden");
            homeScreen.classList.remove("hidden");
            homeScreen.classList.add("fade-in");
        }, 600); 
    } else {
        errorMessage.classList.remove("hidden");
    }
}

// This function gets the real time from your device
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    // Add a zero in front of numbers less than 10 (e.g., 9:05 instead of 9:5)
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    
    const timeString = hours + ":" + minutes;
    
    // Put the real time into the HTML
    document.getElementById("status-time").innerText = timeString;
    document.getElementById("lock-time").innerText = timeString;
}
