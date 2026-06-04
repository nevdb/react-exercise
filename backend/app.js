import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'data');
const imagesDir = path.join(__dirname, 'images');

app.use(express.static(imagesDir));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

app.get('/places', async (req, res) => {
    try {
        const fileContent = await fs.readFile(path.join(dataDir, 'places.json'), 'utf-8');
        const placesData = JSON.parse(fileContent);
        res.status(200).json({ places: placesData });
    } catch (error) {
        res.status(500).json({ message: 'Failed to load places.' });
    }
});

app.get('/user-places', async (req, res) => {
    try {
        const fileContent = await fs.readFile(path.join(dataDir, 'user-places.json'), 'utf-8');
        const places = JSON.parse(fileContent);
        res.status(200).json({ places });
    } catch (error) {
        res.status(500).json({ message: 'Failed to load user places.' });
    }
});

app.put('/user-places', async (req, res) => {
    try {
        const places = req.body.places;
        await fs.writeFile(path.join(dataDir, 'user-places.json'), JSON.stringify(places));
        res.status(200).json({ message: 'User places updated!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save user places.' });
    }
});

// 404
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    res.status(404).json({ message: '404 - Not Found' });
});

const primaryPort = 3000;
const fallbackPort = 3001;

const server = app.listen(primaryPort, () => {
    console.log(`✅ Backend running on http://localhost:${primaryPort}`);
});

server.on('error', (error) => {
    if (error.code !== 'EADDRINUSE') {
        throw error;
    }

    console.warn(`⚠️ Port ${primaryPort} is busy. Switching to ${fallbackPort}...`);
    app.listen(fallbackPort, () => {
        console.log(`✅ Backend running on http://localhost:${fallbackPort}`);
    });
});