<?php
require 'config.php';

header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT * FROM reports ORDER BY created_at DESC");
    $reports = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Map status to Albanian
    foreach ($reports as &$report) {
        // Status translations are already in Albanian in the database
        // Format the response
        $report['photo'] = $report['photo'] ? 'images/uploads/' . $report['photo'] : null;
    }
    
    echo json_encode($reports);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
