package tn.esprit.backend.service;

import tn.esprit.backend.entity.Projet;

import java.util.List;

public interface IProjetService {
    Projet addProjet(Projet projet);
    Projet updateProjet(Projet projet);
    void deleteProjet(Long id);
    Projet getProjetById(Long id);
    List<Projet> getAllProjets();
}
