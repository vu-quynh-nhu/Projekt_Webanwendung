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
    
    $username = $conn->real_escape_string($_POST['username']);
    $email = $conn->real_escape_string($_POST['email']);
    $password = $_POST['password'];

    

    if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/', $password)) {
        echo "Fehler: Passwort erfüllt nicht die Vorgaben";
        header("Location: ../html/signup.html"); 
        exit; 
    }

    // Check if username already exists
    $checkUserSql = "SELECT * FROM user WHERE username = '$username'";
    $result = $conn->query($checkUserSql);
   
    if ($result->num_rows > 0) {
        $message = "Fehler: Der Benutzername ist bereits vergeben.";
            ?>
            <script type="text/javascript">alert("<?php echo $message; ?>");
                window.location.href = "../html/signup.html";
                </script>
            <?php
            exit;
    }

    $password = password_hash($password, PASSWORD_BCRYPT);

   
    $sql = "INSERT INTO user (username, email, password) VALUES ('$username', '$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        header("Location: ../html/index.html"); 
        exit;
    } else {
        echo "Fehler: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>