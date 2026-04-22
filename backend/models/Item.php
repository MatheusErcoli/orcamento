<?php

class Item {
    private $conexao;
    private $table = "itens";

    public function __construct($db) {
        $this->conexao = $db;
    }

    public function create($orcamentoId, $itens) {
        foreach ($itens as $item){
            $stmt = $this->conexao->prepare(
                "INSERT INTO {$this->table}
                (orcamento_id, produto, quantidade, preco)
                VALUES (?, ?, ?, ?)"
            );

            $stmt->execute([
                $orcamentoId,
                $item['produto'],
                $item['quantidade'],
                $item['preco']
            ]);
        }
    }
    public function getItensByOrcamentoId($orcamentoId) {
        $stmt = $this->conexao->prepare(
            "SELECT * FROM {$this->table} WHERE orcamento_id=?"
        );
        $stmt->execute([$orcamentoId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}