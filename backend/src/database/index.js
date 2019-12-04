import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27018/app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

export default mongoose;
