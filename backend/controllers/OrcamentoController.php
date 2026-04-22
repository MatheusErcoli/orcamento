<?php

class OrcamentoController
{
    private $orcamento;
    private $item;

    public function __construct($db)
    {
        $this->orcamento = new Orcamento($db);
        $this->item = new Item($db);
    }

    public function index()
    {
        $orcamentos = $this->orcamento->getAll();

        foreach ($orcamentos as &$orcamento) {
            $orcamento['itens'] = $this->item->getItensByOrcamentoId($orcamento['id']);
        }

        echo json_encode($orcamentos);
    }

    public function create($request)
    {
        $orcamentoId = $this->orcamento->create($request);

        $this->item->create($orcamentoId, $request['itens']);

        echo json_encode(['message' => "Criado com sucesso"]);
    }
}
