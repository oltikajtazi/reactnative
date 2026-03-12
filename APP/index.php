<?php
require 'config.php';
require 'functions.php';
?>
<!DOCTYPE html>
<html lang="sq">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Raporto Prishtinën</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
</head>
<body>
<header>
    <div class="header-content">
        <h1>Raporto Prishtinën</h1>
        <div class="header-icons">
            <button class="icon-btn" title="Raporte" onclick="showReports()"><i class="fas fa-file-alt"></i></button>
            <button class="icon-btn" title="Cilësimet" onclick="openSettings()"><i class="fas fa-cog"></i></button>
        </div>
    </div>
</header>

<!-- Settings modal -->
<div id="settingsModal" class="modal">
    <div class="modal-content">
        <span class="close-settings close">&times;</span>
        <h2>Cilësimet</h2>
        <div class="settings-group">
            <label for="themeSelect">Modaliteti i ngjyrave</label>
            <select id="themeSelect">
                <option value="light">Drita</option>
                <option value="dark">E errët</option>
                <option value="bright">E ndritshme</option>
            </select>
        </div>
        <div class="settings-group">
            <label for="appTitleInput">Titulli i aplikacionit</label>
            <input type="text" id="appTitleInput" placeholder="<?= APP_TITLE ?>">
        </div>
        <div class="settings-group">
            <label><input type="checkbox" id="notifToggle"> Lejo njoftimet</label>
        </div>
        <div class="settings-group">
            <label for="municipalityEmailInput">Email i Komunës</label>
            <input type="email" id="municipalityEmailInput" placeholder="<?= MUNICIPALITY_EMAIL ?>">
        </div>
        <div class="settings-group">
            <button id="saveSettingsBtn" class="btn-primary" style="width:auto;">Ruaj</button>
        </div>
    </div>
</div>

<div class="container">
    <div class="categories-grid">
        <div class="category-card" onclick="selectCategory('Grumbullim mbeturinash')">
            <div class="category-icon"><i class="fas fa-trash"></i></div>
            <div class="category-name">Grumbullim mbeturinash</div>
        </div>
        
        <div class="category-card" onclick="selectCategory('Rrugët e thyera')">
            <div class="category-icon"><i class="fas fa-lightbulb"></i></div>
            <div class="category-name">Rrugët e thyera</div>
        </div>
        
        <div class="category-card" onclick="selectCategory('Gropë në rrugë')">
            <div class="category-icon"><i class="fas fa-road"></i></div>
            <div class="category-name">Gropë në rrugë</div>
        </div>
        
        <div class="category-card" onclick="selectCategory('Trotuari i dëmtuar')">
            <div class="category-icon"><i class="fas fa-person-walking"></i></div>
            <div class="category-name">Trotuari i dëmtuar</div>
        </div>
        
        <div class="category-card" onclick="selectCategory('Rrjedha uji')">
            <div class="category-icon"><i class="fas fa-droplet"></i></div>
            <div class="category-name">Rrjedha uji</div>
        </div>
        
        <div class="category-card" onclick="selectCategory('Hedhje e paligjshme')">
            <div class="category-icon"><i class="fas fa-ban"></i></div>
            <div class="category-name">Hedhje e paligjshme</div>
        </div>
        
        <div class="category-card" onclick="selectCategory('Çështje të tjera')">
            <div class="category-icon"><i class="fas fa-building"></i></div>
            <div class="category-name">Çështje të tjera</div>
        </div>
    </div>
</div>

<!-- Modal for form -->
<div id="reportModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2 id="modalTitle">Dërgo raport</h2>
        
        <form action="submit_report.php" method="post" enctype="multipart/form-data" onsubmit="return validateForm()">
            <input type="hidden" name="category" id="selectedCategory" required>
            
            <label for="description">Përshkrimi</label>
            <textarea name="description" id="description" rows="4" placeholder="Përshkruaj problemin..." required></textarea>

            <label for="photo">Foto (opsionale)</label>
            <input type="file" name="photo" id="photo" accept="image/*">

            <label for="latitude">Gjerësia</label>
            <input type="text" name="latitude" id="latitude" readonly>
            
            <label for="longitude">Gjatësia</label>
            <input type="text" name="longitude" id="longitude" readonly>
            
            <button type="button" id="detect-location" class="btn-secondary">Zbulo vendndodhjen</button>

            <div id="map"></div>

            <button type="submit" class="btn-primary">Dërgo raportin</button>
        </form>
    </div>
</div>

<div id="reportsView" class="reports-view" style="display: none;">
    <div id="reportsList"></div>
</div>

<footer>
    <div class="footer-nav">
        <a href="#" onclick="showHome(); return false;" class="footer-icon active" id="homeIcon"><i class="fas fa-home"></i><span>Shtëpia</span></a>
        <a href="#" onclick="showReports(); return false;" class="footer-icon" id="reportsIcon"><i class="fas fa-file-alt"></i><span>Raportet</span></a>
    </div>
    <p>&copy; 2026 Komuna e Prishtinës</p>
</footer>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="js/app.js"></script>
</body>
</html>