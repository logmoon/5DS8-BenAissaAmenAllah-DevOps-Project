export interface ProjetDetaille {
  id?: number;
  description: string;
  technologie: string;
  coutProvisoire: number;
  dateDebut: string;
  projet?: { id: number };
}
