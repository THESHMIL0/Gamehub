function checkPassword() {
    // Get the value typed into the input box
    const password = document.getElementById("password-input").value;
    const errorMessage = document.getElementById("error-message");

    // Check if the password is exactly "1234"
    if (password === "1234") {
        // Hide the lock screen
        document.getElementById("lock-screen").classList.add("hidden");
        
        // Show the home screen
        document.getElementById("home-screen").classList.remove("hidden");
    } else {
        // Show the error message if it's wrong
        errorMessage.classList.remove("hidden");
    }
}
