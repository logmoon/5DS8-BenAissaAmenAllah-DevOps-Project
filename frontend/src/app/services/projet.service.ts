import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Projet } from '../models/projet.model';

@Injectable({ providedIn: 'root' })
export class ProjetService {
  private http = inject(HttpClient);
  private api = '/api/projet';

  getAll()              { return this.http.get<Projet[]>(`${this.api}/all`); }
  getById(id: number)   { return this.http.get<Projet>(`${this.api}/get/${id}`); }
  add(p: Projet)        { return this.http.post<Projet>(`${this.api}/add`, p); }
  update(p: Projet)     { return this.http.put<Projet>(`${this.api}/update`, p); }
  delete(id: number)    { return this.http.delete<void>(`${this.api}/delete/${id}`); }
}
