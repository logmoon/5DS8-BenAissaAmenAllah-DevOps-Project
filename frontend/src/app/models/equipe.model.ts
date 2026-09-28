export interface Equipe {
  id?: number;
  nom: string;
  specialite: string;
  entreprise?: { id: number; nom?: string };
}
