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

$series_id = $_GET["series_id"]; 

$query = $conn->prepare("SELECT * FROM series_comments WHERE series_id = ?");
$query->bind_param("i", $series_id);
$query->execute();
$result = $query->get_result();
$comments = $result->fetch_all(MYSQLI_ASSOC);

header('Content-Type: application/json');
echo json_encode($comments);
?>