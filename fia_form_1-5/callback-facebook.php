<?php
session_start();
require_once 'vendor/autoload.php';

$fb = new Facebook\Facebook([
    'app_id' => '614749431096610', // Ganti dengan App ID Facebook Anda
    'app_secret' => 'b906fd69ed6fdf5fbd0169e6870a8529', // Ganti dengan App Secret Facebook Anda
    'default_graph_version' => 'v12.0',
]);

$helper = $fb->getRedirectLoginHelper();

try {
    $accessToken = $helper->getAccessToken();
    if (isset($accessToken)) {
        // Dapatkan data user
        $response = $fb->get('/me?fields=id,name,email', $accessToken);
        $user = $response->getGraphUser();

        $_SESSION['fb_access_token'] = (string) $accessToken;
        $_SESSION['fb_user'] = [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email']
        ];

        header('Location: dashboard.php');
        exit;
    }
} catch (Facebook\Exceptions\FacebookResponseException $e) {
    echo 'Graph returned an error: ' . $e->getMessage();
    exit;
} catch (Facebook\Exceptions\FacebookSDKException $e) {
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    exit;
}

// Jika tidak ada token, generate URL login
$permissions = ['email']; // Tambah permission yang diperlukan
$loginUrl = $helper->getLoginUrl('http://localhost:8000/callback-facebook.php', $permissions);
header('Location: ' . $loginUrl);