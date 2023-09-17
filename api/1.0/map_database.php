<?php

class map_database_adapter {
    public function __construct(mysqli $connection) {
        $this->connection = $connection;

        if ($connection->connect_error) {
            throw new Exception($connection->connect_error);
        }
    }

    private function count(int $id) : int {
        $query = "select count(*) from users where current = ?";
        
        $binding = $this->connection->prepare($query);
        $binding->bind_param("i", $id);
        
        if (!$binding->execute()) {
            throw new Exception("Error while counting users on reoad");
        }

        $result = $binding->get_result()->fetch_assoc();

        return intval($result["count(*)"]);
    }

    public function get(int $id) : array {
        $query = "select level, length, name, tilt from maps ";
        $query .= "where id = ?";

        $binding = $this->connection->prepare($query);
        $binding->bind_param("i", $id);

        if (!$binding->execute()) {
            throw new Exception("Cannot get map by id");
        }

        $result = $binding->get_result()->fetch_assoc();

        if (empty($result)) {
            throw new Exception("Map with id ".$id." not exists");
        }

        $result["peoples"] = $this->count($id);

        return $result;
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
            $row["peoples"] = $this->count($row["id"]);
            array_push($payload, $row);
        }   

        return $payload;
    }

    private mysqli $connection;
}

?>
