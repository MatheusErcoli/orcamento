export default function ListaItens({ itens }: any) {
  return (
    <div>
      {itens.map((produto: any, i: number) => (
        <div key={i} className="flex justify-between border-b py-1">
          <span>{produto.nome}</span>

          <span>
            {produto.quantidade} x R$ {" "}
            {produto.valor_unitario.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })} = R$ {" "}
            {produto.subtotal.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      ))}
    </div>
  );
}