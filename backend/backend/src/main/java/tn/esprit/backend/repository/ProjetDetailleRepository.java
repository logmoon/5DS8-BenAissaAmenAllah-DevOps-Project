package tn.esprit.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.backend.entity.ProjetDetaille;

import java.util.List;

public interface ProjetDetailleRepository extends JpaRepository<ProjetDetaille, Long> {
    List<ProjetDetaille> findByProjetId(Long projetId);
}
