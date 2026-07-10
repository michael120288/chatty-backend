import { ICommentDocument } from "@comment/interfaces/comment.interface";
import { IReactionDocument } from "@reaction/interfaces/reaction.interface";
import { Server, Socket } from "socket.io";


export let socketIOPostObject: Server;

export  class SocketIOPostHandler{
  private io: Server;
  constructor(io: Server){
    this.io = io;
    socketIOPostObject = io;
  }
  public listen():void{
    this.io.on('connection', (socket: Socket) => {

      socket.on('reaction', (reaction:IReactionDocument)=>{
        const socketUsername = socket.data?.user?.username as string | undefined;
        if (!socketUsername || socketUsername !== reaction.username) return;
        this.io.emit('update like', reaction)
      })

      socket.on('comment', (data:ICommentDocument)=>{
        const socketUsername = socket.data?.user?.username as string | undefined;
        if (!socketUsername || socketUsername !== data.username) return;
        this.io.emit('update comment', data)
      })

    })
  }
}