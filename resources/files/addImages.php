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
echo "Connection Successful";

//add movie
$entry = "INSERT INTO images(image)
VALUES('http://localhost/Reviewer/resources/img/movies.jpg')";

if ($conn->query($entry) === TRUE) {
    echo ("Movie was added successfully.");
} else {
    echo ("Movie was not added successfully.");
}
?>