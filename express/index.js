const express = require('express');
const logger = require('./middleware/logger');
const products = require('../src/resources/fixtures/products.json');
const discountCodes = require('../src/resources/fixtures/discountCodes');

const app = express();

// Init middleware
app.use(logger);

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
    // res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Gets All products
// app.get('/api/products', (req, res) => res.json(products));
app.get('/api/products', (req, res) => {
    setTimeout(() => {
        return res.json(products);
    }, 300);
});

// Gets All discountCodes
app.get('/api/discountCodes', (req, res) => {
    setTimeout(() => {
        return res.json(discountCodes);
    }, 300);
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
