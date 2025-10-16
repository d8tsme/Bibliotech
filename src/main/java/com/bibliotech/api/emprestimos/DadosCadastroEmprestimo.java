package com.bibliotech.api.emprestimos;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record DadosCadastroEmprestimo(

        @NotNull(message = "O ID do livro é obrigatório")
        Long livroId,

        @NotNull(message = "O ID da pessoa é obrigatório")
        Long pessoaId
) {}
