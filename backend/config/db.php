<?php

class Database {
    private $host = "localhost";
    private $db_name = "orcamento_app";
    private $username = "root";
    private $password = "";

    public function conexao(){
        $conexao = null;

        try {
            $conexao = new PDO("mysql:host={$this->host};dbname={$this->db_name}", $this->username, $this->password);
            $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo "Erro de conexão: " . $e->getMessage();
        }

        return $conexao;
    }
}