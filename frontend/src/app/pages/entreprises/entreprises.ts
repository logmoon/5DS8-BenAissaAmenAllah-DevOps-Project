import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EntrepriseService } from '../../services/entreprise.service';
import { Entreprise } from '../../models/entreprise.model';

@Component({
  selector: 'app-entreprises',
  imports: [FormsModule],
  templateUrl: './entreprises.html',
  styleUrl: './entreprises.css'
})
export class EntreprisesComponent implements OnInit {
  private service = inject(EntrepriseService);

  entreprises = signal<Entreprise[]>([]);
  showForm = signal(false);
  editMode = signal(false);
  current = signal<Entreprise>({ nom: '', adresse: '' });

  ngOnInit() { this.load(); }

  load() {
    this.service.getAll().subscribe(data => this.entreprises.set(data));
  }

  openAdd() {
    this.current.set({ nom: '', adresse: '' });
    this.editMode.set(false);
    this.showForm.set(true);
  }

  edit(e: Entreprise) {
    this.current.set({ ...e });
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
    if (confirm('Supprimer cette entreprise ?'))
      this.service.delete(id).subscribe(() => this.load());
  }

  cancel() { this.showForm.set(false); }

  update(field: keyof Entreprise, value: string) {
    this.current.update(c => ({ ...c, [field]: value }));
  }
}
