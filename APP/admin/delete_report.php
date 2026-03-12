<?php
require '../config.php';
require '../functions.php';
requireLogin();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = intval($_POST['id'] ?? 0);
    if ($id) {
        // optionally delete photo file
        $stmt = $pdo->prepare('SELECT photo FROM reports WHERE id = :id');
        $stmt->execute([':id'=>$id]);
        $r = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($r && $r['photo']) {
            $file = '../images/uploads/' . $r['photo'];
            if (file_exists($file)) unlink($file);
        }
        $stmt = $pdo->prepare('DELETE FROM reports WHERE id = :id');
        $stmt->execute([':id'=>$id]);
        logAdminAction('delete_report', "Report #$id deleted");
    }
}
header('Location: dashboard.php');
exit;
