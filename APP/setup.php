<?php
require 'config.php';
require 'functions.php';

// This script is for initial setup only - creates the first admin user
// Delete this file after creating your admin account for security

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = sanitize($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    $email = sanitize($_POST['email'] ?? '');
    
    $errors = [];
    
    if (strlen($username) < 3) {
        $errors[] = 'Username duhet të ketë të paktën 3 karaktere.';
    }
    if (strlen($password) < 6) {
        $errors[] = 'Fjalëkalimi duhet të ketë të paktën 6 karaktere.';
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Email nuk është valid.';
    }
    
    if (empty($errors)) {
        // Check if username already exists
        $check = $pdo->prepare('SELECT id FROM admins WHERE username = :u');
        $check->execute([':u' => $username]);
        
        if ($check->fetch()) {
            $errors[] = 'Ky username ekziston tashmë.';
        } else {
            // Create admin account
            $passwordHash = password_hash($password, PASSWORD_BCRYPT);
            $stmt = $pdo->prepare('INSERT INTO admins (username, password_hash, email) VALUES (:u, :p, :e)');
            $stmt->execute([
                ':u' => $username,
                ':p' => $passwordHash,
                ':e' => $email
            ]);
            $success = 'Llogaria e administratorit u krijua me sukses! <a href="admin/login.php">Shko në login</a>';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="sq">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Setup - Krijo Admin</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
<header>
    <div class="header-content">
        <h1>Raporto Prishtinën - Setup</h1>
    </div>
</header>

<div class="container" style="max-width: 500px; margin-top: 3rem;">
    <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
        <h2 style="color: #1e3c72; margin-bottom: 2rem; text-align: center;">Krijo Llogaren Administratorit</h2>
        
        <?php if (!empty($success)): ?>
            <div style="background-color: #d1e7dd; color: #0f5132; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid #198754;">
                <?= $success ?>
            </div>
        <?php endif; ?>
        
        <?php if (!empty($errors)): ?>
            <div style="background-color: #f8d7da; color: #842029; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid #f5c2c7;">
                <ul style="margin: 0; padding-left: 1.5rem;">
                    <?php foreach ($errors as $error): ?>
                        <li><?= $error ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endif; ?>
        
        <form method="post" action="">
            <div style="margin-bottom: 1.5rem;">
                <label for="username" style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #2c3e50;">Username</label>
                <input type="text" name="username" id="username" required style="width: 100%; padding: 0.75rem; border: 2px solid #ecf0f1; border-radius: 8px; font-size: 1rem;">
            </div>

            <div style="margin-bottom: 1.5rem;">
                <label for="email" style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #2c3e50;">Email</label>
                <input type="email" name="email" id="email" required style="width: 100%; padding: 0.75rem; border: 2px solid #ecf0f1; border-radius: 8px; font-size: 1rem;">
            </div>

            <div style="margin-bottom: 2rem;">
                <label for="password" style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #2c3e50;">Fjalëkalimi</label>
                <input type="password" name="password" id="password" required style="width: 100%; padding: 0.75rem; border: 2px solid #ecf0f1; border-radius: 8px; font-size: 1rem;">
            </div>

            <button type="submit" class="btn-primary">Krijo Admin</button>
        </form>
        
        <p style="text-align: center; color: #95a5a6; margin-top: 1.5rem; font-size: 0.9rem;">
            ⚠️ Pasi të krijoni llogarinë, fshini këtë skedar për siguri
        </p>
    </div>
</div>

<footer style="margin-top: 3rem;">
    <p>&copy; 2026 Komuna e Prishtinës</p>
</footer>
</body>
</html>
