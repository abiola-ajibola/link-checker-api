const express = require('express');
const cors = require('cors');
const {fetcher} = require('./fetcher.js');
// const dotenv = require('dotenv');
// dotenv.config();
const PORT = process.env.PORT;

const origin_url = 'https://link-checker-react.netlify.app';

const corsOptions = {
    origin: origin_url,
    optionsSuccessStatus: 200
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.post('/', (req, res) => {
    console.log(req.body);
    fetcher(req.body.url).then((resolve) => {
        console.log(resolve)
        res.status(200).json(resolve);
        process.exit(0);
    })
    .catch ((err) => {
        res.status(500).send('Server error!')
        process.exit(1);
    })
})


app.listen(PORT, () => console.log(`API listening on port: ${PORT}`));
