import Log from '../models/Log';

class LogController {
  async index(req, res) {
    try {
      const logs = await Log.find({ removed: false, archived: false }, [
        'id',
        'environment',
        'level',
        'description',
        'origin',
        'occurrences',
        'lastOccurrence'
      ]);

      return res.json(logs);
    } catch (err) {
      return res
        .status(500)
        .json({ error: 'Some thing wrong to try list logs' });
    }
  }

  async store(req, res) {
    try {
      const log = new Log(req.body);
      log.lastOccurrence.date = new Date();
      log.lastOccurrence.user = req.userId;
      log.save();

      return res.json(log);
    } catch (err) {
      return res.status(500).json({ error: 'Error when try save' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await Log.findByIdAndUpdate(id, { removed: true });

      return res.json();
    } catch (err) {
      return res.status(500).json({ error: 'Error deleting log' });
    }
  }
}

export default new LogController();
