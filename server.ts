
const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  const intervalId = setInterval(() => {
    const number =  Math.floor(Math.random() * 101)
    console.log('emitting number ', number)
    socket.emit("serverMessage", number + '');
  }, 1000);

  socket.on('disconnect', () => {
    console.log('User disconnected');
    clearInterval(intervalId)

  });
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
