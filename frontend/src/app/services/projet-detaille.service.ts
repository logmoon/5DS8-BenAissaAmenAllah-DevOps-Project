import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjetDetaille } from '../models/projet-detaille.model';

@Injectable({ providedIn: 'root' })
export class ProjetDetailleService {
  private http = inject(HttpClient);
  private api = '/api/projet-detaille';

  getAll()                    { return this.http.get<ProjetDetaille[]>(`${this.api}/all`); }
  getById(id: number)         { return this.http.get<ProjetDetaille>(`${this.api}/get/${id}`); }
  add(p: ProjetDetaille)      { return this.http.post<ProjetDetaille>(`${this.api}/add`, p); }
  update(p: ProjetDetaille)   { return this.http.put<ProjetDetaille>(`${this.api}/update`, p); }
  delete(id: number)          { return this.http.delete<void>(`${this.api}/delete/${id}`); }
  assignToProjet(pdId: number, projetId: number) {
    return this.http.put<ProjetDetaille>(`${this.api}/assign-projet/${pdId}/${projetId}`, {});
  }
}
