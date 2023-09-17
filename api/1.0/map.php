<?php

require_once("enviroment_parser.php");
require_once("map_database.php");

$env = new enviroment();
$connection = new mysqli(
    $env->get("db_host"),
    $env->get("db_login"),
    $env->get("db_password"),
    $env->get("db_database")
);

$map = new map_database_adapter($connection);

require_once("response.php");

if ($_GET["action"] = "get_all") {
    $response = new response($map->get_all());
    
    echo($response->parse());
}

?>
