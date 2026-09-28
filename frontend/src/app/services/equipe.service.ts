import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Equipe } from '../models/equipe.model';

@Injectable({ providedIn: 'root' })
export class EquipeService {
  private http = inject(HttpClient);
  private api = '/api/equipe';

  getAll()              { return this.http.get<Equipe[]>(`${this.api}/all`); }
  getById(id: number)   { return this.http.get<Equipe>(`${this.api}/get/${id}`); }
  add(e: Equipe)        { return this.http.post<Equipe>(`${this.api}/add`, e); }
  update(e: Equipe)     { return this.http.put<Equipe>(`${this.api}/update`, e); }
  delete(id: number)    { return this.http.delete<void>(`${this.api}/delete/${id}`); }
  assignToEntreprise(equipeId: number, entrepriseId: number) {
    return this.http.put<Equipe>(`${this.api}/assign-entreprise/${equipeId}/${entrepriseId}`, {});
  }
}
