<?php

require_once __DIR__ . '/../models/Orcamento.php';
require_once __DIR__ . '/../models/Item.php';
require_once __DIR__ . '/../controllers/OrcamentoController.php';

$database = new Database();
$db = $database->conexao();

$controller = new OrcamentoController($db);

$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;

switch ($method) {
    case 'GET':
        $controller->index();
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $controller->create($data);
        break;
}