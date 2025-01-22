

function nextScreen(currentId, nextId) {
    document.getElementById(currentId).classList.add('hidden');
    document.getElementById(nextId).classList.remove('hidden');
}

function previousScreen(currentId, previousId) {
    document.getElementById(currentId).classList.add('hidden');
    document.getElementById(previousId).classList.remove('hidden');
}

function signUpWithFacebook() {
    // Add your Facebook sign-up logic here
    console.log("Signing up with Facebook...");
    // Example: Redirect to Facebook OAuth URL
    window.location.href = "https://www.facebook.com/v2.9/dialog/oauth?client_id=YOUR_APP_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=token";
}

function signUpWithGoogle() {
    // Add your Google sign-up logic here
    console.log("Signing up with Google...");
    // Example: Redirect to Google OAuth URL
    window.location.href = "https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=token&scope=email";
}

document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    fetch('signup.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Account created successfully!');
            // Redirect to dashboard or home page
            window.location.href = 'dashboard.php';
        } else {
            alert(data.message || 'Error creating account. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});