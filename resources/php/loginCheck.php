<?php 
//takes current session
session_start();

$response = array();
if (isset($_SESSION["username"])) {
    $response["isUserLoggedIn"] = true;
    $response["username"] = $_SESSION["username"];
} else {
    $response["isUserLoggedIn"] = false;
}

header("Content-Type: application/json");
echo json_encode($response);
?>