package tn.esprit.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.backend.entity.Entreprise;

public interface EntrepriseRepository extends JpaRepository<Entreprise, Long> {
}
