<?php
require __DIR__ . '/vendor/autoload.php';

session_start();

// Konfigurasi Google Client
$client_id = "471414369622-lgm77qf780cbnc02ggq74vo4v2280914.apps.googleusercontent.com";
$client_secret = "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";
$redirect_uri = "http://localhost/fia_form_1-5/google.php";

// Inisialisasi Google Client
$client = new Google\Client();
$client->setClientId($client_id);
$client->setClientSecret($client_secret);
$client->setRedirectUri($redirect_uri);
$client->addScope("email");
$client->addScope("profile");

// Tangani proses login
if (!isset($_GET['code'])) {
    // Redirect ke halaman login Google
    $auth_url = $client->createAuthUrl();
    header('Location: ' . filter_var($auth_url, FILTER_SANITIZE_URL));
    exit();
} else {
    // Tukar kode otorisasi dengan token akses
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    $client->setAccessToken($token);

    // Ambil data pengguna
    $google_service = new Google\Service\Oauth2($client);
    $user_info = $google_service->userinfo->get();

    // Simpan data pengguna ke sesi atau database
    $_SESSION['user'] = $user_info;

    // Redirect ke halaman selamat datang atau halaman lain
    header('Location: welcome.php');
    exit();
}
?>