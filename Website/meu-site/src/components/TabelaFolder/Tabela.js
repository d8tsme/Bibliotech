// colunas = [
// { id: 'id', titulo: 'ID', nome: 'id' },
// { id: 'nome', titulo: 'Nome', nome: 'nome' },
// { id: 'descricao', titulo: 'Descrição', nome: 'descricao' }]

function Tabela({dados, colunas}) {
    return (
        <div className="Tabela">
            <h2>Lista de Itens</h2>
            <table>
                <thead>
                    <tr>
                        {colunas.map((item) => (
                        <th key={item.id}>
                            {item}
                        </th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {dados.map((item, index) => (
                        <tr key={item.id}>
                            {colunas.map((coluna) => (
                                <td key={coluna.id}>{coluna.nome == "foto" ? <td><img src={item.foto} alt={item.nome} width="50"/></td> :item[coluna.nome]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Tabela;
