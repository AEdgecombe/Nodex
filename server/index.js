const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'success', 
    message: 'Solana Infrastructure Optimiser API Initialised' 
  });
});

// RPC Doctor Diagnostic Route
app.post('/api/rpc-doctor', async (req, res) => {
  const { rpcUrl } = req.body;

  if (!rpcUrl) {
    return res.status(400).json({ error: 'RPC URL is required' });
  }

  const startTime = Date.now();

  try {
    // 1. Check Current Slot
    const slotResponse = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getSlot' }),
    });
    const slotData = await slotResponse.json();

    // 2. Check Node Health
    const healthResponse = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'getHealth' }),
    });
    const healthData = await healthResponse.json();

    // Calculate latency
    const latency = Date.now() - startTime;

    res.json({
      status: healthData.result === 'ok' ? 'Healthy' : 'Degraded',
      slot: slotData.result,
      latency: latency,
      message: 'Diagnostics completed successfully.'
    });

  } catch (error) {
    const failedLatency = Date.now() - startTime;
    res.status(500).json({
      status: 'Offline',
      slot: null,
      latency: failedLatency,
      error: 'Failed to connect to the RPC endpoint.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});