function sendFormToEmail() {
  const form = document.getElementById('registrationForm');
  const formData = new FormData(form);
  const csvData = [];

  formData.forEach((value, key) => {
    csvData.push(`${key}:${value}`);
  });

  const csvString = csvData.join('\n');
  const subject = 'Registration Form Data';
  const body = `Subject: ${subject}\n\n${csvString}`;

  const mailToLink = `mailto:strongbow.mediausa@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;
  
  // Check if the mailto link is valid or if the email client is set up
  if (navigator.userAgent.includes("Mail")) { // Example check, adjust as needed
    window.location.href = mailToLink;
  } else {
    alert('No email client is configured. Please set up an email client to send emails.');
  }
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  if (validateForm()) {
    try {
      sendFormToEmail();
      alert('Email sent successfully!');
      form.reset();
    } catch (error) {
      alert('Error sending email. Please try again.');
    }
  }
});






