export class UserAlreadyExistsError extends Error{
    constructor(){
        super('Um usuário já foi cadastrado com esse email')
    }
}