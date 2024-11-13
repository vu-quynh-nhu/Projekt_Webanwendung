<!DOCTYPE html>
<html lang="de">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Filmbewertungsportal">
  <link rel="stylesheet" href="../css/style.css" />
  <link href="../bootstrap-5.3.3-dist/css/bootstrap.min.css" rel="stylesheet">
  <title>Reviewer</title>
</head>

<body class="film-title">

  <?php
  session_start();
  ?>

  <section class="vh-100">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="box">
            <div class="logo-section">
              <a class="h3 fw-bold mb-0 reviewer-logo" href="index.html"> Reviewer </a>
            </div>
          </div>
        </div>
        <div class="col">
          <div>
            <h1 class="text-center">Filme</h1>
          </div>
        </div>
        <div class="col">
          <div class="align-links d-flex">
            <?php if (isset($_SESSION['username'])): ?>
              <!-- If user is logged in, show "Hello, username" and the "Sign out" button -->
              <span>Hallo, <?php echo $_SESSION['username']; ?></span>
              <form action="logout.php" method="POST" class="nav-form">
                <button class="btn btn-danger" type="submit">Abmelden</button>
              </form>
            <?php else: ?>
              <!-- If user is not logged in, show "Anmelden" and "Registrieren" buttons -->
              <a class="nav-link" href="../html/login.html">Anmelden</a>
              <a class="nav-link" href="../html/signup.html">Registrieren</a>
            <?php endif; ?>
          </div>
        </div>
      </div>
    </div>

    <div class="category">
      <!-- Genres -->
      <div class="genre-box">
        <img src="../img/abenteuer.jpg" alt="Abenteuer">
        <a href=".">Abenteuer</a>
      </div>
      <div class="genre-box">
        <img src="../img/action.jpg" alt="Action">
        <a href=".">Action</a>
      </div>
      <div class="genre-box">
        <img src="../img/animation.jpg" alt="Animation">
        <a href=".">Animation</a>
      </div>
      <div class="genre-box">
        <img src="../img/doku.jpg" alt="Doku">
        <a href=".">Doku</a>
      </div>
      <div class="genre-box">
        <img src="../img/drama.jpg" alt="Drama">
        <a href=".">Drama</a>
      </div>
      <div class="genre-box">
        <img src="../img/fantasy.jpg" alt="Fantasy">
        <a href=".">Fantasy</a>
      </div>
      <div class="genre-box">
        <img src="../img/historical.jpg" alt="Erotik">
        <a href=".">History</a>
      </div>
      <div class="genre-box">
        <img src="../img/horror.jpg" alt="Horror">
        <a href=".">Horror</a>
      </div>
      <div class="genre-box">
        <img src="../img/kinder.jpg" alt="Kinder">
        <a href=".">Kinder</a>
      </div>
      <div class="genre-box">
        <img src="../img/komoedie.jpg" alt="Komödie">
        <a href=".">Komödie</a>
      </div>
      <div class="genre-box">
        <img src="../img/krimi.jpg" alt="Krimi">
        <a href=".">Krimi</a>
      </div>
      <div class="genre-box">
        <img src="../img/musik.jpg" alt="Musik">
        <a href=".">Musik</a>
      </div>
      <div class="genre-box">
        <img src="../img/romantik.jpg" alt="Romantik">
        <a href=".">Romantik</a>
      </div>
      <div class="genre-box">
        <img src="../img/scifi.jpg" alt="Science-Fiction">
        <a href=".">Science-Fiction</a>
      </div>
      <div class="genre-box">
        <img src="../img/thriller.jpg" alt="Thriller">
        <a href=".">Thriller</a>
      </div>
      <div class="genre-box">
        <img src="../img/western.jpg" alt="Western">
        <a href=".">Western</a>
      </div>
    </div>

  </section>
  <script src="../bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js"></script>
</body>