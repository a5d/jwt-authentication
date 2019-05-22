<?php
require_once 'vendor/autoload.php';

use \Firebase\JWT\JWT;

function getUserList()
{
    return unserialize(file_get_contents('users.txt'));
}

function saveUserList($data)
{
    return file_put_contents('users.txt', serialize($data));
}

function isMailExists($mail)
{
    $data = getUserList();
    foreach ($data as $value) {
        if ($value['mail'] == $mail) {
            return true;
        }
    }
    return false;
}

function loginUser($mail, $password)
{
    $data = getUserList();
    foreach ($data as $value) {
        if ($value['mail'] == $mail && $value['password'] == $password) {
            $key = "example_key";
            $token = array(
                "iss" => "http://example.org",
                "mail" => $mail
            );

            $jwt = JWT::encode($token, $key);
            setcookie('jwt', $jwt, 60 * 60 * 1000, '/');
            return true;
        }
    }
    return false;
}

function insertUser($mail, $password)
{
    $data = getUserList();
    $data[] = [
        'mail' => $mail,
        'password' => $password
    ];
    saveUserList($data);
}

$reqData = explode('/', $_SERVER['REQUEST_URI'])['3'];

//регистрация
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $reqData === 'signup') {
    if (isMailExists($_POST['mail'])) {
        die('Mail exists');
    }
    insertUser($_POST['mail'], $_POST['password']);
    die('User added');
}

//логин
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $reqData === 'login') {
    if (loginUser($_POST['mail'], $_POST['password'])) {
        die('User logged');
    } else {
        die('Error');
    }
}

//логоут
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $reqData === 'logout') {
    setcookie('jwt', -1, -1, '/');
    die('Logout completed');
}

//профиль
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $reqData === 'profile') {
    $key = "example_key";

    if (empty($_COOKIE['jwt'])) {
        die('error jwt empty');
    }

    try {
        $decoded = JWT::decode($_COOKIE['jwt'], $key, array('HS256'));
        $decoded_array = (array)$decoded;


        if (isMailExists($decoded_array['mail'])) {
            die('show profile');
        } else {
            die('error');
        }
    } catch (Exception $e) {
        die('Error: ' . $e->getMessage());
    }
}