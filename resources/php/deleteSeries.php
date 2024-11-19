<?php
header("Content-Type: application/json");
$header_id = json_decode(file_get_contents("php://input"), true);

if (isset($header_id["id"])) {
    $targeted_series_id = intval($header_id["id"]);

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "reviewer";

    //connection to database
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection Failed: " . $conn->connect_error);
    }

    //remove movie
    $stmt = $conn->prepare("DELETE FROM series WHERE id = ?");
    $stmt->bind_param("i", $targeted_series_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => $stmt->error]);
    }

    $stmt->close();
}
?>