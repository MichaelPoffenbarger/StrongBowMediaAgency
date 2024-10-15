<?php
// register1.php

// Database connection parameters
$host = 'your_host'; // e.g., localhost
$dbname = 'your_database'; // your database name
$user = 'your_username'; // your database username
$password = 'your_password'; // your database password

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        // Create a new PDO instance
        $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Prepare and bind parameters
        $stmt = $pdo->prepare("INSERT INTO users (first_name, last_name, email, username, password, birthdate, country) VALUES (:firstName, :lastName, :email, :username, :password, :birthdate, :country)");

        // Hash the password for security
        $hashedPassword = password_hash($_POST['password'], PASSWORD_DEFAULT);

        // Bind values
        $stmt->bindParam(':firstName', $_POST['firstName']);
        $stmt->bindParam(':lastName', $_POST['lastName']);
        $stmt->bindParam(':email', $_POST['email']);
        $stmt->bindParam(':username', $_POST['username']);
        $stmt->bindParam(':password', $hashedPassword);
        $stmt->bindParam(':birthdate', $_POST['birthdate']);
        $stmt->bindParam(':country', $_POST['country']);

        // Execute the statement
        $stmt->execute();

        echo "User registered successfully!";
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }

    // Close the connection
    $pdo = null;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Strongbow Media</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        body {
            background-color: #1a1a1a;
            color: #fff;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        .section-title {
            color: #fff;
            font-size: 2.5rem;
            font-weight: bold;
        }
        .card {
            background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
            border: none;
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
        }
        .card-title {
            color: #7928CA;
        }
        .form-label {
            color: #a0a0a0;
        }
        .form-control, .form-select {
            background-color: #3a3a3a;
            border: none;
            color: #fff;
        }
        .form-control:focus, .form-select:focus {
            background-color: #3a3a3a;
            color: #fff;
            box-shadow: 0 0 0 0.25rem rgba(121, 40, 202, 0.25);
        }
        .input-group-text {
            background-color: #3a3a3a;
            border: none;
        }
        .btn-primary {
            background: linear-gradient(to right, #7928CA, #FF0080);
            border: none;
            padding: 0.75rem 1.5rem;
            font-size: 1.1rem;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 20px rgba(255, 0, 128, 0.4);
        }
        .social-icon {
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            border: 1px solid #fff;
            transition: all 0.3s ease;
        }
        .social-icon:hover {
            background-color: #fff;
            color: #1a1a1a;
        }
    </style>
</head>
<body>
    <section id="register" class="py-5" style="background: linear-gradient(135deg, #1a1a1a, #2a2a2a);">
        <div class="container">
            <h2 class="text-center section-title mb-5">Join Our Community</h2>
            <div class="row justify-content-center">
                <div class="col-lg-8 mb-4">
                    <div class="card">
                        <div class="card-body p-4">
                            <h3 class="card-title mb-4">Create Your Account</h3>
                            <form id="registrationForm" action="register.php" method="post">
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label for="firstName" class="form-label">First Name</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-user text-primary"></i></span>
                                            <input type="text" class="form-control" id="firstName" name="firstName" required placeholder="John">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="lastName" class="form-label">Last Name</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-user text-primary"></i></span>
                                            <input type="text" class="form-control" id="lastName" name="lastName" required placeholder="Doe">
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email Address</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-envelope text-primary"></i></span>
                                        <input type="email" class="form-control" id="email" name="email" required placeholder="john@example.com">
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="username" class="form-label">Username</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-user-circle text-primary"></i></span>
                                        <input type="text" class="form-control" id="username" name="username" required placeholder="johndoe123">
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-lock text-primary"></i></span>
                                        <input type="password" class="form-control" id="password" name="password" required placeholder="Enter your password">
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="confirmPassword" class="form-label">Confirm Password</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-lock text-primary"></i></span>
                                        <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" required placeholder="Confirm your password">
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="birthdate" class="form-label">Date of Birth</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-calendar-alt text-primary"></i></span>
                                        <input type="date" class="form-control" id="birthdate" name="birthdate" required>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="country" class="form-label">Country</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-globe text-primary"></i></span>
                                        <select class="form-select" id="country" name="country" required>
                                            <option value="">Select your country</option>
                                            <option value="us">United States</option>
                                            <option value="ca">Canada</option>
                                            <option value="uk">United Kingdom</option>
                                            <option value="au">Australia</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="terms" required>
                                    <label class="form-check-label" for="terms" style="color: #a0a0a0;">I agree to the <a href="#" style="color: #7928CA;">Terms of Service</a> and <a href="#" style="color: #7928CA;">Privacy Policy</a></label>
                                </div>
                                <button type="submit" class="btn btn-primary w-100">
                                    <i class="fas fa-user-plus me-2"></i>Create Account
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
