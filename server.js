const express = require('express');
const QRCode = require('qrcode');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = app.listen(3000);

const io = socketio(server);


app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (connectedSocket) => {
  connectedSocket.on('QR', async (data) => {
    try {
      const url = data.content;
      const qrCodeImage = await QRCode.toDataURL(url);
      connectedSocket.emit('QRResponse', { content: qrCodeImage });
    } catch (error) {
      console.error('Error generating QR code:', error);
      connectedSocket.emit('QRResponse', { error: 'Error generating QR code' });
    }
  });
});