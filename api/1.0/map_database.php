<?php

class map_database_adapter {
    public function __construct(mysqli $connection) {
        $this->connection = $connection;

        if ($connection->connect_error) {
            throw new Exception($connection->connect_error);
        }
    }

    public function get_all() : array {
        $query = "select id, level, length, name, tilt from maps";
        
        $binding = $this->connection->prepare($query);

        if (!$binding->execute()) {
            throw new Exception("Error while loading maps");
        }

        $result = $binding->get_result();
        $payload = [];

        while ($row = $result->fetch_assoc()) {
            array_push($payload, $row);
        }   

        return $payload;
    }

    private mysqli $connection;
}

?>
