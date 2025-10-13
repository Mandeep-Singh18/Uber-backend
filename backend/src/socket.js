import {Server} from 'socket.io';
import userModel from './models/user.model.js';
import captainModel from './models/captain.model.js';

let io;
const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    io.on('connection', (socket) => {
        socket.on('join', async (data) => {
            const { userId, userType } = data;
            if(userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
            else if(userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });
        socket.on('upadate-location-captain', async (data) => {
            const { userId, location } = data;
            await captainModel.findByIdAndUpdate(userId, { location: {
                ltd: location.ltd,
                lng: location.lng
            }});
        });
        socket.on('disconnect', async () => {
            console.log('Client disconnected');
        });
    })  
}

const sendMessageToSocketId = (socketId, messageObject) => {
    if(io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    }else{
        console.log("Socket.io not initialized");
    }
}

export { initSocket, sendMessageToSocketId };