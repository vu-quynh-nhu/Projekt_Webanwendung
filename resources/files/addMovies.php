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
$entry = "INSERT INTO series(title, release_year, genre, seasons, directors, actors, short_description, thumbnail)
VALUES('Gilmore Girls', '2000', 'Drama', '7', 'Amy Sherman-Palladino', 'Alexis Bledel, Lauren Graham, Milo Ventimiglia, Jared Padalecki, Kelly Bishop, Chad Michael Murray, Melissa McCarthy, Scott Patterson, Edward Herrmann', 'Die alleinerziehende Mutter Lorelai Gilmore (Lauren Graham) und ihre Teenager-Tochter Rory (Alexis Bledel) kommen bestens miteinander aus. Sie sind nicht nur Mutter und Tochter, sondern vor allem auch beste Freundinnen. Gemeinsam leben sie in der verschlafenen Kleinstadt Stars Hollow, wo sie einen Großteil ihrer Zeit im Diner des raubeinigen, aber herzensguten Luke (Scott Patterson) verbringen. Abseits dessen ist Bücherwurm Rory aber auch eine absolute Überfliegerin in der Schule, was ihr schließlich einen Platz an der renommierten Chilton-Privatschule verschafft. Da sich Lorelai allein jedoch nicht leisten kann, Rory nach Chilton zu schicken, wendet sie sich an ihre wohlhabenden Eltern Richard (Edward Herrmann) und Emily (Kelly Bishop), zu denen sie ein schwieriges Verhältnis hat, seit sie Rory mit gerade einmal 16 Jahren bekommen hat. Die beiden willigen ein, für die Schulkosten aufzukommen unter der Bedingung, dass Lorelai und Rory künftig jeden Freitag bei ihnen zum Abendessen erscheinen.', 'http://localhost/Reviewer/resources/img/office.jpg')";

if ($conn->query($entry) === TRUE) {
    echo ("Movie was added successfully.");
} else {
    echo ("Movie was not added successfully.");
}
?>