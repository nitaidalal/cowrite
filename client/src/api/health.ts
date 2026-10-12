import { http } from './http';

export type Health = {
  status: string;
  db: string;
  uptime: number;
};

export async function getHealth(): Promise<Health> {
  const { data } = await http.get<Health>('/health');
  return data;
}
