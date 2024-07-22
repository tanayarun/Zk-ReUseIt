const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { Reclaim } = require('@reclaimprotocol/js-sdk'); // Ensure correct import

const app = express();
const port = 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins

// Root route
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/callback/', async (req, res) => {
  try {
    const proof = req.body; // Ensure body is correctly parsed

    // Proof verification logic
    const isProofVerified = await ReclaimClient.verifySignedProof(proof);
    if (!isProofVerified) {
      return res.status(400).send({ message: 'Proof verification failed' });
    }

    return res.status(200).send({ message: 'Proof verified' });
  } catch (error) {
    console.error('Error in /callback/:', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
app.options('*', cors()); // Allow preflight requests for all routes
