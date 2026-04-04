export interface IUserRepository<T, N> {
  create(body: T): Promise<void | null>
  findAll(): Promise<N[] | null>
  findById(id: string): Promise<N | null>
  findByEmail(email: string): Promise<N | null>
  update(id: string, data: object): Promise<N>
  remove(id: string): Promise<void>
}
