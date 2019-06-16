<?php
// used to get mysql database connection
class Database{
 
    // specify your own database credentials
    private $host = "studmysql01.fhict.local";//"i401146.hera.fhict.nl";
    private $db_name = "dbi401146";
    private $username = "dbi401146";
    private $password = "calibra1";
    public $conn;
 
    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>