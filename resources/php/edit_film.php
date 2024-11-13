<?php
include 'db.php';

if (isset($_GET['id'])) {
    $film_id = $_GET['id'];

    // Fetch the film details to populate the form fields
    $stmt = $pdo->prepare("SELECT * FROM movies WHERE id = ?");
    $stmt->execute([$film_id]);
    $film = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$film) {
        die("Film not found.");
    }
} else {
    die("No film ID provided.");
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reviewer</title>
    <link rel="stylesheet" href="../css/style.css" /> 
    <link href="../bootstrap-5.3.3-dist/css/bootstrap.min.css" rel="stylesheet"> 
</head>
<body>

    <div class="logo-section">
        <span class="h3 fw-bold mb-0">Logo</span>
    </div>

    <div class="container">
        <h1>Film bearbeiten</h1>

        <div class="form-container">
           
            <form action="film_edited.php?id=<?php echo $film_id; ?>" method="POST" class="form">
              
                    
                    <div class="col-md-6">
                    <input type="hidden" name="id" value="<?php echo $film_id; ?>">
                        <div class="mb-3">
                            <label for="title" class="form-label">Titel</label>
                            <input type="text" class="form-control" id="title" name="title" value="<?php echo htmlspecialchars($film['title']); ?>">
                        </div>
                        <div class="mb-3">
                            <label for="director" class="form-label">Regisseur:in</label>
                            <input type="text" class="form-control" id="director" name="director" value="<?php echo htmlspecialchars($film['directors']); ?>">
                        </div>
                        <div class="mb-3">
                            <label for="actors" class="form-label">Schauspieler:innen</label>
                            <input type="text" class="form-control" id="actors" name="actors" value="<?php echo htmlspecialchars($film['actors']); ?>">
                        </div>
                        <div class="mb-3">
                            <label for="year" class="form-label">Jahr</label>
                            <select type="year" class="form-control" id="year" name="year" value="<?php echo htmlspecialchars($film['release_year']); ?>">
                                <option value="">--Jahr auswählen--</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="genre" class="form-label">Genre</label>
                            <select type="genre" class="form-control" id="genre" name="genre" value="<?php echo htmlspecialchars($film['genre']); ?>">
                                <option value="">--Genre auswählen--</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label">Thumbnail ändern</label>
                            <img src="./uploads/67310a8586523_PXL_20240529_153604134.jpg" height="100rem">
                            <input type="file"  name="thumbnail" id="thumbnail" accept="image/*">
                            <button type="submit">Hochladen</button>
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Beschreibung</label>
                            <textarea class="form-control" id="description" name="description" rows="8"><?php echo htmlspecialchars($film['short_description']); ?></textarea>
                        </div>
                    </div>
                
                <button type="submit" class="btn-create mt-3">Bearbeiten</button>
            </form>
        </div>
    </div>
       
    <script src="../bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js"></script>
    <script src="../js/script.js"></script>
</body>
</html>
