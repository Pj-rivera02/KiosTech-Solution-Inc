<?php
// Database configuration
$servername = "sql311.infinityfree.com";
$username = "if0_38819604";
$password = "gnV0fT6A8ARaj6m";
$dbname = "if0_38819604_kiosktechdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("INSERT INTO inquiries (first_name, last_name, email, phone, created_at) VALUES (?, ?, ?, ?, NOW())");
$stmt->bind_param("ssss", $first_name, $last_name, $email, $phone);

$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$stmt->execute();

echo "New record created successfully";

$stmt->close();
$conn->close();
?>