export default function ListaItens({ itens }: any) {
    return (
        <div>
            {itens.map((item: any, i: number) => (
                <div key={i} className="flex justify-between border-b py-1">
                    <span>{item.produto}</span>
                    <span>
                        {item.quantidade} X {item.preco} ={" "}
                        {item.quantidade * item.preco}
                    </span>
                </div>
            ))}
        </div>
    )
}