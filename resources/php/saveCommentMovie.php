
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

$movies_id = $_POST['movies_id'];
$movies_name = $_POST['movies_name'];
$commentator_name = $_POST['commentator_name'];
$comment_text = $_POST['comment_text'];
$starrating = $_POST['star'];

$sql = "INSERT INTO movies_comments (movies_name, movies_id, commentator_name, comment_text, starrating) VALUES (?, ?, ?, ?,?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sissi", $movies_name, $movies_id, $commentator_name, $comment_text, $starrating);


if ($stmt->execute()) {
    if (isset($_SERVER['HTTP_REFERER'])) {
        header("Location: " . $_SERVER['HTTP_REFERER']);
    }
    
} else {
    echo "Error";
}

$stmt->close();
?>
