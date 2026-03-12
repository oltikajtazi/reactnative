<?php
require '../config.php';
require '../functions.php';
requireLogin();

$reports = $pdo->query('SELECT id, category, latitude, longitude FROM reports WHERE latitude IS NOT NULL AND longitude IS NOT NULL')->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="sq">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Harta e raportimeve</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
</head>
<body>
<header><h1>Harta e Raportimeve</h1>
    <a href="dashboard.php" style="color:#fff; float:right; margin-right:1rem;">Kthehu</a>
</header>
<div class="container">
    <div id="map"></div>
</div>
<footer>&copy; 2026 Komuna e Prishtinës</footer>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
    const map = L.map('map').setView([42.6667,21.1667],13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap contributors'}).addTo(map);

    const reports = <?= json_encode($reports) ?>;
    reports.forEach(r => {
        L.marker([r.latitude, r.longitude]).addTo(map)
            .bindPopup(`ID: ${r.id}<br/>${r.category}`);
    });
</script>
</body>
</html>