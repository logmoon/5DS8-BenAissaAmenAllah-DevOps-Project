import { Component, inject, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjetDetailleService } from '../../services/projet-detaille.service';
import { ProjetService } from '../../services/projet.service';
import { ProjetDetaille } from '../../models/projet-detaille.model';
import { Projet } from '../../models/projet.model';

@Component({
  selector: 'app-projets-detailles',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './projets-detailles.html',
  styleUrl: './projets-detailles.css'
})
export class ProjetsDetaillesComponent implements OnInit {
  private service = inject(ProjetDetailleService);
  private projetService = inject(ProjetService);

  projetsDetailles = signal<ProjetDetaille[]>([]);
  projets = signal<Projet[]>([]);
  showForm = signal(false);
  editMode = signal(false);
  selectedProjetId = signal<number | null>(null);
  current = signal<ProjetDetaille>({
    description: '', technologie: '', coutProvisoire: 0, dateDebut: ''
  });

  ngOnInit() { this.load(); this.loadProjets(); }

  load() { this.service.getAll().subscribe(data => this.projetsDetailles.set(data)); }
  loadProjets() { this.projetService.getAll().subscribe(data => this.projets.set(data)); }

  openAdd() {
    this.current.set({ description: '', technologie: '', coutProvisoire: 0, dateDebut: '' });
    this.selectedProjetId.set(null);
    this.editMode.set(false);
    this.showForm.set(true);
  }

  edit(pd: ProjetDetaille) {
    this.current.set({ ...pd });
    this.selectedProjetId.set(pd.projet?.id ?? null);
    this.editMode.set(true);
    this.showForm.set(true);
  }

  save() {
    const payload: ProjetDetaille = {
      ...this.current(),
      projet: this.selectedProjetId() ? { id: this.selectedProjetId()! } : undefined
    };
    const obs = this.editMode()
      ? this.service.update(payload)
      : this.service.add(payload);
    obs.subscribe(() => { this.load(); this.cancel(); });
  }

  delete(id: number) {
    if (confirm('Supprimer ce projet détaillé ?'))
      this.service.delete(id).subscribe(() => this.load());
  }

  cancel() { this.showForm.set(false); }

  update(field: keyof ProjetDetaille, value: string | number) {
    this.current.update(c => ({ ...c, [field]: value }));
  }
}
