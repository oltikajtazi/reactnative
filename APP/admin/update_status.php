<?php
require '../config.php';
require '../functions.php';
requireLogin();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = intval($_POST['id'] ?? 0);
    $status = $_POST['status'] ?? '';
    if ($id && in_array($status, ['Në pritje','Në përpunim','Zgjidhur'])) {
        $stmt = $pdo->prepare('UPDATE reports SET status = :s WHERE id = :id');
        $stmt->execute([':s'=>$status, ':id'=>$id]);
        logAdminAction('update_status', "Report #$id status changed to $status");
    }
}
header('Location: dashboard.php');
exit;
