<?php

class OrcamentoController
{
    private $orcamento;
    private $produtoOrcamento;

    public function __construct($db)
    {
        $this->orcamento = new Orcamento($db);
        $this->produtoOrcamento= new ProdutoOrcamento($db);
    }

    public function index()
{
    $orcamentos = $this->orcamento->getAll();

    foreach ($orcamentos as &$orcamento) {
        $orcamento['produtos'] = $this->produtoOrcamento->getProdutosByOrcamentoId($orcamento['id']);
    }

    echo json_encode($orcamentos);
}

    public function create($request)
    {
        $orcamentoId = $this->orcamento->create($request);

        $this->produtoOrcamento->create($orcamentoId, $request['produtos']);

        echo json_encode(['message' => "Criado com sucesso"]);
    }
}
