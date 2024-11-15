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

$series_id = $_POST['series_id'];
$series_name = $_POST['series_name'];
$commentator_name = $_POST['commentator_name'];
$comment_text = $_POST['comment_text'];
$starrating = $_POST['star'];
$date_of_comment = $_POST['date_of_comment'];

$sql = "INSERT INTO series_comments (series_name, series_id, commentator_name, comment_text, starrating, date_of_comment) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sissis", $series_name, $series_id, $commentator_name, $comment_text, $starrating, $date_of_comment);

if ($stmt->execute()) {
    if (isset($_SERVER['HTTP_REFERER'])) {
        header("Location: " . $_SERVER['HTTP_REFERER']);
    }
} else {
    echo "Error";
}

$stmt->close();
?>