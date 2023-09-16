<?php

header("Content-Type: application/json");

require_once("enviroment_parser.php");

$env = new enviroment();
$connection = new mysqli(
    $env->get("db_host"),
    $env->get("db_login"),
    $env->get("db_password"),
    $env->get("db_database")
);

require_once("user_database.php");
require_once("response.php");

if (!isset($_GET["login"])) {
    $response = new response("No login parameter in GET!", false);
    
    echo($response->parse());

    exit();
}

if (!isset($_GET["password"])) {
    $response = new response("No password parameter in GET!", false);
    
    echo ($response->parse());

    exit();
}

$user = new user_database_adapter($connection);

try {
    $apikey = $user->login($_GET["login"], $_GET["password"]);
    $response = new response($apikey);

    echo($response->parse());
} catch (Exception $exception) {
    $response = new response($exception->getMessage(), false);

    echo($response->parse());
}
?>
