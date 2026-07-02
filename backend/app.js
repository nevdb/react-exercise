import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import bodyParser from 'body-parser';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'data');
const imagesDir = path.join(__dirname, 'images');
const opinionsFile = path.join(dataDir, 'opinions.json');

async function loadOpinions() {
    try {
        const dbFileData = await fs.readFile(opinionsFile);
        const parsedData = JSON.parse(dbFileData);
        return parsedData.opinions;
    } catch (error) {
        return [];
    }
}

async function saveOpinion(opinion) {
    const opinions = await loadOpinions();
    const newOpinion = { id: new Date().getTime(), votes: 0, ...opinion };
    opinions.unshift(newOpinion);
    const dataToSave = { opinions };
    await fs.writeFile(opinionsFile, JSON.stringify(dataToSave, null, 2));
    return newOpinion;
}

async function upvoteOpinion(id) {
    const opinions = await loadOpinions();
    const opinion = opinions.find((o) => o.id === id);
    if (!opinion) {
        return null;
    }
    opinion.votes++;
    await fs.writeFile(opinionsFile, JSON.stringify({ opinions }, null, 2));
    return opinion;
}

async function downvoteOpinion(id) {
    const opinions = await loadOpinions();
    const opinion = opinions.find((o) => o.id === id);
    if (!opinion) {
        return null;
    }
    opinion.votes--;
    await fs.writeFile(opinionsFile, JSON.stringify({ opinions }, null, 2));
    return opinion;
}

const app = express();

app.use(express.static(imagesDir));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS, DELETE');
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

//OPTIONS

app.use(express.json());

app.get('/opinions', async (req, res) => {
    try {
        const opinions = await loadOpinions();
        res.json(opinions);
    } catch (error) {
        res.status(500).json({ error: 'Error loading opinions.' });
    }
});

app.post('/opinions', async (req, res) => {
    const { userName, title, body } = req.body;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!userName || !title || !body) {
        return res
            .status(400)
            .json({ error: 'User name, title and opinion body are required.' });
    }
    try {
        const newOpinion = await saveOpinion({ userName, title, body });
        res.status(201).json(newOpinion);
    } catch (error) {
        res.status(500).json({ error: 'Error saving opinion.' });
    }
});

app.post('/opinions/:id/upvote', async (req, res) => {
    const { id } = req.params;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
        const opinion = await upvoteOpinion(Number(id));
        if (!opinion) {
            return res.status(404).json({ error: 'Opinion not found.' });
        }
        res.json(opinion);
    } catch (error) {
        res.status(500).json({ error: 'Error upvoting opinion.' });
    }
});

app.post('/opinions/:id/downvote', async (req, res) => {
    const { id } = req.params;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
        const opinion = await downvoteOpinion(Number(id));
        if (!opinion) {
            return res.status(404).json({ error: 'Opinion not found.' });
        }
        res.json(opinion);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error downvoting opinion.' });
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

const server = app.listen(primaryPort, () => {
    console.log(`✅ Backend running on http://localhost:${primaryPort}`);
});

server.on('error', (error) => {
    if (error.code !== 'EADDRINUSE') {
        throw error;
    }

    console.error(`❌ Port ${primaryPort} is already in use.`);
    console.error(`Stop the process using port ${primaryPort}, then restart the backend.`);
    console.error('On Windows PowerShell:');
    console.error(`Get-NetTCPConnection -LocalPort ${primaryPort} -State Listen`);
    console.error('Then:');
    console.error('Stop-Process -Id <PID> -Force');
    process.exit(1);
});