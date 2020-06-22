const express = require('express');
const cors = require('cors');
const {fetcher} = require('./fetcher.js');
const PORT = 4010 || process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    fetcher(req.body.url).then((resolve) => {
        console.log(resolve)
        res.status(200).json(resolve);
    })
    .catch ((err) => {
        res.status(500).send('Server error!')
    })
    // res.json('OK!')
})

app.listen(PORT, () => console.log(`API listening on port: ${PORT}`));