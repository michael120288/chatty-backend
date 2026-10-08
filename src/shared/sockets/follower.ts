
import { Server } from "socket.io";

// 'remove follower' is now broadcast directly from the REST unfollow
// controller (unfollow-user.ts), right after it decrements counts in cache —
// the same pattern 'add follower' already uses in follower-user.ts. That
// avoids racing a separate client-emitted socket event against the REST
// call that does the actual decrement, which used to let the broadcast go
// out with stale (pre-decrement) counts depending on which finished first.
export let socketIOFollowerObject: Server;

export class SocketIOFollowerHandler {
  private io: Server;
  constructor(io: Server) {
    this.io = io;
    socketIOFollowerObject = io;
  }
  public listen(): void {
    // No client-originated events to listen for on this namespace anymore.
  }
}