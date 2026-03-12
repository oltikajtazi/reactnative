<?php
require '../config.php';
require '../functions.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = sanitize($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($username && $password) {
        $stmt = $pdo->prepare('SELECT id, password_hash FROM admins WHERE username = :u');
        $stmt->execute([':u' => $username]);
        $admin = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($admin && password_verify($password, $admin['password_hash'])) {
            $_SESSION['admin_id'] = $admin['id'];
            logAdminAction('login', 'Successful login for user ' . $username);
            header('Location: dashboard.php');
            exit;
        } else {
            $error = 'Username ose fjalëkalim i gabuar.';
            logAdminAction('login_failed', 'Failed login for user ' . $username);
        }
    }
}
?>
<!DOCTYPE html>
<html lang="sq">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Administratori</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);">

<div style="width: 100%; max-width: 400px; padding: 2rem;">
    <div style="background: white; padding: 2.5rem; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
        
        <div style="text-align: center; margin-bottom: 2rem;">
            <div style="font-size: 3rem; color: #2a5298; margin-bottom: 1rem;">
                <i class="fas fa-shield-alt"></i>
            </div>
            <h1 style="color: #1e3c72; font-size: 1.8rem; margin: 0;">Admin Panel</h1>
            <p style="color: #95a5a6; margin-top: 0.5rem;">Raporto Prishtinën</p>
        </div>

        <?php if (!empty($error)): ?>
            <div style="background-color: #f8d7da; color: #842029; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #f5c2c7; display: flex; align-items: center; gap: 0.75rem;">
                <i class="fas fa-exclamation-circle"></i>
                <span><?= $error ?></span>
            </div>
        <?php endif; ?>

        <form method="post" action="">
            <div style="margin-bottom: 1.5rem;">
                <label for="username" style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #2c3e50; font-size: 0.95rem;">Username</label>
                <input type="text" name="username" id="username" required placeholder="Futni username-in" style="width: 100%; padding: 0.85rem; border: 2px solid #ecf0f1; border-radius: 8px; font-size: 1rem; font-family: inherit; transition: all 0.3s ease;">
            </div>

            <div style="margin-bottom: 2rem;">
                <label for="password" style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #2c3e50; font-size: 0.95rem;">Fjalëkalimi</label>
                <input type="password" name="password" id="password" required placeholder="Futni fjalëkalimin" style="width: 100%; padding: 0.85rem; border: 2px solid #ecf0f1; border-radius: 8px; font-size: 1rem; font-family: inherit; transition: all 0.3s ease;">
            </div>

            <button type="submit" style="width: 100%; padding: 1rem; background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; border: none; border-radius: 8px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(42, 82, 152, 0.3);">
                <i class="fas fa-sign-in-alt" style="margin-right: 0.5rem;"></i>Hyr
            </button>
        </form>

        <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #ecf0f1; text-align: center;">
            <p style="color: #95a5a6; font-size: 0.9rem; margin: 0;">
                Nuk keni llogarë?
                <a href="../setup.php" style="color: #2a5298; text-decoration: none; font-weight: 600;">Krijoni një admin</a>
            </p>
        </div>
    </div>
</div>

</body>
</html>