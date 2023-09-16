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

function in_request (string $name) {
    if (array_key_exists($name, $_GET)) return;

    $response = new response("No ".$name." in GET!", false);
    echo($response->parse());
    
    exit();
}

in_request("login");
in_request("password");
in_request("email");

$adapter = new user_database_adapter($connection);

try {
    $key = $adapter->register(
        $_GET["login"], 
        $_GET["password"], 
        $_GET["email"]
    );

    $response = new response($key);

    echo ($response->parse());
} catch (Exception $exception) {
    $response = new response($exception->getMessage(), false);
    
    echo($response->parse());
}


?>
