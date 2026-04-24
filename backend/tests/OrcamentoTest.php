<?php

use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../models/Orcamento.php';

class OrcamentoTest extends TestCase
{
    private $db;
    private $orcamento;

    protected function setUp(): void
    {
        $database = new Database();
        $this->db = $database->conexao();

        $this->orcamento = new Orcamento($this->db);
    }

    public function testCreateOrcamento()
    {
        $data = [
            'cliente' => 'Teste PHPUnit',
            'data_solicitacao' => '2026-01-01'
        ];

        $id = $this->orcamento->create($data);

        $this->assertNotEmpty($id);
    }

    public function testGetAllOrcamentos()
    {
        $result = $this->orcamento->getAll();

        $this->assertIsArray($result);
    }
}