export interface IValideDto<T, R> {
	valideDto(dtoClass: new () => T, data: R): Promise<T>
}
