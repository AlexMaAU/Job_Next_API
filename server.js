const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
const loginRouter = require('./routes/loginRoute');
const healthCheckRouter = require('./routes/healthCheck');
const notFoundError = require('./middleware/error/notFoundError');
const unknownErrorHandler = require('./middleware/error/errorHandler');

const port = process.env.PORT || 4040;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api', healthCheckRouter);
app.use('/api/v1', loginRouter);

app.use(notFoundError);
app.use(unknownErrorHandler);

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
