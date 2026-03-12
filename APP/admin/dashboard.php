<?php
require '../config.php';
require '../functions.php';
requireLogin();

// filter options
$statusFilter = $_GET['status'] ?? '';
$categoryFilter = $_GET['category'] ?? '';

$query = "SELECT * FROM reports WHERE 1";
$params = [];
if ($statusFilter) {
    $query .= " AND status = :status";
    $params[':status'] = $statusFilter;
}
if ($categoryFilter) {
    $query .= " AND category = :cat";
    $params[':cat'] = $categoryFilter;
}
$query .= " ORDER BY created_at DESC";
$stmt = $pdo->prepare($query);
$stmt->execute($params);
$reports = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Get admin username safely
$adminName = $_SESSION['admin_username'] ?? 'Admin';
?>
<!DOCTYPE html>
<html lang="sq">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paneli i Administrimit</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <style>
        * { box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f7fa; margin: 0; }
        
        header {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
            padding: 1.5rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        header h1 { margin: 0; font-size: 1.8rem; }
        header a { color: white; text-decoration: none; font-weight: 600; transition: 0.3s; }
        header a:hover { opacity: 0.8; }
        
        .container { max-width: 1400px; margin: 2rem auto; padding: 0 1rem; }
        
        .admin-header {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .admin-header h2 { margin: 0; color: #1e3c72; }
        .admin-header p { margin: 0.5rem 0 0 0; color: #666; }
        .actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        .stat-card {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            text-align: center;
            border-left: 4px solid #2a5298;
            transition: transform 0.3s;
        }
        .stat-card:hover { transform: translateY(-5px); }
        .stat-card h3 { margin: 0; font-size: 2.5rem; color: #2a5298; }
        .stat-card p { margin: 0.5rem 0 0 0; color: #666; font-size: 0.95rem; }
        
        .controls {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 2rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .controls label { margin-right: 1rem; font-weight: 600; }
        .controls select, .controls input[type="text"] {
            padding: 0.6rem 0.8rem;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            font-size: 0.95rem;
        }
        
        .btn-primary, .btn-secondary, .btn-icon {
            padding: 0.6rem 1.2rem;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.3s;
            font-size: 0.95rem;
        }
        .btn-primary {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(42,82,152,0.4); }
        .btn-secondary {
            background: #e5e7eb;
            color: #1f2937;
        }
        .btn-secondary:hover { background: #d1d5db; }
        
        .admin-table {
            width: 100%;
            background: white;
            border-collapse: collapse;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .admin-table thead {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
        }
        .admin-table th {
            padding: 1rem;
            text-align: left;
            font-weight: 600;
            white-space: nowrap;
        }
        .admin-table td {
            padding: 1rem;
            border-bottom: 1px solid #e5e7eb;
        }
        .admin-table tbody tr:hover { background: #f9fafb; }
        .admin-table img { border-radius: 6px; }
        
        .map-container {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            margin: 2rem 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        #adminMap {
            width: 100%;
            height: 500px;
            border-radius: 8px;
        }
        
        footer {
            background: #1f2937;
            color: white;
            text-align: center;
            padding: 2rem;
            margin-top: 3rem;
        }
        
        @media (max-width: 768px) {
            header { flex-direction: column; text-align: center; }
            .admin-header { flex-direction: column; text-align: center; }
            .actions { justify-content: center; }
            .controls { display: flex; flex-direction: column; gap: 1rem; }
            .controls > div { display: flex; flex-direction: column; gap: 0.5rem; }
            .stats-grid { grid-template-columns: repeat(2, 1fr); }
            .admin-table { font-size: 0.85rem; }
            .admin-table th, .admin-table td { padding: 0.75rem 0.5rem; }
            #adminMap { height: 400px; }
        }
        
        @media (max-width: 480px) {
            .stats-grid { grid-template-columns: 1fr; }
            .admin-table { overflow-x: auto; }
            .admin-table thead { display: none; }
            .admin-table tbody, .admin-table tr, .admin-table td { display: block; width: 100%; }
            .admin-table tr { margin-bottom: 1rem; border: 1px solid #e5e7eb; border-radius: 6px; }
            .admin-table td::before { content: attr(data-label); font-weight: 600; display: inline-block; width: 100px; }
            #adminMap { height: 300px; }
        }
    </style>
</head>
<body>
<header>
    <h1>Paneli i Administrimit</h1>
    <a href="logout.php"><i class="fas fa-sign-out-alt"></i> Çkyçu</a>
</header>

<div class="container">
    <div class="admin-header">
        <div>
            <h2>Dashboard</h2>
            <p>Welcome, <?= htmlspecialchars($adminName) ?></p>
        </div>
        <div class="actions">
            <a href="logs.php" class="btn-secondary"><i class="fas fa-list"></i> View Logs</a>
            <a href="logout.php" class="btn-secondary"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </div>
    </div>

    <?php
    $totals = $pdo->query("SELECT 
        COUNT(*) AS total,
        SUM(status='Zgjidhur') AS resolved,
        SUM(status='Në pritje') AS pending
        FROM reports")->fetch(PDO::FETCH_ASSOC);
    $processing = max(0, $totals['total'] - $totals['resolved'] - $totals['pending']);
    ?>

    <div class="stats-grid">
        <div class="stat-card">
            <h3><?= $totals['total'] ?></h3>
            <p>Total Reports</p>
        </div>
        <div class="stat-card">
            <h3><?= $totals['pending'] ?></h3>
            <p>Pending</p>
        </div>
        <div class="stat-card">
            <h3><?= $processing ?></h3>
            <p>Processing</p>
        </div>
        <div class="stat-card">
            <h3><?= $totals['resolved'] ?></h3>
            <p>Resolved</p>
        </div>
    </div>

    <h2><i class="fas fa-map"></i> Report Map</h2>
    <div class="map-container">
        <div id="adminMap"></div>
    </div>

    <h2><i class="fas fa-list"></i> Reports</h2>
    <div class="controls">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            <div>
                <label>Kategoria:</label>
                <select id="categoryFilter">
                    <option value="">Të gjitha</option>
                    <?php
                    $cats = ['Grumbullim mbeturinash','Rrugët e thyera','Gropë në rrugë','Trotuari i dëmtuar','Rrjedha uji','Hedhje e paligjshme','Çështje të tjera'];
                    foreach ($cats as $c) {
                        $sel = $categoryFilter === $c ? 'selected' : '';
                        echo "<option value=\"$c\" $sel>$c</option>";
                    }
                    ?>
                </select>
            </div>
            <div>
                <label>Statusi:</label>
                <select id="statusFilter">
                    <option value="">Të gjithë</option>
                    <option value="Në pritje" <?= $statusFilter==='Në pritje'?'selected':'' ?>>Në pritje</option>
                    <option value="Në përpunim" <?= $statusFilter==='Në përpunim'?'selected':'' ?>>Në përpunim</option>
                    <option value="Zgjidhur" <?= $statusFilter==='Zgjidhur'?'selected':'' ?>>Zgjidhur</option>
                </select>
            </div>
            <div style="display: flex; gap: 0.5rem; align-items: flex-end;">
                <button id="filterBtn" class="btn-primary" style="flex: 1;"><i class="fas fa-filter"></i> Filter</button>
                <button id="resetBtn" class="btn-secondary"><i class="fas fa-redo"></i> Reset</button>
            </div>
        </div>
    </div>

    <table class="admin-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Kategoria</th>
                <th>Përshkrimi</th>
                <th>Foto</th>
                <th>Vendodhja</th>
                <th>Statusi</th>
                <th>Koha</th>
                <th>Veprime</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($reports as $r): ?>
            <tr>
                <td data-label="ID"><?= $r['id'] ?></td>
                <td data-label="Kategoria"><?= sanitize($r['category']) ?></td>
                <td data-label="Përshkrimi" style="max-width: 200px; overflow: hidden; text-overflow: ellipsis;"><?= sanitize($r['description']) ?></td>
                <td data-label="Foto"><?php if ($r['photo']): ?><img src="../images/uploads/<?= $r['photo'] ?>" width="50" style="cursor:pointer;" onclick="viewPhoto('../images/uploads/<?= $r['photo'] ?>')"> <?php endif; ?></td>
                <td data-label="Vendodhja"><?= $r['latitude'] ? $r['latitude'] . ", " . $r['longitude'] : 'N/A' ?></td>
                <td data-label="Statusi"><span style="background: <?= $r['status']=='Zgjidhur'?'#10b981':($r['status']=='Në përpunim'?'#f59e0b':'#ef4444') ?>; color:white; padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.85rem;"><?= $r['status'] ?></span></td>
                <td data-label="Koha" style="font-size: 0.9rem;"><?= date('d/m/Y H:i', strtotime($r['created_at'])) ?></td>
                <td data-label="Veprime" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    <form method="post" action="update_status.php" style="display:inline">
                        <input type="hidden" name="id" value="<?= $r['id'] ?>">
                        <select name="status" style="padding: 0.4rem; border-radius: 4px; border: 1px solid #ddd;">
                            <option value="Në pritje" <?= $r['status']=='Në pritje'?'selected':'' ?>>Në pritje</option>
                            <option value="Në përpunim" <?= $r['status']=='Në përpunim'?'selected':'' ?>>Në përpunim</option>
                            <option value="Zgjidhur" <?= $r['status']=='Zgjidhur'?'selected':'' ?>>Zgjidhur</option>
                        </select>
                        <button type="submit" class="btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">Ruaj</button>
                    </form>
                    <button type="button" class="btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;" onclick="viewReportOnMap(<?= $r['id'] ?>, <?= $r['latitude'] ?>, <?= $r['longitude'] ?>)"><i class="fas fa-map-pin"></i> Harta</button>
                    <form method="post" action="delete_report.php" style="display:inline" onsubmit="return confirm('A jeni të sigurt?');">
                        <input type="hidden" name="id" value="<?= $r['id'] ?>">
                        <button type="submit" class="btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;"><i class="fas fa-trash"></i> Fshi</button>
                    </form>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>

<footer>&copy; 2026 Komuna e Prishtinës</footer>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
// Initialize admin map
const adminMap = L.map('adminMap').setView([42.6667, 21.1667], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(adminMap);

const reports = <?= json_encode($reports) ?>;
const markers = [];

function plotReports() {
    markers.forEach(m => adminMap.removeLayer(m));
    markers.length = 0;
    
    reports.forEach(report => {
        if (report.latitude && report.longitude) {
            const color = report.status === 'Zgjidhur' ? '#10b981' : (report.status === 'Në përpunim' ? '#f59e0b' : '#ef4444');
            const marker = L.circleMarker([report.latitude, report.longitude], {
                radius: 8,
                fillColor: color,
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(adminMap);
            
            marker.bindPopup(`
                <strong>${report.category}</strong><br>
                ${report.description.substring(0, 50)}...<br>
                <em>Status: ${report.status}</em>
            `);
            markers.push(marker);
        }
    });
}

function viewPhoto(src) {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:9999;';
    modal.innerHTML = `<img src="${src}" style="max-width:90%;max-height:90%;border-radius:8px;"><span style="position:absolute;top:20px;right:30px;color:white;font-size:40px;cursor:pointer;" onclick="this.parentElement.remove();">&times;</span>`;
    document.body.appendChild(modal);
}

document.getElementById('filterBtn').addEventListener('click', function() {
    const cat = document.getElementById('categoryFilter').value;
    const status = document.getElementById('statusFilter').value;
    window.location = `?category=${cat}&status=${status}`;
});

document.getElementById('resetBtn').addEventListener('click', function() {
    window.location = '?';
});

function viewReportOnMap(reportId, lat, lng) {
    if (!lat || !lng) {
        alert('Ky raport nuk ka vendndodhje të specifikuar.');
        return;
    }
    // Scroll to map
    document.getElementById('adminMap').scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Center map on report
    setTimeout(() => {
        adminMap.setView([parseFloat(lat), parseFloat(lng)], 17);
        // Find and highlight the marker
        markers.forEach(m => {
            if (m.getLatLng().lat === parseFloat(lat) && m.getLatLng().lng === parseFloat(lng)) {
                m.openPopup();
            }
        });
    }, 500);
}

plotReports();
</script>

</body>
</html>