<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="../css/navigationbar.css">
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
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar">
        <div class="container-fluid">
            <a class="reviewer-logo" href="../html/index.html"> Reviewer </a>
            <?php if (isset($_SESSION['username'])): ?>
                <span>Hallo, <?php echo $_SESSION['username']; ?></span>
                <form action="logout.php" method="POST">
                    <button class="logout" type="submit">Abmelden</button>
                </form>
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
        </div>
    </nav>

    <script src="../bootstrap-5.3.3-dist/js/bootstrap.bundle.js"></script>
</body>
</html>