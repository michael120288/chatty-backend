
import { IFollowers } from "@follower/interfaces/follower.interface";
import { Server, Socket } from "socket.io";


export let socketIOFollowerObject: Server;

export  class SocketIOFollowerHandler{
  private io: Server;
  constructor(io: Server){
    this.io = io;
    socketIOFollowerObject = io;
  }
  public listen():void{
    this.io.on('connection', (socket: Socket) => {

      socket.on('unfollow user', (data:IFollowers)=>{
        const socketUserId = socket.data?.user?.userId as string | undefined;
        if (!socketUserId || socketUserId !== data.userId) return;
        this.io.emit('remove follower', data)
      })

    })
  }
}