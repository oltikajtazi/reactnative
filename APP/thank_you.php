<?php require 'functions.php'; ?>
<!DOCTYPE html>
<html lang="sq">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Faleminderit</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
<header>
    <div class="header-content">
        <h1>Raporto Prishtinën</h1>
    </div>
</header>
<div class="container" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 70vh; text-align: center;">
    <div style="background: white; padding: 3rem; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
        <div style="font-size: 4rem; color: #27ae60; margin-bottom: 1rem;">
            <i class="fas fa-check-circle"></i>
        </div>
        <h2 style="color: #1e3c72; font-size: 2rem; margin-bottom: 1rem;">Faleminderit për raportin!</h2>
        <p style="color: #555; font-size: 1.1rem; margin-bottom: 2rem;">Raporti juaj është regjistruar me sukses. Ne do ta shqyrtojmë sa më shpejt të jetë e mundur.</p>
        <a href="index.php" class="btn-primary" style="display: inline-block; padding: 1rem 2rem; text-decoration: none;">Kthehu në faqen kryesore</a>
    </div>
</div>
<footer style="position: relative; margin-top: 3rem;">
    <p>&copy; 2026 Komuna e Prishtinës</p>
</footer>
<script>
    // show browser notification if enabled
    if (localStorage.getItem('notifications') === 'on' && "Notification" in window) {
        if (Notification.permission === 'granted') {
            new Notification('Raporti juaj u dërgua', {
                body: 'Faleminderit për raportin! Ne do ta shqyrtojmë.',
                icon: 'images/notification-icon.png'
            });
        }
    }
    // Auto-redirect after 5 seconds
    setTimeout(function() {
        window.location.href = 'index.php';
    }, 5000);
</script>
</body>
</html>