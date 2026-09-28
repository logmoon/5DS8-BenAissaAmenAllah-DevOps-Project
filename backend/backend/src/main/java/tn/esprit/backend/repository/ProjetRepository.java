package tn.esprit.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.backend.entity.Projet;

public interface ProjetRepository extends JpaRepository<Projet, Long> {
}
