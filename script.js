// Variable to store the pin as the user types it
let currentPin = "";

function powerOn() {
    let elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { 
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { 
        elem.msRequestFullscreen();
    }

    document.getElementById("power-screen").classList.add("hidden");
    document.getElementById("phone-ui").classList.remove("hidden");
    
    updateTime();
    setInterval(updateTime, 1000); 
}

function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    
    const timeString = hours + ":" + minutes;
    
    document.getElementById("status-time").innerText = timeString;
    document.getElementById("lock-time").innerText = timeString;
}

// --- NEW KEYPAD LOGIC ---

// This function runs every time you tap a number
function pressKey(number) {
    if (currentPin.length < 4) {
        currentPin += number; // Add the number to our pin
        updateDots();
        
        // Hide error message if they start typing again
        document.getElementById("error-message").classList.add("hidden");
        
        // If they have typed 4 numbers, verify it automatically!
        if (currentPin.length === 4) {
            setTimeout(verifyPin, 150); // Small delay so we can see the 4th dot fill up
        }
    }
}

// This function runs when you tap the delete (⌫) button
function deleteKey() {
    if (currentPin.length > 0) {
        // Remove the last number from the pin
        currentPin = currentPin.slice(0, -1);
        updateDots();
    }
    document.getElementById("error-message").classList.add("hidden");
}

// This function changes the empty dots to filled dots
function updateDots() {
    const dots = document.querySelectorAll(".pin-dot");
    dots.forEach((dot, index) => {
        if (index < currentPin.length) {
            dot.classList.add("filled");
        } else {
            dot.classList.remove("filled");
        }
    });
}

// This function checks if the 4-digit pin is correct
function verifyPin() {
    const errorMessage = document.getElementById("error-message");
    const lockScreen = document.getElementById("lock-screen");
    const homeScreen = document.getElementById("home-screen");
    const pinDotsContainer = document.getElementById("pin-dots");

    if (currentPin === "1234") {
        // Success! Unlock the phone
        lockScreen.classList.add("slide-up");
        
        setTimeout(function() {
            lockScreen.classList.add("hidden");
            homeScreen.classList.remove("hidden");
            homeScreen.classList.add("fade-in");
            
            // Reset pin in case we lock the phone later
            currentPin = "";
            updateDots();
        }, 600); 
    } else {
        // Wrong Pin! Trigger the shake animation
        errorMessage.classList.remove("hidden");
        pinDotsContainer.classList.add("shake");
        
        // Remove the shake class after it finishes, and clear the dots
        setTimeout(() => {
            pinDotsContainer.classList.remove("shake");
            currentPin = "";
            updateDots();
        }, 400); // 400ms matches the CSS animation time
    }
}
