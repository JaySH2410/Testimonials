import * as UserServices from '../Services/UserServices.js';

export async function GetAllUsers(req, res) {
    try {
        const allUsers = await UserServices.GetAllUsers();
        return res.json(allUsers);
    }
    catch (err) {
        console.log(err);
    }
}

export async function CreateUser(req, res) {
    const { name, email, picture } = req.body;
    try {
        const newUser = await UserServices.CreateUser(name, email, picture);
        return res.status(201).json({
            message: 'User created',
            id: newUser[0].id,
            name: newUser[0].name,
            email: newUser[0].email,
            picture: newUser[0].picture
        });
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to create user' });
    }
}

export async function ExistingUser(req, res) {
    const { email } = req.query;
    try {
        console.log();

        const existingUser = await UserServices.ExistingUser(email);
        const status = existingUser[0].count === 1 ? true : false;
        var response = {
            status: status,
            userId: existingUser[0].userId
        };
        // if (status.status === true) {
        //     const userId = existingUser[0].id;
        //     response = {
        //         status: status,
        //         userId: userId
        //     }
        // }
        console.log(response);
        
        return res.json(response)
    }
    catch {
        return res.status(500).json({ error: 'Some error occured' });
    }
}

export async function GetUserDetailsByEmail(req, res) {
    const { email } = req.query;
    try {
        const user = await UserServices.GetUserDetailsByEmail(email);
        return res.json(user)
    }
    catch {
        return res.status(500).json({ error: 'Some error occured' });
    }
}