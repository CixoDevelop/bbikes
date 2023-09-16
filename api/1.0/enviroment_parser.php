<?php

class enviroment {
    public function __construct(string $name = ".env") {
        $this->config = parse_ini_file($name);
    }

    public function get(string $what) : string {
        return $this->config[$what];
    }

    private array $config;
}

?>
