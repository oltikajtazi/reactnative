-- Database schema for Raporto Prishtinën

CREATE DATABASE IF NOT EXISTS raportoprishtinen CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE raportoprishtinen;

-- admins table for municipality workers
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- reports table
CREATE TABLE IF NOT EXISTS reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category ENUM('Grumbullim mbeturinash', 'Rrugët e thyera', 'Gropë në rrugë', 'Trotuari i dëmtuar', 'Rrjedha uji', 'Hedhje e paligjshme', 'Çështje të tjera') NOT NULL,
    description TEXT NOT NULL,
    photo VARCHAR(255) DEFAULT NULL,
    latitude DECIMAL(10,8) DEFAULT NULL,
    longitude DECIMAL(11,8) DEFAULT NULL,
    status ENUM('Në pritje','Në përpunim','Zgjidhur') DEFAULT 'Në pritje',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- admin activity log
CREATE TABLE IF NOT EXISTS admin_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    action VARCHAR(100) NOT NULL,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


USE raportoprishtinen;
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

<?php
try {
    // existing PDO connection code...
    // existing query that currently fails...
} catch (PDOException $e) {
    if ($e->getCode() === '42S02') {
        // missing table - attempt import
        $sql = file_get_contents(__DIR__.'/database.sql');
        $pdo->exec($sql);
        // optionally redirect to reload page
        header('Location: setup.php');
        exit;
    } else {
        throw $e;
    }
}