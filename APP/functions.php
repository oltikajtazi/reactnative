<?php
// common utilities

function sanitize($data) {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

function isLoggedIn() {
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }
    return isset($_SESSION['admin_id']);
}

function requireLogin() {
    if (!isLoggedIn()) {
        header('Location: admin/login.php');
        exit;
    }
}

function sendAdminNotification($reportId) {
    // in production use proper mail configuration
    $to = 'admin@example.com';
    $subject = 'Raport i ri #' . $reportId;
    $message = "Ju është dërguar një raport i ri. Shikoni panelin e administrimit.";
    $headers = 'From: no-reply@raportoprishtinen.com' . "\r\n";
    @mail($to, $subject, $message, $headers);
}

function logAdminAction($action, $details = '') {
    if (!isLoggedIn()) return;
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }
    $adminId = $_SESSION['admin_id'];
    global $pdo;
    try {
        $stmt = $pdo->prepare("INSERT INTO admin_logs (admin_id, action, details) VALUES (:a,:act,:det)");
        $stmt->execute([':a'=>$adminId,':act'=>$action,':det'=>$details]);
    } catch (PDOException $e) {
        // if table missing, try to create and retry once
        if ($e->getCode() === '42S02') {
            $pdo->exec("CREATE TABLE IF NOT EXISTS admin_logs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                admin_id INT NOT NULL,
                action VARCHAR(100) NOT NULL,
                details TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
            ) ENGINE=InnoDB;");
            try {
                $stmt = $pdo->prepare("INSERT INTO admin_logs (admin_id, action, details) VALUES (:a,:act,:det)");
                $stmt->execute([':a'=>$adminId,':act'=>$action,':det'=>$details]);
            } catch (PDOException $e2) {
                // give up silently
            }
        }
    }
}
