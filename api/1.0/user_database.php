<?php

class user_database_adapter {
    public function __construct(mysqli $connection) {
        $this->connection = $connection;

        if ($connection->connect_error) {
            throw new Exception("Connect error: ".$connection->connect_error);
        }
    }

    private function apikey_exists(string $key) : bool {
        $query = "select login from users where apikey = ?";
        $binding = $this->connection->prepare($query);

        $binding->bind_param("s", $key);

        if (!$binding->execute()) {
            throw new Exception("Error checking user apikey");
        }

        $result = $binding->get_result();
      
        return !empty($result->fetch_assoc());
    }

    public function login_exists(string $login) : bool {
        $query = "select apikey from users where login = ?";
        $binding = $this->connection->prepare($query);

        $binding->bind_param("s", $login);

        if (!$binding->execute()) {
            throw new Exception("Error checking user login");
        }

        $result = $binding->get_result();
      
        return !empty($result->fetch_assoc());
 
    }

    private function generate_apikey() : string {
        $key = implode('-', str_split(
            substr(strtolower(md5(microtime().rand(1000, 9999))), 0, 30), 6
        ));
        $key = hash("sha256", $key);

        if ($this->apikey_exists($key)) return $this->generate_apikey();

        return $key;
    }

    

    public function register(
        string $login, 
        string $password, 
        string $email
    ) : string {
        $query = "insert into users(login, password, apikey, email) ";
        $query .= "values (?, ?, ?, ?)";
        $hashed = $this->password($password);    
        $apikey = $this->generate_apikey();
    
        if ($this->login_exists($login)) {
            throw new Exception("Login exists in database");
        }

        $binding = $this->connection->prepare($query);
        
        $binding->bind_param("ssss", $login, $hashed, $apikey, $email);
        
        if (!$binding->execute()) {
            throw new Exception("Error while registering!");
        }

        return $apikey;
    }

    public function login(string $login, string $password) : string {
        $query = "select apikey from users where login = ? and password = ?";
        $hashed = $this->password($password);    
    
        $binding = $this->connection->prepare($query);
        
        $binding->bind_param("ss", $login, $hashed);

        if (!$binding->execute()) {
            throw new Exception("Error while login");
        }

        $user = $binding->get_result()->fetch_assoc();

        if (empty($user)) {
            throw new Exception("User not exists or bad password");
        }

        return $user["apikey"];
    }

    public function unselect(string $apikey) {
        $query = "update users set current = NULL where apikey = ? ";

        $binding = $this->connection->prepare($query);
        $binding->bind_param("s", $apikey);

        if (!$binding->execute()) {
            throw new Exception("Error while unselecting route for user");
        }

    }

    public function select(string $apikey, int $select) {
        $query = "update users set current = ? where apikey = ? ";

        $binding = $this->connection->prepare($query);
        $binding->bind_param("is", $select, $apikey);

        if (!$binding->execute()) {
            throw new Exception("Error while selecting route for user");
        }
    }

    public function get(string $apikey) : array {
        $query = "select points, login, current, email, privileges from users ";
        $query .= "where apikey = ?";

        $binding = $this->connection->prepare($query);
        $binding->bind_param("s", $apikey);

        if (!$binding->execute()) {
            throw new Exception("Error while getting user");
        }

        $user = $binding->get_result()->fetch_assoc();

        if (empty($user)) {
            throw new Exception("User with apikey ".$apikey." not exists");
        }

        return $user;
    }

    private function password(string $payload) : string {
        return hash("sha256", $payload);
    }

    private mysqli $connection;
}

?>
