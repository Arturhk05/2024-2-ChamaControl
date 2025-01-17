import UserRepository from "../repositories/UserRepository.js";
import UserService from './UserService.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default class AuthService {
    constructor() {
        this.userRepository = new UserRepository();
        this.userService = new UserService();
    }

    async login(loginDTO) {
        const { email, senha } = loginDTO;

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Usuário ou senha inválidos.');
        }

        const senhaValida = await this.userService.checkPassword(senha, user.senha);
        if (!senhaValida) {
            throw new Error('Usuário ou senha inválidos.');
        }

        const token = jwt.sign({
            id: user.idUsuario,
            nome: user.nome,
            email: user.email,
            eAdmin: user.eAdmin
        },
        process.env.SECRET_KEY,
        { expiresIn: process.env.TOKEN_EXPIRATION });

        return token;
    }
}