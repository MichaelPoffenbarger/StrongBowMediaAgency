const form = document.getElementById('registrationForm');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Note: Since you are using Google OAuth only, you may not need this part anymore.
});

function validateForm() {
    // Validation logic here
}

function showError(input, message) {
    // Show error logic here
}

function clearError(input) {
    // Clear error logic here
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
