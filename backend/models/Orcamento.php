<?php

class Orcamento
{
    private $conexao;
    private $table = "orcamentos";

    public function __construct($db)
    {
        $this->conexao = $db;
    }

    public function getAll()
    {
        $stmt = $this->conexao->query("SELECT * FROM {$this->table}");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($data)
    {
        $stmt = $this->conexao->prepare(
            "INSERT INTO {$this->table} (cliente, data_solicitacao) values (?, ?)"
        );
        $stmt->execute([
            $data['cliente'],
            $data['data']
        ]);

        return $this->conexao->lastInsertId();
    }
}
