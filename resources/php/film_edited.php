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

    $thumbnail_path = NULL;

    //echo "<pre>";
    //print_r($_FILES);
    //echo "</pre>";

    
    if (isset($_FILES['thumbnail']) && $_FILES['thumbnail']['error'] == 0) {
        $thumbnail_path = NULL;
        // Validate file type and size 
        $allowed_types = ['image/jpeg', 'image/png', 'image/gif'];
        $max_size = 2 * 1024 * 1024; // 2MB

        $file_type = $_FILES['thumbnail']['type'];
        $file_size = $_FILES['thumbnail']['size'];
    
        if (in_array($file_type, $allowed_types) && $file_size <= $max_size) {
        
            $target_dir = "../uploads/";
            $file_name = basename($_FILES['thumbnail']['name']);
            $target_file = $target_dir . uniqid() . "_" . $file_name;

            // Move the uploaded file to the server directory
            if (move_uploaded_file($_FILES['thumbnail']['tmp_name'], $target_file)) {
                // Store the file path in the database
                $thumbnail_path = $target_file;
            } else {
                echo "Failed to upload the file.";                
            }
        } else {
            echo "Invalid file type or size. Only JPG, PNG, and GIF files under 2MB are allowed.";            
        }
    }

   // Output the value of $thumbnail_path to debug
    // if (isset($thumbnail_path)) {
    //     echo "Thumbnail Path: " . $thumbnail_path . "<br>";
    // } else {
    //     echo "No thumbnail provided or upload failed.<br>";
    // }

    $sql = "UPDATE movies SET title = ?, directors = ?, actors = ?, release_year = ?, genre = ?, short_description = ?";

    $params = [$title, $director, $actors, $year, $genre, $description];
    if (!is_null($thumbnail_path)) {
        $sql .= ", thumbnail = ?";
        $params[] = $thumbnail_path; 
    }

    $sql .= " WHERE id = ?";
    $params[] = $film_id; 

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    echo "Film updated successfully.";
    //header("Location: film_title_page.html"); // Redirect to corresponding film page
}

?>