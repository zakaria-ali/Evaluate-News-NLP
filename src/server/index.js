var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const cors = require('cors');
const axios = require('axios');

app.use(cors());
app.use(bodyParser.json());

console.log(__dirname);

// MeaningCloud API variables
const apiURL = 'https://api.meaningcloud.com/sentiment-2.1';
const apiKey = process.env.API_KEY; 

// Serve static files from the dist directory
app.use(express.static('dist'))


app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist', 'index.html'));
});


// POST Route to handle URL and fetch data from MeaningCloud

app.post('/api', async (req, res) => {
    const { url } = req.body;

    try {
        const response = await axios.post(apiURL, null, {
            params: {
                key: apiKey,
                url: url,
                lang: 'en' // You can specify the language of the content here
            }
        });
        console.log('MeaningCloud response:', response.data); // Debugging: log the API response

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from MeaningCloud:', error.response ? error.response.data : error.message);
        res.status(500).send('Error fetching data from MeaningCloud.');
    }
});




// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});


