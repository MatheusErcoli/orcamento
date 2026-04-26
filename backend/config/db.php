<?php

class Database
{
    public function conexao()
    {
        $host = getenv("DB_HOST") ?: "mysql";
        $port = getenv("DB_PORT") ?: "3306";
        $db   = "orcamento";
        $user = "root";
        $pass = "root";

        try {
            $conexao = new PDO(
                "mysql:host=$host;port=$port;dbname=$db",
                $user,
                $pass
            );

            $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conexao;

        } catch (PDOException $e) {
            echo "Erro de conexão: " . $e->getMessage();
            return null;
        }
    }
}