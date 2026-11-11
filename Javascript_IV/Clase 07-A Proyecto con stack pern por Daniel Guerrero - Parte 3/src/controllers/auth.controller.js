import { pool } from "../db.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO usuarios (name, email, password) VALUES ($1, $2, $3) RETURNING *", 
            [name, email, hashedPassword]
        );

        // Generar el token pasándole el id del usuario registrado
        const token = await createAccessToken({ id: result.rows[0].id });

       
        res.cookie("token", token, {
            httpOnly: true, // Impide el acceso a la cookie desde JavaScript en el frontend (protección XSS)
            secure: false,  // Cambiar a true en producción si usas HTTPS
            sameSite: "none", // Permite el envío de la cookie en peticiones entre dominios distintos (CORS)
            maxAge: 1000 * 60 * 60 * 24, // Tiempo de vida de la cookie (1 día en milisegundos)
        });

        // Retornar los datos del usuario recién registrado (sin incluir la contraseña)
        return res.json(result.rows[0]);
    } catch (error) {
        if (error.code === "23505") {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }
        return res.status(500).json({ message: error.message });
    }
};

export const signout = (req, res) => res.send("Cerrando sesion");

export const profile = (req, res) => res.send("Perfil de usuario");