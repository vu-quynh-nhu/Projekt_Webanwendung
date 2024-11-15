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

$movie_id = $_GET["movies_id"]; 

$query = $conn->prepare("SELECT * FROM movies_comments WHERE movies_id = ?");
$query->bind_param("i", $movie_id);
$query->execute();
$result = $query->get_result();
$comments = $result->fetch_all(MYSQLI_ASSOC);

header('Content-Type: application/json');
echo json_encode($comments);
?>