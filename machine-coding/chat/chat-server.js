/**
 * Chat Server - Machine Coding Round
 * 
 * Requirements:
 * - WebSocket-based chat
 * - Broadcast messages
 * - User management
 * - Room support (optional)
 * 
 * Constraints:
 * - Real-time communication
 * - Handle disconnections
 */

import { WebSocketServer } from 'ws';

/**
 * Chat Server
 * WHY: Demonstrates WebSocket, real-time communication, connection management
 */
export class ChatServer {
  constructor(server) {
    this.wss = new WebSocketServer({ server });
    this.clients = new Map(); // WHY: Store client connections
    this.rooms = new Map(); // WHY: Store room memberships
    
    this.setup();
  }
  
  /**
   * Setup WebSocket server
   * WHY: Handle connections, messages, disconnections
   */
  setup() {
    this.wss.on('connection', (ws, req) => {
      const clientId = this.generateClientId();
      this.clients.set(clientId, {
        ws,
        id: clientId,
        username: null,
        joinedAt: Date.now()
      });
      
      // WHY: Send welcome message
      this.sendToClient(clientId, {
        type: 'connected',
        clientId,
        message: 'Connected to chat server'
      });
      
      // WHY: Handle messages
      ws.on('message', (data) => {
        try {
          const message = JSON.parse(data.toString());
          this.handleMessage(clientId, message);
        } catch (error) {
          this.sendToClient(clientId, {
            type: 'error',
            message: 'Invalid message format'
          });
        }
      });
      
      // WHY: Handle disconnection
      ws.on('close', () => {
        this.handleDisconnect(clientId);
      });
      
      // WHY: Handle errors
      ws.on('error', (error) => {
        console.error(`WebSocket error for client ${clientId}:`, error);
        this.handleDisconnect(clientId);
      });
    });
  }
  
  /**
   * Handle incoming message
   * WHY: Route different message types
   */
  handleMessage(clientId, message) {
    const client = this.clients.get(clientId);
    if (!client) return;
    
    switch (message.type) {
      case 'join':
        client.username = message.username;
        this.broadcast({
          type: 'user_joined',
          username: message.username,
          timestamp: Date.now()
        }, clientId);
        break;
        
      case 'message':
        if (!client.username) {
          this.sendToClient(clientId, {
            type: 'error',
            message: 'Must join with username first'
          });
          return;
        }
        
        this.broadcast({
          type: 'chat_message',
          username: client.username,
          message: message.message,
          timestamp: Date.now()
        }, clientId);
        break;
        
      case 'join_room':
        this.joinRoom(clientId, message.room);
        break;
        
      case 'leave_room':
        this.leaveRoom(clientId, message.room);
        break;
    }
  }
  
  /**
   * Broadcast message to all clients
   * WHY: Send message to everyone except sender
   */
  broadcast(message, excludeClientId = null) {
    this.clients.forEach((client, clientId) => {
      if (clientId !== excludeClientId && client.ws.readyState === 1) {
        this.sendToClient(clientId, message);
      }
    });
  }
  
  /**
   * Send message to specific client
   * WHY: Helper for sending messages
   */
  sendToClient(clientId, message) {
    const client = this.clients.get(clientId);
    if (client && client.ws.readyState === 1) {
      client.ws.send(JSON.stringify(message));
    }
  }
  
  /**
   * Join room
   * WHY: Support room-based chat
   */
  joinRoom(clientId, roomName) {
    if (!this.rooms.has(roomName)) {
      this.rooms.set(roomName, new Set());
    }
    this.rooms.get(roomName).add(clientId);
    
    this.broadcast({
      type: 'room_joined',
      room: roomName,
      username: this.clients.get(clientId)?.username
    });
  }
  
  /**
   * Leave room
   * WHY: Remove from room
   */
  leaveRoom(clientId, roomName) {
    const room = this.rooms.get(roomName);
    if (room) {
      room.delete(clientId);
      if (room.size === 0) {
        this.rooms.delete(roomName);
      }
    }
  }
  
  /**
   * Handle client disconnect
   * WHY: Clean up connections
   */
  handleDisconnect(clientId) {
    const client = this.clients.get(clientId);
    if (client) {
      // WHY: Notify others of disconnect
      this.broadcast({
        type: 'user_left',
        username: client.username,
        timestamp: Date.now()
      }, clientId);
      
      // WHY: Remove from rooms
      this.rooms.forEach((members, roomName) => {
        members.delete(clientId);
        if (members.size === 0) {
          this.rooms.delete(roomName);
        }
      });
      
      this.clients.delete(clientId);
    }
  }
  
  /**
   * Generate unique client ID
   * WHY: Identify clients
   */
  generateClientId() {
    return `client-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  /**
   * Get server stats
   * WHY: Useful for monitoring
   */
  getStats() {
    return {
      connectedClients: this.clients.size,
      rooms: this.rooms.size,
      roomDetails: Array.from(this.rooms.entries()).map(([name, members]) => ({
        name,
        memberCount: members.size
      }))
    };
  }
}
