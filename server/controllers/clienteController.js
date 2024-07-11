import { validateCliente, validateClienteLogin } from "../schemas/clienteSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'this-is-an-awesome-secret-key-tiene-que-ser-mas-largo';


export class ClienteController {
    constructor({ clienteModel }) {
        this.clienteModel = clienteModel;
    }
    
    login = async (req, res) => {
        const result = validateClienteLogin(req.body)
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        
        const { username, contraseña } = result.data;
        
        try {
            const existingUser = await this.clienteModel.getByName({ username });

            if (!existingUser) {
                return res.status(404).json({ error: 'El nombre de usuario no existe' });
            }

            // Verificar la contraseña
            const isPasswordValid = bcrypt.compareSync(contraseña, existingUser.contraseña);

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Contraseña incorrecta' });
            }

            const token = jwt.sign(
                { clienteID: existingUser.clienteID, username: existingUser.username },
                JWT_SECRET,
                { expiresIn: '1h' }
              );
              
              res.cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Asegúrate de que sea true en producción
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60
              });
              
              res.status(200).json({
                message: 'Inicio de sesión exitoso',
                user: { id: existingUser.clienteID, username: existingUser.username, email: existingUser.email }
              });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    create = async (req, res) => {
        const result = validateCliente(req.body);
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }

        const { username, email, contraseña } = result.data;

        try {
            const existingUser = await this.clienteModel.getByName({ username });
            const existingEmail = await this.clienteModel.getByEmail({ email });

            if (existingUser) {
                return res.status(409).json({ error: 'El nombre de usuario ya está en uso' });
            }

            if (existingEmail) {
                return res.status(409).json({ error: 'El email ya está en uso' });
            }

            // Cifrar la contraseña
            const hashedPassword = bcrypt.hashSync(contraseña, 10);

            // Crear el nuevo cliente con la contraseña cifrada
            const newClienteData = {
                username,
                email,
                contraseña: hashedPassword
            };
            
            await this.clienteModel.create({ input: newClienteData });
            res.status(201).json({ 
                message: 'Cliente creado exitosamente',
            });
        } catch (error) {
            console.error('Error creating client:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    logout = async (req, res) => {
        res.clearCookie('access_token');
        res.status(200).json({ message: 'Cierre de sesión exitoso' });
    }

    getUser = async (req, res) => {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        try {
            const data = jwt.verify(token, JWT_SECRET);
            const user = await this.clienteModel.getById({ clienteID: data.clienteID });
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.status(200).json( {user, token});
        } catch {
            return res.status(401).json({ error: 'Invalid token' });
        }
    }

    GetByHistory = async (req, res) => {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        try {
            const data = jwt.verify(token, JWT_SECRET);
            const user = await this.clienteModel.GetByHistory({ clienteID: data.clienteID });
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.status(200).json(user);
        } catch {
            return res.status(401).json({ error: 'Invalid token' });
        }
    }

}
