export interface IServiceReader<T> {
  getAllTeams(): Promise<T[]>;
  getTeamById(id: number): Promise<T | null>
}
