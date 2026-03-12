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
?>
<!DOCTYPE html>
<html lang="sq">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paneli i Administrimit</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
<header><h1>Paneli i Administrimit</h1>
    <a href="logout.php" style="color:#fff; float:right; margin-right:1rem;">Çkyçu</a>
</header>
<div class="container">
    <div class="admin-header">
        <div>
            <h2>Dashboard</h2>
            <p>Welcome, <?php echo htmlspecialchars($_SESSION['admin_username']); ?>.</p>
        </div>
        <div class="actions">
            <a href="logs.php" class="btn-secondary">View Logs</a>
            <a href="map_view.php" class="btn-secondary">Map View</a>
            <a href="logout.php" class="btn-secondary">Logout</a>
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
            <h3 id="total-count"><?= $totals['total'] ?></h3>
            <p>Total Reports</p>
        </div>
        <div class="stat-card">
            <h3 id="pending-count"><?= $totals['pending'] ?></h3>
            <p>Pending</p>
        </div>
        <div class="stat-card">
            <h3 id="processing-count"><?= $processing ?></h3>
            <p>Processing</p>
        </div>
        <div class="stat-card">
            <h3 id="resolved-count"><?= $totals['resolved'] ?></h3>
            <p>Resolved</p>
        </div>
    </div>

    <h2>Raportet</h2>
    <form method="get" action="">
        <div class="controls">
            <div style="display:flex; gap:8px; align-items:center;">
                <label>Kategoria:
                    <select name="category">
                        <option value="">Të gjitha</option>
                        <?php
                        $cats = ['Grumbullim mbeturinash','Rrugët e thyera','Gropë në rrugë','Trotuari i dëmtuar','Rrjedha uji','Hedhje e paligjshme','Çështje të tjera'];
                        foreach ($cats as $c) {
                            $sel = $categoryFilter === $c ? 'selected' : '';
                            echo "<option value=\"$c\" $sel>$c</option>";
                        }
                        ?>
                    </select>
                </label>
                <label>Statusi:
                    <select name="status">
                        <option value="">Të gjithë</option>
                        <option value="Në pritje" <?= $statusFilter==='Në pritje'?'selected':'' ?>>Në pritje</option>
                        <option value="Në përpunim" <?= $statusFilter==='Në përpunim'?'selected':'' ?>>Në përpunim</option>
                        <option value="Zgjidhur" <?= $statusFilter==='Zgjidhur'?'selected':'' ?>>Zgjidhur</option>
                    </select>
                </label>
                <button type="submit" class="btn-primary">Filtro</button>
                <a href="map_view.php" class="btn-secondary" style="margin-left:8px;">Shiko në hartë</a>
                <a href="logs.php" class="btn-secondary" style="margin-left:8px;">Shiko regjistrin</a>
            </div>
            <div style="margin-top:12px; display:flex; gap:8px; align-items:center;">
                <input type="text" name="q" id="search-keyword" placeholder="Search by description or reporter" style="flex:1; padding:8px 10px; border-radius:8px; border:1px solid #e5e7eb;">
                <button id="search-btn" class="btn-primary">Search</button>
            </div>
        </div>
    </form>

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
                <td><?= $r['id'] ?></td>
                <td><?= sanitize($r['category']) ?></td>
                <td><?= sanitize($r['description']) ?></td>
                <td><?php if ($r['photo']): ?><img src="../images/uploads/<?= $r['photo'] ?>" width="60"><?php endif; ?></td>
                <td><?= $r['latitude'] ? $r['latitude'] . ", " . $r['longitude'] : '' ?></td>
                <td><?= $r['status'] ?></td>
                <td><?= $r['created_at'] ?></td>
                <td>
                    <form method="post" action="update_status.php" style="display:inline">
                        <input type="hidden" name="id" value="<?= $r['id'] ?>">
                        <select name="status">
                            <option value="Në pritje" <?= $r['status']=='Në pritje'?'selected':'' ?>>Në pritje</option>
                            <option value="Në përpunim" <?= $r['status']=='Në përpunim'?'selected':'' ?>>Në përpunim</option>
                            <option value="Zgjidhur" <?= $r['status']=='Zgjidhur'?'selected':'' ?>>Zgjidhur</option>
                        </select>
                        <button type="submit" class="btn-primary">Ruaj</button>
                    </form>
                    <form method="post" action="delete_report.php" style="display:inline" onsubmit="return confirm('A jeni të sigurt se dëshironi të fshini këtë raport?');">
                        <input type="hidden" name="id" value="<?= $r['id'] ?>">
                        <button type="submit" class="btn-icon delete">Fshi</button>
                    </form>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>
<footer>&copy; 2026 Komuna e Prishtinës</footer>
<script src="../js/app.js"></script>
</body>
</html>