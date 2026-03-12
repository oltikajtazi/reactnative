<?php
require '../config.php';
require '../functions.php';

session_start();
if (isset($_SESSION['admin_id'])) {
    logAdminAction('logout', 'Admin logged out (ID '.$_SESSION['admin_id'].')');
}
session_destroy();
header('Location: login.php');
exit;
