const express = require("express");
const WebSocket = require("ws");

const app = express();

const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });
const users = [];

const broadcast = (data, ws) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on("connection", ws => {
  let index;
  ws.on("message", message => {
    const data = JSON.parse(message);
    console.log(data);
    switch (data.type) {
      case "ADD_USER": {
        index = users.length;
        users.push({ name: data.name, id: index + 1 });
        ws.send(
          JSON.stringify({
            type: "USERS_LIST",
            users
          })
        );
        broadcast(
          {
            type: "USERS_LIST",
            users
          },
          ws
        );
        break;
      }
      case "ADD_MESSAGE": {
        broadcast(
          {
            type: "ADD_MESSAGE",
            message: data.message,
            author: data.author,
            room_id: data.room_id
          },
          ws
        );
        break;
      }
      case "ADD_ROOM": {
        broadcast(
          {
            type: "ADD_ROOM",
            name: "Teste"
          },
          ws
        );
        break;
      }
      default:
        break;
    }
  });
  ws.on("close", () => {
    users.splice(index, 1);
    broadcast(
      {
        type: "USERS_LIST",
        users
      },
      ws
    );
  });
});

server.listen(8989);
