import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Entreprise } from '../models/entreprise.model';

@Injectable({ providedIn: 'root' })
export class EntrepriseService {
  private http = inject(HttpClient);
  private api = '/api/entreprise';

  getAll()            { return this.http.get<Entreprise[]>(`${this.api}/all`); }
  getById(id: number) { return this.http.get<Entreprise>(`${this.api}/get/${id}`); }
  add(e: Entreprise)  { return this.http.post<Entreprise>(`${this.api}/add`, e); }
  update(e: Entreprise) { return this.http.put<Entreprise>(`${this.api}/update`, e); }
  delete(id: number)  { return this.http.delete<void>(`${this.api}/delete/${id}`); }
}
