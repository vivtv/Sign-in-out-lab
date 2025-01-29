document.addEventListener("DOMContentLoaded", function () {
    const signUpForm = document.getElementById("signUpForm");
    const signInForm = document.getElementById("signInForm");
    const userInfo = document.getElementById("userInfo");
    const signUpContainer = document.getElementById("signUpContainer");
    const signInContainer = document.getElementById("signInContainer");
    const userSpan = document.getElementById("user");
    const signOutButton = document.getElementById("signOut");

    // Switch between Sign In and Sign Up forms
    document.getElementById("switchToSignIn").addEventListener("click", function () {
        signUpContainer.classList.add("hidden");
        signInContainer.classList.remove("hidden");
    });

    document.getElementById("switchToSignUp").addEventListener("click", function () {
        signInContainer.classList.add("hidden");
        signUpContainer.classList.remove("hidden");
    });

    // Sign Up
    signUpForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const newUsername = document.getElementById("newUsername").value;
        const newPassword = document.getElementById("newPassword").value;

        if (localStorage.getItem(newUsername)) {
            alert("Username already exists. Please choose another.");
        } else {
            localStorage.setItem(newUsername, newPassword);
            alert("Account created successfully! Please sign in.");
            signUpContainer.classList.add("hidden");
            signInContainer.classList.remove("hidden");
        }
    });

    // Sign In
    signInForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const storedPassword = localStorage.getItem(username);

        if (storedPassword && storedPassword === password) {
            localStorage.setItem("signedInUser", username);
            showUser(username);
        } else {
            alert("Invalid username or password.");
        }
    });

    // Sign Out
    signOutButton.addEventListener("click", function () {
        localStorage.removeItem("signedInUser");
        hideUser();
    });

    function showUser(username) {
        signUpContainer.classList.add("hidden");
        signInContainer.classList.add("hidden");
        userSpan.textContent = username;
        userInfo.classList.remove("hidden");
    }

    function hideUser() {
        signUpContainer.classList.remove("hidden");
        signInContainer.classList.add("hidden");
        userInfo.classList.add("hidden");
    }

    // Check if user is already signed in
    const storedUser = localStorage.getItem("signedInUser");
    if (storedUser) {
        showUser(storedUser);
    }
});
