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

$sql = "SELECT * FROM images";
$result = $conn->query($sql);

$images = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $images[] = $row;
    }
} 

header('Content-Type: application/json');
echo json_encode($images);
?>