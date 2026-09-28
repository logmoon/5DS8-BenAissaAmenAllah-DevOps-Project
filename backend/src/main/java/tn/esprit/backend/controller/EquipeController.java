package tn.esprit.backend.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.entity.Equipe;
import tn.esprit.backend.service.IEquipeService;

import java.util.List;

@RestController
@RequestMapping("/equipe")
@AllArgsConstructor
@CrossOrigin("*")
public class EquipeController {

    IEquipeService equipeService;

    @PostMapping("/add")
    public Equipe addEquipe(@RequestBody Equipe equipe) {
        return equipeService.addEquipe(equipe);
    }

    @PutMapping("/update")
    public Equipe updateEquipe(@RequestBody Equipe equipe) {
        return equipeService.updateEquipe(equipe);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteEquipe(@PathVariable Long id) {
        equipeService.deleteEquipe(id);
    }

    @GetMapping("/get/{id}")
    public Equipe getEquipeById(@PathVariable Long id) {
        return equipeService.getEquipeById(id);
    }

    @GetMapping("/all")
    public List<Equipe> getAllEquipes() {
        return equipeService.getAllEquipes();
    }

    @GetMapping("/by-entreprise/{entrepriseId}")
    public List<Equipe> getEquipesByEntreprise(@PathVariable Long entrepriseId) {
        return equipeService.getEquipesByEntreprise(entrepriseId);
    }

    @PutMapping("/assign-entreprise/{equipeId}/{entrepriseId}")
    public Equipe assignEquipeToEntreprise(@PathVariable Long equipeId, @PathVariable Long entrepriseId) {
        return equipeService.assignEquipeToEntreprise(equipeId, entrepriseId);
    }

    @PutMapping("/assign-projet/{equipeId}/{projetId}")
    public Equipe assignEquipeToProjet(@PathVariable Long equipeId, @PathVariable Long projetId) {
        return equipeService.assignEquipeToProjet(equipeId, projetId);
    }
}
