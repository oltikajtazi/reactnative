<?php
require 'config.php';
require 'functions.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php');
    exit;
}

$category = sanitize($_POST['category'] ?? '');
$description = sanitize($_POST['description'] ?? '');
$lat = isset($_POST['latitude']) ? floatval($_POST['latitude']) : null;
$lng = isset($_POST['longitude']) ? floatval($_POST['longitude']) : null;

// basic validation
$errors = [];
if (!$category) {
    $errors[] = 'Kategoria është e kërkuar.';
}
if (strlen($description) < 10) {
    $errors[] = 'Përshkrimi duhet të ketë të paktën 10 karaktere.';
}

$photoPath = null;
if (!empty($_FILES['photo']['name'])) {
    $allowed = ['jpg','jpeg','png','gif'];
    $ext = strtolower(pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, $allowed)) {
        $errors[] = 'Tipi i skedarit të fotografisë nuk lejohet.';
    } else {
        $targetDir = 'images/uploads/';
        if (!is_dir($targetDir)) mkdir($targetDir, 0755, true);
        $filename = uniqid() . '.' . $ext;
        $targetFile = $targetDir . $filename;
        if (move_uploaded_file($_FILES['photo']['tmp_name'], $targetFile)) {
            $photoPath = $filename;
        } else {
            $errors[] = 'Ngarkimi i fotografisë dështoi.';
        }
    }
}

if ($errors) {
    // simple error display, could be improved
    foreach ($errors as $e) {
        echo '<p>' . $e . '</p>';
    }
    echo '<p><a href="index.php">Kthehu</a></p>';
    exit;
}

$stmt = $pdo->prepare("INSERT INTO reports (category, description, photo, latitude, longitude) VALUES (:cat, :desc, :photo, :lat, :lng)");
$stmt->execute([
    ':cat' => $category,
    ':desc' => $description,
    ':photo' => $photoPath,
    ':lat' => $lat,
    ':lng' => $lng
]);
$reportId = $pdo->lastInsertId();

sendAdminNotification($reportId);

header('Location: thank_you.php');
exit;
?>