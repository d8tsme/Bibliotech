package com.bibliotech.api.livros;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record DadosCadastroLivro(
        @NotBlank(message = "O título é obrigatório")
        String titulo,

        @NotNull(message = "O ID do autor é obrigatório")
        Long autor_id,

        @NotNull(message = "O ID do gênero é obrigatório")
        Long genero_id,

        @NotBlank(message = "O título é obrigatório")
        String foto,

        @NotBlank(message = "O ISBN é obrigatório")
        @Pattern(regexp = "\\d{13}|\\d{10}", message = "ISBN inválido")
        String isbn,

        @NotNull(message = "O ano de publicação é obrigatório")
        Integer ano_publicacao
) {}
