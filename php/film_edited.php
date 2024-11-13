<?php
include 'db.php';


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $film_id = $_POST['id'];
    $title = $_POST['title'];
    $director = $_POST['director'];
    $actors = $_POST['actors'];
    $year = $_POST['year'];
    $genre = $_POST['genre'];
    $description = $_POST['description'];

    $stmt = $pdo->prepare("UPDATE movies SET title = ?, directors = ?, actors = ?, release_year = ?, genre = ?, short_description = ? 
    WHERE id = ?");
    $stmt->execute([$title, $director, $actors, $year, $genre, $description, $film_id]);

    echo "Film updated successfully.";
}
?>
