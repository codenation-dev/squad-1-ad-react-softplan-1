import * as Yup from 'yup';
import mongoose from 'mongoose';
import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      const user = await User.findOne(
        {
          _id: new mongoose.Types.ObjectId(req.userId),
        },
        ['name', 'email']
      );

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  async store(req, res) {
    console.log(req.body)
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
