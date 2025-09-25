package com.bibliotech.api.emprestimos;

import com.bibliotech.api.livros.Livro;
import com.bibliotech.api.pessoas.Pessoa;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.EqualsAndHashCode;

@Table(name = "emprestimo")
@Entity(name = "emprestimos")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Emprestimo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer data_emprestimo;
    private Integer data_devolucao;

    @ManyToOne
    @JoinColumn(name = "livro_id")
    private Livro livro;

    // Relacionamento ManyToOne para pessoa
    @ManyToOne
    @JoinColumn(name = "pessoa_id") // A coluna da chave estrangeira na tabela 'emprestimo'
    private Pessoa pessoa;

    // Construtor para cadastro
    public Emprestimo(DadosCadastroEmprestimo dados, Livro livro, Pessoa pessoa) {
        this.data_emprestimo = dados.data_emprestimo();
        this.data_devolucao = dados.data_devolucao();
        this.livro = livro;
        this.pessoa = pessoa;
    }


    // Métodos de atualização e outros (adaptados para incluir o pessoa)
    public void atualizaInformacoes(DadosAlteracaoEmprestimo dados, Livro novoLivro, Pessoa novoPessoa) {
        if (dados.data_emprestimo() != 0) {
            this.data_emprestimo = dados.data_emprestimo();
        }
        if (novoLivro != null) {
            this.livro = novoLivro;
        }
        if (novoPessoa != null) {
            this.pessoa = novoPessoa;
        }
        this.data_devolucao = dados.data_devolucao();
    }
}
