<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "reviewer";

//connection to database
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection Failed: " . $conn->connect_error);
}

$movies_id = $_POST['movie_id'];
$movies_name = $_POST['movie_name'];
$commentator_name = $_POST['commentator_name'];
$comment_text = $_POST['comment_text'];
$starrating = $_POST['star'];
$date_of_comment = $_POST['date_of_comment'];

$sql = "INSERT INTO movies_comments (movies_name, movies_id, commentator_name, comment_text, starrating, date_of_comment) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sissis", $movies_name, $movies_id, $commentator_name, $comment_text, $starrating, $date_of_comment);

if ($stmt->execute()) {
    if (isset($_SERVER['HTTP_REFERER'])) {
        header("Location: " . $_SERVER['HTTP_REFERER']);
    }
} else {
    echo "Error";
}

$stmt->close();
?>