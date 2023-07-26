const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
const authRouter = require('./routes/authRoute');
const jobsRouter = require('./routes/jobsRoute');
const healthCheckRouter = require('./routes/healthCheck');
const notFoundError = require('./middleware/error/notFoundError');
const unknownErrorHandler = require('./middleware/error/errorHandler');
const connectToDB = require('./utils/db');
const tokenValidation = require('./middleware/authGuard');

const port = process.env.PORT || 4040;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/health', tokenValidation, healthCheckRouter);
app.use('/api/v1/users', authRouter);
app.use('/api/v1/jobs', jobsRouter);

app.use(notFoundError);
app.use(unknownErrorHandler);

connectToDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running at ${port}`);
    });
  })
  .catch((err) => console.log(err));
