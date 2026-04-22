<?php

class OrcamentoController{
    private $orcamento;
    private $item;

    public function __construct($db) {
        $this->orcamento = new Orcamento($db);
        $this->item = new Item($db);
    }

    public function index() {
        $data = $this->orcamento->getAll();
        echo json_encode($data);
    }

    public function create($request) {
        $orcamentoId = $this->orcamento->create($request);

        $this->item->create($orcamentoId, $request['itens']);

        echo json_encode(['message' => "Criado com sucesso"]);
    }
    
}