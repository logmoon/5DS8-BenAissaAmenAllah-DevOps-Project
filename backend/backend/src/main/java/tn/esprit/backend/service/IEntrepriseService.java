package tn.esprit.backend.service;

import tn.esprit.backend.entity.Entreprise;

import java.util.List;

public interface IEntrepriseService {
    Entreprise addEntreprise(Entreprise entreprise);
    Entreprise updateEntreprise(Entreprise entreprise);
    void deleteEntreprise(Long id);
    Entreprise getEntrepriseById(Long id);
    List<Entreprise> getAllEntreprises();
}
