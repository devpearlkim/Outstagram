const express = require('express');
const bodyParser = require('body-parser');
const appRoute = require('./routes/route');

const app = express();
const PORT = process.env.PORT || 5000;
console.log(process.env.PORT);

app.use(bodyParser.json());
app.use('/api', appRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
