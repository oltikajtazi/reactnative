<?php
// config.php - database connection settings

$db_host = 'localhost';
$db_name = 'raportoprishtinen';
$db_user = 'root';
$db_pass = ''; // change for production

// user-customizable settings
define('MUNICIPALITY_EMAIL','info@prishtina-ks.net');

// you can also add other defaults like app name
define('APP_TITLE','Raporto Prishtinën');

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_PERSISTENT => false,
    ]);
} catch (PDOException $e) {
    die('Gabim lidhjeje me bazën e të dhënave: ' . $e->getMessage());
}
