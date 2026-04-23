"use client";
import { useState } from "react";
import ListaItens from "./ListaItens";

const produtosMock = [
  { id: 1, nome: "Produto A", preco: 40 },
  { id: 2, nome: "Produto B", preco: 25 },
  { id: 3, nome: "Produto C", preco: 60 },
  { id: 4, nome: "Produto D", preco: 15 },
  { id: 5, nome: "Produto E", preco: 55 },
  { id: 6, nome: "Produto F", preco: 78 },
  { id: 7, nome: "Produto G", preco: 100 },
  { id: 8, nome: "Produto H", preco: 35 },
  { id: 9, nome: "Produto I", preco: 99 },
  { id: 10, nome: "Produto J", preco: 48 },
];

export default function FormOrcamento() {
  const [cliente, setCliente] = useState("");
  const [data, setData] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);
  const [quantidade, setQuantidade] = useState(1);
  const [produtos, setProdutos] = useState<any[]>([]);

  const adicionarItem = () => {
    if (!produtoSelecionado) return;

    const novoItem = {
      produto_id: produtoSelecionado.id,
      nome: produtoSelecionado.nome,
      quantidade,
      valor_unitario: produtoSelecionado.preco,
      subtotal: produtoSelecionado.preco * quantidade,
    };

    setProdutos([...produtos, novoItem]);
    setProdutoSelecionado(null);
    setQuantidade(1);
  };

  const total = produtos.reduce(
    (acumulador, item) => acumulador + item.subtotal,
    0
  );

  const salvarOrcamento = async () => {
    await fetch("http://localhost:8000/index.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cliente,
        data_solicitacao: data,
        produtos,
      }),
    });

    setCliente("");
    setData("");
    setProdutos([]);
  };

  return (
    <div className="space-y-4">
      <input
        placeholder="Digite nome do cliente..."
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
        className="border border-gray-300 p-2 w-full rounded-lg"
      />

      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="border border-gray-300 p-2 w-full rounded-lg"
      />

      <div className="flex gap-2">
        <select
          value={produtoSelecionado?.id || ""}
          onChange={(e) => {
            const produto = produtosMock.find(
              (p) => p.id === Number(e.target.value)
            );
            setProdutoSelecionado(produto);
          }}
          className="border border-gray-300 p-2 w-full rounded-lg"
        >
          <option value="">Selecione um produto</option>
          {produtosMock.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome} - R$ {p.preco}
            </option>
          ))}
        </select>

        <input
          type="number"
          min={1}
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
          className="border border-gray-300 p-2 w-full rounded-lg"
        />

        <input
          type="number"
          value={produtoSelecionado?.preco || 0}
          readOnly
          className="border border-gray-300 p-2 w-full rounded-lg bg-gray-100"
        />

        <button
          onClick={adicionarItem}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Adicionar
        </button>
      </div>

      <ListaItens itens={produtos} />

      <div className="text-right text-lg font-semibold bg-gray-50 p-3 rounded-lg border">
        Total:{" "}
        <span className="text-green-600">
          R${" "}
          {total.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
        </span>
      </div>

      <button
        onClick={salvarOrcamento}
        className="w-full bg-green-600 text-white py-2 rounded-lg"
      >
        Salvar Orçamento
      </button>
    </div>
  );
}