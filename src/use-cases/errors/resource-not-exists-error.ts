export class ResourceNotExistsError extends Error{
    constructor(){
        super('Recurso não existente')
    }
}