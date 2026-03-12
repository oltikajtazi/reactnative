<?php
// Simple importer for database.sql
// Usage: visit http://localhost/APP/import_db.php in your browser
// Edit the credentials below if your MySQL user/password differ.
$host = '127.0.0.1';
$port = 3306;
$user = 'root';
$pass = '';
$sqlFile = __DIR__ . '/database.sql';
try {
    $pdo = new PDO("mysql:host=$host;port=$port;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $sql = file_get_contents($sqlFile);
    if ($sql === false) {
        throw new Exception('Failed to read database.sql');
    }
    // Split statements and execute
    $statements = array_filter(array_map('trim', preg_split('/;\s*\n/', $sql)));
    foreach ($statements as $stmt) {
        if ($stmt === '') continue;
        $pdo->exec($stmt);
    }
    echo "Import completed successfully.";
} catch (Exception $e) {
    echo "Error: " . htmlspecialchars($e->getMessage());
}
?>