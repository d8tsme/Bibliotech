package com.bibliotech.api.livros;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.springframework.web.multipart.MultipartFile;

public record DadosCadastroLivroComFoto(
        @NotBlank(message = "O título é obrigatório")
        String titulo,

        int paginas,

        @NotNull(message = "O ID do autor é obrigatório")
        Long autorId,

        @NotNull(message = "O ID do gênero é obrigatório")
        Long generoId,

        MultipartFile foto,

        @NotBlank(message = "O ISBN é obrigatório")
        @Pattern(regexp = "\\d{13}|\\d{10}", message = "ISBN inválido")
        String isbn,

        int anoPublicacao
) {}
