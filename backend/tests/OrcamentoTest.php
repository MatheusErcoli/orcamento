<?php

use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../models/Orcamento.php';
require_once __DIR__ . '/../config/db.php';

class OrcamentoTest extends TestCase
{
    private $db;

    protected function setUp(): void
    {
        $database = new Database();
        $this->db = $database->conexao();
    }

    public function testCreateOrcamento()
    {
        $orcamento = new Orcamento($this->db);

        $dados = [
            "cliente" => "Teste PHPUnit",
            "data_solicitacao" => "2026-01-01",
            "produtos" => []
        ];

        $resultado = $orcamento->create($dados);

        $this->assertGreaterThan(0, $resultado);
    }

    public function testGetAllOrcamentos()
    {
        $orcamento = new Orcamento($this->db);

        $resultado = $orcamento->getAll();

        $this->assertIsArray($resultado);
    }
}