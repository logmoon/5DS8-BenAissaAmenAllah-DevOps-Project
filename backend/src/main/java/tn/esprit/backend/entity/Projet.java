package tn.esprit.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projets")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Projet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sujet;

    @JsonIgnore
    @ManyToMany(mappedBy = "projets")
    private List<Equipe> equipes = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "projet", fetch = FetchType.LAZY)
    private List<ProjetDetaille> projetsDetailles = new ArrayList<>();
}
