<?php

class ProdutoOrcamento {
    private $conexao;
    private $table = "produtoorcamento";

    public function __construct($db) {
        $this->conexao = $db;
    }

    public function create($orcamentoId, $produtos) {
        foreach ($produtos as $produto){
            $stmt = $this->conexao->prepare(
                "INSERT INTO {$this->table}
                (orcamento_id, produto, quantidade, preco)
                VALUES (?, ?, ?, ?)"
            );

            $stmt->execute([
                $orcamentoId,
                $produto['nome'],
                $produto['quantidade'],
                $produto['valor_unitario']
            ]);
        }
    }
    public function getProdutosByOrcamentoId($orcamentoId) {
        $stmt = $this->conexao->prepare(
            "SELECT * FROM {$this->table} WHERE orcamento_id=?"
        );
        $stmt->execute([$orcamentoId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}