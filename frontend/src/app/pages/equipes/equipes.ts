import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EquipeService } from '../../services/equipe.service';
import { EntrepriseService } from '../../services/entreprise.service';
import { Equipe } from '../../models/equipe.model';
import { Entreprise } from '../../models/entreprise.model';

@Component({
  selector: 'app-equipes',
  imports: [FormsModule],
  templateUrl: './equipes.html',
  styleUrl: './equipes.css'
})
export class EquipesComponent implements OnInit {
  private service = inject(EquipeService);
  private entrepriseService = inject(EntrepriseService);

  equipes = signal<Equipe[]>([]);
  entreprises = signal<Entreprise[]>([]);
  showForm = signal(false);
  editMode = signal(false);
  current = signal<Equipe>({ nom: '', specialite: '' });
  selectedEntrepriseId = signal<number | null>(null);

  ngOnInit() { this.load(); this.loadEntreprises(); }

  load() { this.service.getAll().subscribe(data => this.equipes.set(data)); }
  loadEntreprises() { this.entrepriseService.getAll().subscribe(data => this.entreprises.set(data)); }

  openAdd() {
    this.current.set({ nom: '', specialite: '' });
    this.selectedEntrepriseId.set(null);
    this.editMode.set(false);
    this.showForm.set(true);
  }

  edit(e: Equipe) {
    this.current.set({ ...e });
    this.selectedEntrepriseId.set(e.entreprise?.id ?? null);
    this.editMode.set(true);
    this.showForm.set(true);
  }

  save() {
    const payload: Equipe = {
      ...this.current(),
      entreprise: this.selectedEntrepriseId() ? { id: this.selectedEntrepriseId()! } : undefined
    };
    const obs = this.editMode()
      ? this.service.update(payload)
      : this.service.add(payload);
    obs.subscribe(() => { this.load(); this.cancel(); });
  }

  delete(id: number) {
    if (confirm('Supprimer cette équipe ?'))
      this.service.delete(id).subscribe(() => this.load());
  }

  cancel() { this.showForm.set(false); }

  update(field: keyof Equipe, value: string) {
    this.current.update(c => ({ ...c, [field]: value }));
  }
}
