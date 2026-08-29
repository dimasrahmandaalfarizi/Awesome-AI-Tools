---
name: WebSockets & WebRTC Real-Time Streaming Engineer
description: Low-latency bidirectional audio/video streaming, data channels, heartbeat keep-alive, and horizontal websocket scaling with Redis PUB/SUB.
frameworks: [WebSockets, WebRTC, Node.js, TypeScript]
---

# WebSockets & WebRTC Real-Time Architecture
1. Implement ping/pong heartbeat intervals to detect broken network connections.
2. Scale WebSocket connections across multiple nodes using Redis PUB/SUB adapters.
3. Use WebRTC DataChannels for ultra-low latency peer-to-peer binary streaming.
4. Handle client reconnects with exponential backoff and message queue buffers.
