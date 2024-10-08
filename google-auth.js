function onGoogleSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    alert('Google sign-in successful!'); // Handle successful sign-in
}

function onFailure(error) {
    console.error(error);
    alert('Google sign-in failed!'); // Handle sign-in failure
}

document.getElementById('googleSignInBtn').addEventListener('click', function() {
    gapi.load('auth2', function() {
        const auth2 = gapi.auth2.init({
            client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com', // Replace with your client ID
        });
        auth2.signIn().then(onGoogleSignIn).catch(onFailure);
    });
});
