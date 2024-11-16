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
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $conn->real_escape_string($_POST['username']);
    $password = $_POST['password'];

    $sql = "SELECT * FROM user WHERE username = '$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        if (password_verify($password, $row['password'])) {            
            session_start();
            $_SESSION['username'] = $username;
            header("Location: ../html/index.html"); 
            exit;
        } else {
            $message = "Falsches Passwort. Bitte versuche es erneut.";
            echo "<script type='text/javascript'>alert('$message');</script>";
            //header("Location: ../html/login.html"); 
        }
    } else {
        echo "Kein Nutzer mit diesem Namen gefunden.";
        ?><a href="../html/login.html">Zurück zum Login</a><?php
    }
}

$conn->close();
?>
