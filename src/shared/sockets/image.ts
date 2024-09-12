import { Server } from 'socket.io';

let socketIOImageObject: Server;

export class SocketIOimageHandler {
  public listen(io: Server): void {
    socketIOImageObject = io;
  }
}

export { socketIOImageObject };