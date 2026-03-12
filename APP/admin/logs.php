<?php
require '../config.php';
require '../functions.php';
requireLogin();

// fetch last 100 logs
try {
    $stmt = $pdo->query('SELECT l.*, a.username FROM admin_logs l JOIN admins a ON l.admin_id = a.id ORDER BY created_at DESC LIMIT 100');
    $logs = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    // table doesn't exist yet
    $logs = [];
    // attempt to create table automatically
    $pdo->exec("CREATE TABLE IF NOT EXISTS admin_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        admin_id INT NOT NULL,
        action VARCHAR(100) NOT NULL,
        details TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
    ) ENGINE=InnoDB;");
}
?>
<!DOCTYPE html>
<html lang="sq">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Regjistri i Administratorit</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
<header><h1>Regjistri i Administratorëve</h1>
    <a href="dashboard.php" style="color:#fff; float:right; margin-right:1rem;">Kthehu</a>
</header>
<div class="container">
    <table>
        <thead>
            <tr>
                <th>Koha</th>
                <th>Admin</th>
                <th>Veprimi</th>
                <th>Detajet</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach($logs as $l): ?>
            <tr>
                <td><?= $l['created_at'] ?></td>
                <td><?= sanitize($l['username']) ?></td>
                <td><?= sanitize($l['action']) ?></td>
                <td><?= sanitize($l['details']) ?></td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>
<footer>&copy; 2026 Komuna e Prishtinës</footer>
</body>
</html>