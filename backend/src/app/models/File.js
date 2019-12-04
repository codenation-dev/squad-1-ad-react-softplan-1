import mongoose from '../../database';

const FileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const File = mongoose.model('File', FileSchema);

export default File;
