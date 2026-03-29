export type Incident = {
  id: number;
  headline: string;
  mainCategory: string;
  region: string;
  mainStreet: string;
  crossStreet?: string;
  created: string | number;
  adviceA: string;
};
