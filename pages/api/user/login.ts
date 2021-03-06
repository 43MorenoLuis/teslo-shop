import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { User } from '../../../models';
import { jwt } from '../../../utils';
import bcrypt from 'bcryptjs';

type Data = 
    | { msg: string }
    | {
        token: string;
        user: {
            email: string;
            name: string;
            role: string;
        }
    }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        switch (req.method) {
            case 'POST':
                return loginUser(req, res);

            default:
                res.status(400).json({
                    msg: 'Bad request'
                });
        }
    } catch (error) {
        console.log(error);
    }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { email = '', password = '' } = req.body;

    await db.connect();
    const user = await User.findOne({ email }).lean();
    await db.disconnect();

    if (!user) {
        return res.status(400).json({
            msg: 'Correo o contraseña son incorrectos'
        })
    }

    if (!bcrypt.compareSync(password, user.password!)) {
        return res.status(400).json({
            msg: 'Correo o contraseña son incorrectos'
        })
    }

    const { role, name, _id } = user;

    const token = jwt.signToken(_id, email);

    return res.status(200).json({
        token,
        user: {
            email, role, name
        }
    })
}