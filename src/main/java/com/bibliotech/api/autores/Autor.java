package com.bibliotech.api.autores;

import com.bibliotech.api.livros.Livro;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Table(name = "autor")
@Entity(name = "autores")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Autor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String foto;

    public Autor(DadosCadastroAutor dados) {
        this.nome = dados.nome();
        this.foto = dados.foto();
    }

    public void atualizaInformacoes(DadosAlteracaoAutor dados){
        if (dados.nome() != null) {
            this.nome = dados.nome();
        }
        if (dados.foto() != null) {
            this.foto = dados.foto();
        }
    }
}
