package tn.esprit.backend.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.entity.Projet;
import tn.esprit.backend.entity.ProjetDetaille;
import tn.esprit.backend.repository.ProjetDetailleRepository;
import tn.esprit.backend.repository.ProjetRepository;
import tn.esprit.backend.service.IProjetDetailleService;

import java.util.List;

@Service
@AllArgsConstructor
public class ProjetDetailleServiceImpl implements IProjetDetailleService {

    ProjetDetailleRepository projetDetailleRepository;
    ProjetRepository projetRepository;

    @Override
    public ProjetDetaille addProjetDetaille(ProjetDetaille projetDetaille) {
        return projetDetailleRepository.save(projetDetaille);
    }

    @Override
    public ProjetDetaille updateProjetDetaille(ProjetDetaille projetDetaille) {
        return projetDetailleRepository.save(projetDetaille);
    }

    @Override
    public void deleteProjetDetaille(Long id) {
        projetDetailleRepository.deleteById(id);
    }

    @Override
    public ProjetDetaille getProjetDetailleById(Long id) {
        return projetDetailleRepository.findById(id).orElse(null);
    }

    @Override
    public List<ProjetDetaille> getAllProjetsDetailles() {
        return projetDetailleRepository.findAll();
    }

    @Override
    public List<ProjetDetaille> getProjetDetaillesByProjet(Long projetId) {
        return projetDetailleRepository.findByProjetId(projetId);
    }

    @Override
    public ProjetDetaille assignProjetDetailleToProjet(Long projetDetailleId, Long projetId) {
        ProjetDetaille projetDetaille = projetDetailleRepository.findById(projetDetailleId).orElse(null);
        Projet projet = projetRepository.findById(projetId).orElse(null);
        projetDetaille.setProjet(projet);
        return projetDetailleRepository.save(projetDetaille);
    }
}
