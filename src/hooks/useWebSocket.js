import { useState, useEffect } from "react";

export const useWebSocket = (url) => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket opened:", url);
    };

    socket.onclose = () => {
      console.log("WebSocket closed:", url);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [url]);

  /**
   * Sends code to the WebSocket server to run.
   *
   * @param {{ language: string, codeToRun: string }} options
   * @param {string} options.language the language of the code
   * @param {string} options.codeToRun the code to run
   * @returns {Promise<string>} a Promise that resolves with the response from the server
   */
  async function sendCode({ language, codeToRun }) {
    return new Promise((resolve, reject) => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        const message = {
          type: "code",
          language: language,
          codeToRun: codeToRun,
        };

        ws.onmessage = (e) => {
          console.log("Received from WebSocket:", e.data);
          resolve(e.data); // resolves promise when response arrives
        };

        ws.onerror = (err) => {
          console.error("WebSocket error:", err);
          reject(err);
        };

        ws.send(JSON.stringify(message));
        console.log("Sent message:", message);
      } else {
        reject(new Error("WebSocket not open"));
      }
    });
  }

  /**
   * Sends an "exit" command to the WebSocket server to gracefully close the connection.
   *
   * @returns {Promise<string>} A Promise that resolves with the server's response
   * or rejects with an error if the WebSocket is not open or an error occurs.
   */
  async function exit() {
    return new Promise((resolve, reject) => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        const message = {
          type: "exit",
          language: "",
          codeToRun: "",
        };

        ws.onmessage = (e) => {
          console.log("Received from WebSocket:", e.data);
          resolve(e.data); // resolves promise when response arrives
        };

        ws.onerror = (err) => {
          console.error("WebSocket error:", err);
          reject(err);
        };

        ws.send(JSON.stringify(message));
        console.log("Sent message:", message);
      } else {
        reject(new Error("WebSocket not open"));
      }
    });
  }

  /**
   * Send a command to the WebSocket server, and wait for a response.
   *
   * @param {{ language: string, command: string }} options
   * @param {string} options.language the language of the command
   * @param {string} options.command the command to send
   * @returns {Promise<string>} a Promise that resolves with the response from the server
   */
  async function sendCommand({ language, command }) {
    return new Promise((resolve, reject) => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        const message = {
          type: "command",
          language: language,
          codeToRun: command,
        };

        ws.onmessage = (e) => {
          console.log("Received from WebSocket:", e.data);
          resolve(e.data); // resolves promise when response arrives
        };

        ws.onerror = (err) => {
          console.error("WebSocket error:", err);
          reject(err);
        };

        ws.send(JSON.stringify(message));
        console.log("Sent message:", message);
      } else {
        reject(new Error("WebSocket not open"));
      }
    });
  }

  return {
    sendCode,
    sendCommand,
    exit,
  };
};
