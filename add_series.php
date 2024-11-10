<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$pw = "";
$dbname = "reviewer";

$conn = new mysqli($servername, $username, $pw, $dbname);

if ($conn->connect_error) {
    die("Connection failed: ". $conn->connect_error);
}
echo "Connected successfully";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $title = isset($_POST['title']) ? $conn->real_escape_string($_POST['title']) : '';
    $release_year = isset($_POST['year']) ? $conn->real_escape_string($_POST['year']) : '';
    $genre = isset($_POST['genre']) ? $conn->real_escape_string($_POST['genre']) : '';
    $directors = isset($_POST['director']) ? $conn->real_escape_string($_POST['director']) : '';
    $actors = isset($_POST['actors']) ? $conn->real_escape_string($_POST['actors']) : '';
    $short_description = isset($_POST['description']) ? $conn->real_escape_string($_POST['description']) : '';
    $thumbnail = isset($_POST['thumbnail']) ? $conn->real_escape_string($_POST['thumbnail']) : '';
    $seasons = isset($_POST['seasons']) ? $conn->real_escape_string($_POST['seasons']) : '';
    
        if (isset($_FILES['thumbnail']) && $_FILES['thumbnail']['error'] == 0) {
            // Validate file type and size 
            $allowed_types = ['image/jpeg', 'image/png', 'image/gif'];
            $max_size = 2 * 1024 * 1024; // 2MB
    
            $file_type = $_FILES['thumbnail']['type'];
            $file_size = $_FILES['thumbnail']['size'];
        
            if (in_array($file_type, $allowed_types) && $file_size <= $max_size) {
            
                $target_dir = "uploads/";
                $file_name = basename($_FILES['thumbnail']['name']);
                $target_file = $target_dir . uniqid() . "_" . $file_name;
    
                // Move the uploaded file to the server directory
                if (move_uploaded_file($_FILES['thumbnail']['tmp_name'], $target_file)) {
                    // Escape and store the file path in the database
                    $thumbnail_path = $conn->real_escape_string($target_file);
   
                $sql = "INSERT INTO series (title, release_year, genre, directors, actors, short_description, thumbnail, seasons) 
                VALUES ('$title', '$release_year', '$genre', '$directors', '$actors', '$short_description', '$thumbnail_path', '$seasons')";

                if ($conn->query($sql) === TRUE) {
                echo "Success";
                //header("Location: film_title_page.html"); //hier müsste zur entsprechenden Serie weitergeleitet werden
                exit;
                } else {
                    echo "Error: " . $sql . "<br>" . $conn->error;
                }
            } else {
                echo "Failed to upload the file.";
            }
        } else {
            echo "Invalid file type or size. Only JPG, PNG, and GIF files under 2MB are allowed.";
        }
    } else {
        echo "No file uploaded or file upload error.";
    }
}

$conn->close();
?>