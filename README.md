# Solana Infrastructure Optimiser (UP2124153)

![Solana](https://img.shields.io/badge/Solana-9945FF?style=for-the-badge&logo=solana&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

An automated diagnostic suite designed to bridge the gap between protocol theory and high-performance validator management. Built specifically for the **400ms block production era** of the Solana Agave client.

## 🚀 What it Does

This platform acts as a digital consultant for Solana node operators. It evaluates whether a machine is capable of meeting the intense hardware demands of the network and monitors the live performance of RPC (Remote Procedure Call) nodes. By providing clear, data-driven feedback, it prevents configuration errors that lead to "delinquency" or poor cluster performance.

### Core Modules

* **Config Advisor:** A rules-based engine that benchmarks user-provided hardware specs (CPU cores, RAM capacity, and Disk IOPS) against current Mainnet-Beta requirements. 
* **RPC Doctor:** A live diagnostic tool that pings Solana endpoints to measure slot lag, version consistency, and network latency.
* **Performance Dashboard:** A unified interface providing a "health score" based on the synthesis of hardware and network data.

---

## 🛠️ System Architecture

The application uses a modern **MERN Stack** to ensure high availability and low-latency data processing.

* **Frontend (React & Tailwind v4):** A responsive, dark-mode SPA (Single Page Application) that handles data visualisation and user input.
* **Backend (Node.js & Express):** The logic layer that processes hardware rules and communicates with the Solana JSON-RPC API.
* **Database (MongoDB):** Stores historical benchmarking data to allow for community-wide hardware performance comparisons.

---

## 🤝 Open Source Contributions

We welcome contributions from the Solana developer community. To maintain project integrity, please follow these guidelines:

1.  **Fork the Project:** Create your own copy of the repository to work on.
2.  **Create a Feature Branch:** `git checkout -b feature/YourFeatureName`
3.  **WIP Limits:** We adhere to a strict **Work In Progress (WIP) limit of 1**. Focus on completing one specific enhancement before moving to the next.
4.  **Coding Standards:** Ensure all UI changes utilise Tailwind utility classes and maintain the established dark-mode aesthetic.
5.  **Submit a Pull Request:** Provide a clear description of the changes and how they improve validator accessibility.


---

## 👤 Author
* **Student ID:** UP2124153
* **Institution:** University of Portsmouth
* **Year:** 2026