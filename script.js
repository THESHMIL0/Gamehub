function checkPassword() {
    const password = document.getElementById("password-input").value;
    const errorMessage = document.getElementById("error-message");
    const lockScreen = document.getElementById("lock-screen");
    const homeScreen = document.getElementById("home-screen");

    if (password === "1234") {
        // 1. Add the slide-up animation to the lock screen
        lockScreen.classList.add("slide-up");
        
        // 2. Hide the error message just in case it was showing
        errorMessage.classList.add("hidden");

        // 3. Wait 600 milliseconds (0.6 seconds) for the animation to finish
        setTimeout(function() {
            // Hide the lock screen completely
            lockScreen.classList.add("hidden");
            
            // Show the home screen and add the fade-in animation
            homeScreen.classList.remove("hidden");
            homeScreen.classList.add("fade-in");
        }, 600); 

    } else {
        // Show error if password is wrong
        errorMessage.classList.remove("hidden");
    }
}
