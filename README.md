<div align="center">

# ⬡ Solana Operations Suite

**High Fidelity Validator Diagnostics & Telemetry**

![Solana](https://img.shields.io/badge/Solana-9945FF?style=for-the-badge&logo=solana&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

> An automated diagnostic suite designed to bridge the gap between protocol theory and high performance validator management. Built specifically for the 400ms block production era of the Solana Agave client.

</div>

<br>

## 🚀 System Overview

This platform acts as a digital consultant for Solana node operators. It evaluates whether proposed bare metal architecture can meet the intense hardware demands of the network, and monitors the live performance of remote endpoints. By providing clear data driven feedback, it prevents configuration errors that lead to validator delinquency and degraded cluster performance.

The application is divided into three core micro tools, each addressing a critical phase of the node lifecycle from procurement to deployment and ongoing security.

<br>

## ⚙️ Core Modules & Engineering

### 1. Hardware Procurement Advisor
Engineered to prevent capital misallocation before deployment. The tool evaluates proposed architecture constraints against Mainnet Beta requirements. Rather than implementing simple boolean checks, the rules based engine evaluates the interaction between variables. It detects complex configuration pitfalls, such as pairing NVMe storage with cloud environments susceptible to IOPS throttling. 

To bridge the gap between diagnostics and application, the engine dynamically compiles an optimised `agave-validator` bash startup script tailored to the exact hardware state, applying vital memory management flags if limited resources are detected. Operators can export these specifications directly to a JSON blob for data centre pricing quotes.

### 2. Network Telemetry & Benchmarking
A live diagnostic dashboard that pings Solana endpoints via the standard JSON RPC 2.0 protocol. To provide comparative data analysis, the frontend leverages concurrent fetch requests to benchmark a custom endpoint against the public Mainnet baseline simultaneously, preventing network waterfalls. 

Session latency is continuously mapped via Recharts to provide high frequency data visualisation. To ensure strict data portability, a DOM based generation algorithm allows operators to export raw session telemetry directly to CSV files without requiring a backend processor.

### 3. DDoS Vulnerability Auditor
Directly addressing the threat of distributed denial of service vectors within the global gossip network. The backend leverages the native Node.js `net` module to execute asynchronous TCP handshakes against the target IP. This safely probes standard RPC and PubSub ports to ensure strict firewall configurations are active before the node broadcasts its presence to the global cluster.

<br>

## 🛡️ Architecture & Security

The application utilises a modern MERN stack architecture to ensure high availability and low latency data processing.

To satisfy strict non functional security requirements and protect public infrastructure, a dual layer rate limiting architecture is actively enforced. Express middleware securely throttles backend route execution to prevent endpoint exhaustion, while React state manages strict UI cooldowns. This comprehensively mitigates the risk of inadvertent network flooding or host IP blacklisting during active penetration testing.

### Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React, Tailwind v4, Recharts | Responsive SPA with complex state management and SVG data visualisation. |
| **Backend** | Node.js, Express, Net | API routing, concurrent request handling, and TCP socket generation. |
| **Security** | express-rate-limit | Strict request throttling to protect public Solana nodes. |

<br>

## 🛠️ Local Deployment

Ensure you have Node.js v20 or higher installed. The project requires both the Express backend and Vite frontend to run simultaneously.

**1. Clone the repository**
```bash
git clone [https://github.com/AEdgecombe/solana-ops-suite.git](https://github.com/AEdgecombe/solana-ops-suite.git)
cd solana-ops-suite