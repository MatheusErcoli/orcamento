"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [orcamentos, setOrcamentos] = useState<any[]>([]);

  const carregarOrcamentos = async () => {
    const res = await fetch("http://localhost:8000/index.php");
    const data = await res.json();
    setOrcamentos(data);
  };

  useEffect(() => {
    carregarOrcamentos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orçamentos</h1>

      <a
        href="/novo"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Novo Orçamento
      </a>

      <div className="mt-4 space-y-4">
        {orcamentos.map((o: any) => {
          const total = o.itens?.reduce(
            (total: number, item: any) => total + item.quantidade * item.preco,
            0,
          );

          return (
            <div
              key={o.id}
              className="bg-white p-4 rounded-lg shadow space-y-2"
            >
              <div className="font-semibold text-lg">{o.cliente}</div>

              <div className="text-sm text-gray-500">{o.data_solicitacao}</div>

              <div className="border-t pt-2 space-y-1">
                {o.itens?.map((item: any, index: number) => (
                  <div key={index} className="text-sm">
                    {item.produto} — {item.quantidade}x R${" "}
                    {Number(item.preco).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                ))}
              </div>

              <div className="text-right font-semibold text-green-600 bg-gray-50 p-2 rounded">
                Total: R${" "}
                {total?.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
