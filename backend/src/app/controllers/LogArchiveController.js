import Log from '../models/Log';

class LogArchiveController {
  async update(req, res) {
    const { id } = req.params;
    const log = await Log.findByIdAndUpdate(id, { archived: true });

    const { description, lastOccurrence, origin, occurrences } = log;

    return res.json({
      description,
      lastOccurrence,
      origin,
      occurrences,
    });
  }
}

export default new LogArchiveController();
