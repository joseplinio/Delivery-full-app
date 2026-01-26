export interface IUserRepository<T, N> {
  create(body: T): Promise<N>
  findAll(body: T): Promise<N>
  findOne(id: string): Promise<N>
  update(id: string): Promise<N>
  remove(id: number): Promise<N>
}
