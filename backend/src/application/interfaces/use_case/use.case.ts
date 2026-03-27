export interface IUseCase<T, N> {
  handler(body: T): Promise<N>
}
