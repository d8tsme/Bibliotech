package com.bibliotech.api.reservas;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record DadosCadastroReserva(

        @NotNull(message = "O ID do livro é obrigatório")
        Long livroId,

        @NotNull(message = "O ID da pessoa é obrigatório")
        Long pessoaId,

        @NotNull(message = "A data da reserva é obrigatória")
        LocalDate dataReserva
) {

}
