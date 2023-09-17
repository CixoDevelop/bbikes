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

if (!isset($_GET["apikey"])) {
    $response = new response("No apikey parameter in GET!", false);
    
    echo($response->parse());

    exit();
}

if (!isset($_GET["select"])) {
    $response = new response("No select parameter in GET!", false);
    
    echo($response->parse());

    exit();
}



$user = new user_database_adapter($connection);

try {
    $user->select($_GET["apikey"], $_GET["select"]);
    $response = new response($_GET["select"]);

    echo($response->parse());
} catch (Exception $exception) {
    $response = new response($exception->getMessage(), false);

    echo($response->parse());
}
?>
