import mongoose from 'mongoose';
import User from '../models/User';

class UserDetailsController {
  async index(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findOne(
        {
          _id: new mongoose.Types.ObjectId(id),
        },
        ['name', 'email', 'token']
      );

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}

export default new UserDetailsController();
