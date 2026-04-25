<?php

use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../models/Orcamento.php';
require_once __DIR__ . '/../config/db.php';

class OrcamentoTest extends TestCase
{
    private $orcamento;

    protected function setUp(): void
    {
        putenv("DB_HOST=127.0.0.1");
        putenv("DB_PORT=3307");

        $database = new Database();
        $db = $database->conexao();

        $this->orcamento = new Orcamento($db);
    }

    public function testCreateOrcamento()
    {
        $data = [
            'cliente' => 'Teste Cliente',
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