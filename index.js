const express = require('express');
const cors = require('cors');
const requests = require('./requests');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.get("/hello", (req, res) => {
    res.send({ hello: "world" })
});

app.get("/api/webstersSearch/:word", (req, res) => {
  const word = req.params.word;
  requests.webstersSearch(word).then(response => {
    res.json({ response })
  })
});

app.listen(port, () => console.log(`Listening on port ${port}`));



