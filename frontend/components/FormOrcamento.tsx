"use client";
import { useState } from "react";
import ListaItens from "./ListaItens";

export default function FormOrcamento() {
  const [cliente, setCliente] = useState("");
  const [data, setData] = useState("");
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [preco, setPreco] = useState(0);
  const [itens, setItens] = useState<any[]>([]);

  const adicionarItem = () => {
    if (!produto) return;

    setItens([...itens, { produto, quantidade, preco }]);
    setProduto("");
    setQuantidade(1);
    setPreco(0);
  };

  const total = itens.reduce(
    (acumulador, item) => acumulador + item.quantidade * item.preco,
    0,
  );

  const formatDateToYYYYMMDD = (value: string) => {
    if (!value) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  };

  const salvarOrcamento = async () => {
    const dataSolicitacao = formatDateToYYYYMMDD(data);

    await fetch("http://localhost:8000/index.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cliente,
        data_solicitacao: dataSolicitacao,
        itens,
      }),
    });
    setCliente("");
    setData("");
    setItens([]);
  };

  return (
    <div className="space-y-4">
      <input
        placeholder="Digite nome do cliente..."
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
        className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-2">
        <input
          placeholder="Digite o produto..."
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
          className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          value={preco}
          onChange={(e) => setPreco(Number(e.target.value))}
          className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={adicionarItem}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Adicionar
        </button>
      </div>
      <ListaItens itens={itens} />

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
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
      >
        Salvar Orçamento
      </button>
    </div>
  );
}
