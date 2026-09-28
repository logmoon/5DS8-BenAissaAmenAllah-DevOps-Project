package tn.esprit.backend.service;

import tn.esprit.backend.entity.Equipe;

import java.util.List;

public interface IEquipeService {
    Equipe addEquipe(Equipe equipe);
    Equipe updateEquipe(Equipe equipe);
    void deleteEquipe(Long id);
    Equipe getEquipeById(Long id);
    List<Equipe> getAllEquipes();
    List<Equipe> getEquipesByEntreprise(Long entrepriseId);
    Equipe assignEquipeToEntreprise(Long equipeId, Long entrepriseId);
    Equipe assignEquipeToProjet(Long equipeId, Long projetId);
}
