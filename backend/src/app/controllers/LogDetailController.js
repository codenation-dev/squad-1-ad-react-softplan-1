import mongoose from 'mongoose';
import User from '../models/User';
import Log from '../models/Log';

class LogDetailController {
  async index(req, res) {
    try {
      const { id } = req.params;
      const logs = await Log.findOne(
        {
          _id: new mongoose.Types.ObjectId(id),
        },
        ['description', 'lastOccurrence', 'origin', 'occurrences', 'level']
      );

      const user = await User.findOne(
        {
          _id: new mongoose.Types.ObjectId(req.userId),
        },
        ['name', 'email']
      );

      const { description, lastOccurrence, origin, occurrences, level } = logs;

      return res.json({
        user,
        description,
        lastOccurrence,
        origin,
        occurrences,
        level
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: 'Some thing worng to try list logs' });
    }
  }
}

export default new LogDetailController();
