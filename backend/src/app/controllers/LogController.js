import * as Yup from 'yup';
import mongoose from 'mongoose';
import User from '../models/User';
import Log from '../models/Log';

class LogController {
  async index(req, res) {
    const logs = await Log.find({});

    return res.json(logs);
  }

  async store(req, res) {
    const log = new Log(req.body);
    log.lastOccurrence.date = new Date();
    log.lastOccurrence.user = req.userId;
    log.save();

    return res.json(log);
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await Log.findByIdAndRemove(id);

      return res.json();
    } catch (err) {
      return res.status(400).json({ error: 'Error deleting log' });
    }
  }
  /*
exports.createDummyLog = (_, res) => {
  const log = new Log({
    level: 'error',
    environment: 'homologation',
    origin: '127.0.0.1',
    description: {
      title: 'Error: Cannot find module ./logs/log.route',
      stacktrace: `at Function.Module._resolveFilename (internal/modules/cjs/loader.js:581:15)
      at Function.Module._load (internal/modules/cjs/loader.js:507:25)
      at Module.require (internal/modules/cjs/loader.js:637:17)
      at require (internal/modules/cjs/helpers.js:20:18)
      at Object.<anonymous> (/codenation/desafio/squad-1-ad-react-softplan-1/src/server.js:5:14)
      at Module._compile (internal/modules/cjs/loader.js:689:30)
      at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
      at Module.load (internal/modules/cjs/loader.js:599:32)
      at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
      at Function.Module._load (internal/modules/cjs/loader.js:530:3)
      at Function.Module.runMain (internal/modules/cjs/loader.js:742:12)
      at startup (internal/bootstrap/node.js:279:19)
      at bootstrapNodeJSCore (internal/bootstrap/node.js:696:3)`,
    },
    occurrences: 5,
    lastOccurrence: {
      date: new Date(),
      user: 'Squad react',
    },
    removed: false,
    archived: false,
  });
  log.save(err => {
    if (err) res.send(err);
    res.send(log);
  });
};
*/
}

export default new LogController();
