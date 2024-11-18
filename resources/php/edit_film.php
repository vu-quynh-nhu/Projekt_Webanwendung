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
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reviewer</title>    
    <link rel="stylesheet" href="../css/style.css" />  
    <link href="../bootstrap-5.3.3-dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="row justify-content-center">
    <div class="navbar"></div>

        <div class="col-8">
            <div>
                <h1 class="text-center">Film bearbeiten</h1>
            </div>
        </div>
    </div>


    <div class="container d-flex justify-content-center col-5 text-center">
            <form action="film_edited.php?id=<?php echo $film_id; ?>" method="POST" enctype="multipart/form-data">
                <div class="text-center">
                <div class="mb-3">
                    <input type="hidden" name="id" value="<?php echo $film_id; ?>">
                        <div class="mb-3">
                            <label for="title" class="form-label">Titel*</label><br>
                            <input type="text" id="title" name="title" value="<?php echo htmlspecialchars($film['title']); ?>" required>
                        </div>
                        <div class="mb-3">
                            <label for="director" class="form-label">Regisseur:in</label><br>
                            <textarea id="director" rows="4" name="director"><?php echo htmlspecialchars($film['directors']); ?></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="actors" class="form-label">Schauspieler:innen</label><br>
                            <textarea id="actors" rows="4" name="actors"><?php echo htmlspecialchars($film['actors']); ?></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="year" class="form-label">Jahr</label>
                            <select type="year" id="year" name="year" value="<?php echo htmlspecialchars($film['release_year']); ?>">
                                <option value="">--Jahr auswählen--</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="genre" class="form-label">Genre</label>
                            <select type="genre" id="genre" name="genre" value="<?php echo htmlspecialchars($film['genre']); ?>">
                                <option value="">--Genre auswählen--</option>
                            </select>
                        </div>                      
                        <div class="mb-3">
                            <label for="thumbnail" class="form-label">Thumbnail ändern</label><br>
                            <!-- <img src="<?php echo htmlspecialchars($film['thumbnail']); ?>" height="100rem"> -->
                            <input type="file" name="thumbnail" id="thumbnail" accept="image/*">
                            <div id="thumbnail-container" style="display: none;">
                                <img id="thumbnail-preview" src="" alt="Thumbnail Preview" style="max-width: 200px; max-height: 200px;">
                                <button type="button" id="delete-thumbnail" class="btn btn-danger btn-sm">X</button>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Beschreibung</label><br>
                            <textarea id="description" name="description" rows="8">
                                <?php echo htmlspecialchars($film['short_description']); ?>
                            </textarea>
                        </div>
                    </div>
                    <button type="submit" class="btn-create mt-3">Bearbeiten</button>
                </form>
            </div>
   
       
    <script src="../bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js"></script>
    <script src="../js/script.js"></script>
</body>
</html>
