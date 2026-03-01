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

function pressKey(number) {
    if (currentPin.length < 4) {
        currentPin += number; 
        updateDots();
        
        document.getElementById("error-message").classList.add("hidden");
        
        if (currentPin.length === 4) {
            setTimeout(verifyPin, 150); 
        }
    }
}

function deleteKey() {
    if (currentPin.length > 0) {
        currentPin = currentPin.slice(0, -1);
        updateDots();
    }
    document.getElementById("error-message").classList.add("hidden");
}

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

function verifyPin() {
    const errorMessage = document.getElementById("error-message");
    const lockScreen = document.getElementById("lock-screen");
    const homeScreen = document.getElementById("home-screen");
    const pinDotsContainer = document.getElementById("pin-dots");

    if (currentPin === "1234") {
        lockScreen.classList.add("slide-up");
        
        setTimeout(function() {
            lockScreen.classList.add("hidden");
            homeScreen.classList.remove("hidden");
            homeScreen.classList.add("fade-in");
            
            currentPin = "";
            updateDots();
        }, 600); 
    } else {
        errorMessage.classList.remove("hidden");
        pinDotsContainer.classList.add("shake");
        
        setTimeout(() => {
            pinDotsContainer.classList.remove("shake");
            currentPin = "";
            updateDots();
        }, 400); 
    }
}

// --- NEW FUNCTION: Locks the phone when you tap the bottom bar ---
function lockPhone() {
    const lockScreen = document.getElementById("lock-screen");
    const homeScreen = document.getElementById("home-screen");
    
    // Hide home screen and remove fade-in animation
    homeScreen.classList.add("hidden");
    homeScreen.classList.remove("fade-in");
    
    // Show lock screen and remove slide-up animation
    lockScreen.classList.remove("hidden");
    lockScreen.classList.remove("slide-up");
    
    // Reset the pin just in case
    currentPin = "";
    updateDots();
}
