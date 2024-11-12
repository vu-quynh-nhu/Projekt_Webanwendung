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

//select data
$sql = "SELECT * FROM series";
$result = $conn->query($sql);

$series = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $series[] = $row;
    }
} 

header('Content-Type: application/json');
echo json_encode($series);
?>