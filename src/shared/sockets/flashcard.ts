import { Server, Socket } from 'socket.io';

export let socketIOFlashcardObject: Server;

export class SocketIOFlashcardHandler {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    socketIOFlashcardObject = io;
  }

  public listen(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log('Flashcard socket connected');
    });
  }
}
