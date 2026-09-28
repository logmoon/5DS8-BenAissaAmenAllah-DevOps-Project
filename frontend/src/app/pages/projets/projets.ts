import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjetService } from '../../services/projet.service';
import { Projet } from '../../models/projet.model';

@Component({
  selector: 'app-projets',
  imports: [FormsModule],
  templateUrl: './projets.html',
  styleUrl: './projets.css'
})
export class ProjetsComponent implements OnInit {
  private service = inject(ProjetService);

  projets = signal<Projet[]>([]);
  showForm = signal(false);
  editMode = signal(false);
  current = signal<Projet>({ sujet: '' });

  ngOnInit() { this.load(); }

  load() { this.service.getAll().subscribe(data => this.projets.set(data)); }

  openAdd() {
    this.current.set({ sujet: '' });
    this.editMode.set(false);
    this.showForm.set(true);
  }

  edit(p: Projet) {
    this.current.set({ ...p });
    this.editMode.set(true);
    this.showForm.set(true);
  }

  save() {
    const obs = this.editMode()
      ? this.service.update(this.current())
      : this.service.add(this.current());
    obs.subscribe(() => { this.load(); this.cancel(); });
  }

  delete(id: number) {
    if (confirm('Supprimer ce projet ?'))
      this.service.delete(id).subscribe(() => this.load());
  }

  cancel() { this.showForm.set(false); }

  update(field: keyof Projet, value: string) {
    this.current.update(c => ({ ...c, [field]: value }));
  }
}
