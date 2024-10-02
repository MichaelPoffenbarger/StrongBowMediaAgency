<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <style>
        body {
            background-color: #000;
            color: #fff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        }
        .navbar {
            background-color: rgba(0, 0, 0, 0.5) !important;
            backdrop-filter: blur(10px);
        }
        .navbar-brand, .nav-link {
            color: #fff !important;
        }
        .hero {
            background: linear-gradient(to bottom right, #000, #111);
            padding: 120px 0;
            overflow: hidden;
            position: relative;
        }
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
            pointer-events: none;
        }
        .btn-primary {
            background: linear-gradient(to right, #764fe0, #9133e9);
            border: none;
            padding: 0.75rem 1.5rem;
            font-size: 1.1rem;
        }
        .btn-primary:hover {
            background: linear-gradient(to right, #764fe0, #9133e9);
        }
        section {
            padding: 80px 0;
        }
        .section-title {
            margin-bottom: 50px;
            font-weight: bold;
            font-size: 2.5rem;
        }
        .text-center {
            --borderWidth: 3px;
            background: #1D1F20;
            position: relative;
            border-radius: var(--borderWidth);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            color: white;
            font-family: 'Raleway';
            font-size: 2.5rem;
        }
        .text-center:after {
            content: '';
            position: absolute;
            top: calc(-1 * var(--borderWidth));
            left: calc(-1 * var(--borderWidth));
            height: calc(100% + var(--borderWidth) * 2);
            width: calc(100% + var(--borderWidth) * 2);
            background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
            border-radius: calc(2 * var(--borderWidth));
            z-index: -1;
            animation: animatedgradient 3s ease alternate infinite;
            background-size: 300% 300%;
        }
        @keyframes animatedgradient {
            0% {
                background-position: 0% 0%;
            }
            50% {
                background-position: 100% 0%;
            }
            100% {
                background-position: 0% 0%;
            }
        }
        .card {
            background-color: #111;
            border: 1px solid #333;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
        }
        .card-title {
            color: #fff;
        }
        .card-subtitle {
            color: #ffffff;
        }
        .list-unstyled {
            color: #ffffff;
        }
        .form-control {
            background-color: #222;
            border-color: #444;
            color: #fff;
        }
        .form-control:focus {
            background-color: #333;
            border-color: #7928CA;
            color: #fff;
            box-shadow: 0 0 0 0.25rem rgba(121, 40, 202, 0.25);
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <a class="navbar-brand" href="#">Brand</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Features</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <section id="login" class="bg-dark">
        <div class="container">
            <h2 class="text-center section-title">Login</h2>
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <div class="card h-100">
                        <div class="card-body text-center">
                            <h3 class="card-title">Enter your credentials</h3>
                            <form action="login.php" method="post">
                                <div class="mb-3">
                                    <input type="email" class="form-control" id="email" name="email" placeholder="Email">
                                </div>
                                <div class="mb-3">
                                    <input type="password" class="form-control" id="password" name="password" placeholder="Password">
                                </div>
                                <button type="submit" class="btn btn-primary">Login</button>
                                <button type="button" class="btn btn-secondary" onclick="googleOAuth()">Login with Google</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script>
        function googleOAuth() {
            // Client ID and API key from the Developer Console
            var clientId = 'YOUR_CLIENT_ID';
            var apiKey = 'YOUR_API_KEY';
            var scopes = 'profile email';
            var authUrl = 'https://accounts.google.com/o/oauth2/auth?' +
                'client_id=' + clientId +
                '&response_type=code&' +
                'redirect_uri=' + window.location.href +
                '&scope=' + encodeURIComponent(scopes) +
                '&state=' + encodeURIComponent('login');
            window.location.href = authUrl;
        }
    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+CkwjNJC9PE0b" crossorigin="anonymous"></script>
</body>
</html>