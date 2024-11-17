<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400..900&family=Outfit:wght@100..900&display=swap"
        rel="stylesheet">

</head>

<body>
    <?php
        session_start();
    ?>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark m-0" id="navbar">
        <a class="reviewer-logo" href="../html/index.html"> Reviewer </a>
            <?php if (isset($_SESSION['username'])): ?>
                <a href="../html/user-page.html">
                    <button class="user-btn" type="button">
                        Hallo, <?php echo $_SESSION['username']; ?>
                    </button>   
                </a>
            <?php else: ?>
                <a href="../html/login.html">
                    <button class="login-btn" type="button">
                        Anmelden
                    </button>
                </a>
    
                <a href="../html/signup.html">
                    <button class="register-btn" type="button">
                        Registrieren
                    </button>
                </a>
            <?php endif; ?>
    </nav>

    <script src="../js/navigationbar.js"></script>
    <script src="../bootstrap-5.3.3-dist/js/bootstrap.bundle.js"></script>
</body>
</html>