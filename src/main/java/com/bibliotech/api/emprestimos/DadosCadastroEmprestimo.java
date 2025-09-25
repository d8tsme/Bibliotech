package com.bibliotech.api.emprestimos;

import jakarta.validation.constraints.NotNull;

public record DadosCadastroEmprestimo(

        @NotNull(message = "O ID do livro é obrigatório")
        Long livro_id,

        @NotNull(message = "O ID da pessoa é obrigatório")
        Long pessoa_id,

        @NotNull(message = "A data do empréstimo é obrigatória")
        Integer data_emprestimo,

        Integer data_devolucao
) {}
