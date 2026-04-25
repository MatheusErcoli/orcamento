<?php

class Database
{
    private $db_name = "orcamento";
    private $username = "root";
    private $password = "root";

    public function conexao()
    {
        $conexao = null;

        $host = getenv('DB_HOST') ?: 'mysql';
        $port = getenv('DB_PORT') ?: '3306';

        try {
            $conexao = new PDO(
                "mysql:host=$host;port=$port;dbname={$this->db_name}",
                $this->username,
                $this->password
            );

            $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        } catch (PDOException $e) {
            echo "Erro de conexão: " . $e->getMessage();
        }

        return $conexao;
    }
}