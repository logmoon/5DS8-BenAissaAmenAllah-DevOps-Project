package tn.esprit.backend.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.entity.Entreprise;
import tn.esprit.backend.service.IEntrepriseService;

import java.util.List;

@RestController
@RequestMapping("/entreprise")
@AllArgsConstructor
@CrossOrigin("*")
public class EntrepriseController {

    IEntrepriseService entrepriseService;

    @PostMapping("/add")
    public Entreprise addEntreprise(@RequestBody Entreprise entreprise) {
        return entrepriseService.addEntreprise(entreprise);
    }

    @PutMapping("/update")
    public Entreprise updateEntreprise(@RequestBody Entreprise entreprise) {
        return entrepriseService.updateEntreprise(entreprise);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteEntreprise(@PathVariable Long id) {
        entrepriseService.deleteEntreprise(id);
    }

    @GetMapping("/get/{id}")
    public Entreprise getEntrepriseById(@PathVariable Long id) {
        return entrepriseService.getEntrepriseById(id);
    }

    @GetMapping("/all")
    public List<Entreprise> getAllEntreprises() {
        return entrepriseService.getAllEntreprises();
    }
}
