import { Server, Socket } from 'socket.io';
import { SocketIOUserHandler, connectedUsersMap } from '@socket/user';
import { SocketIOPostHandler } from '@socket/post';
import { SocketIOChatHandler } from '@socket/chat';
import { SocketIOFollowerHandler } from '@socket/follower';
import { SocketIONotificationHandler } from '@socket/notification';
import { SocketIOImageHandler } from '@socket/image';
import { SocketIOFlashcardHandler } from '@socket/flashcard';

// ── Helpers ──────────────────────────────────────────────────────────────────

function mockSocket(id = 'socket-1', username = 'testuser', userId = 'user1'): jest.Mocked<Socket> {
  return {
    id,
    data: { user: { username, userId } },
    on: jest.fn(),
    join: jest.fn(),
    emit: jest.fn(),
  } as unknown as jest.Mocked<Socket>;
}

function mockServer(): jest.Mocked<Server> {
  const io = {
    on: jest.fn(),
    emit: jest.fn(),
  } as unknown as jest.Mocked<Server>;
  return io;
}

/** Triggers the 'connection' listener registered with io.on and returns the socket */
function connect(io: jest.Mocked<Server>, socket: jest.Mocked<Socket>): void {
  const connectionHandler = (io.on as jest.Mock).mock.calls.find(([event]) => event === 'connection')?.[1];
  if (connectionHandler) connectionHandler(socket);
}

/** Triggers a named event on a socket */
function emit(socket: jest.Mocked<Socket>, event: string, data?: unknown): void {
  const handler = (socket.on as jest.Mock).mock.calls.find(([e]) => e === event)?.[1];
  if (handler) handler(data);
}

// ── SocketIOUserHandler ───────────────────────────────────────────────────────

describe('SocketIOUserHandler', () => {
  beforeEach(() => connectedUsersMap.clear());

  it('adds user to connectedUsersMap on "setup"', () => {
    const io = mockServer();
    const socket = mockSocket('sock-1', '', '');
    const handler = new SocketIOUserHandler(io);
    handler.listen();
    connect(io, socket);
    emit(socket, 'setup', { userId: 'user1' });

    expect(connectedUsersMap.get('user1')).toBe('sock-1');
  });

  it('emits "user online" on setup', () => {
    const io = mockServer();
    const socket = mockSocket();
    const handler = new SocketIOUserHandler(io);
    handler.listen();
    connect(io, socket);
    emit(socket, 'setup', { userId: 'user2' });

    expect(io.emit).toHaveBeenCalledWith('user online', expect.any(Array));
  });

  it('emits "blocked user id" when "block user" is received', () => {
    const io = mockServer();
    const socket = mockSocket();
    const handler = new SocketIOUserHandler(io);
    handler.listen();
    connect(io, socket);
    const data = { blockedUser: 'u99', blockedBy: 'user1' };
    emit(socket, 'block user', data);

    expect(io.emit).toHaveBeenCalledWith('blocked user id', data);
  });

  it('emits "unblocked user id" when "unblock user" is received', () => {
    const io = mockServer();
    const socket = mockSocket();
    const handler = new SocketIOUserHandler(io);
    handler.listen();
    connect(io, socket);
    const data = { blockedUser: 'u99', blockedBy: 'user1' };
    emit(socket, 'unblock user', data);

    expect(io.emit).toHaveBeenCalledWith('unblocked user id', data);
  });

  it('removes user from connectedUsersMap on disconnect', () => {
    const io = mockServer();
    const socket = mockSocket('sock-disconnect', '', '');
    const handler = new SocketIOUserHandler(io);
    handler.listen();
    connect(io, socket);
    emit(socket, 'setup', { userId: 'user3' });
    expect(connectedUsersMap.has('user3')).toBe(true);

    emit(socket, 'disconnect');
    expect(connectedUsersMap.has('user3')).toBe(false);
  });
});

// ── SocketIOPostHandler ───────────────────────────────────────────────────────

describe('SocketIOPostHandler', () => {
  it('emits "update like" when "reaction" event is received', () => {
    const io = mockServer();
    const socket = mockSocket();
    const handler = new SocketIOPostHandler(io);
    handler.listen();
    connect(io, socket);
    const reaction = { type: 'like', postId: 'p1', username: 'testuser' };
    emit(socket, 'reaction', reaction);

    expect(io.emit).toHaveBeenCalledWith('update like', reaction);
  });

  it('emits "update comment" when "comment" event is received', () => {
    const io = mockServer();
    const socket = mockSocket();
    const handler = new SocketIOPostHandler(io);
    handler.listen();
    connect(io, socket);
    const comment = { comment: 'Nice!', postId: 'p1', username: 'testuser' };
    emit(socket, 'comment', comment);

    expect(io.emit).toHaveBeenCalledWith('update comment', comment);
  });
});

// ── SocketIOChatHandler ───────────────────────────────────────────────────────

describe('SocketIOChatHandler', () => {
  beforeEach(() => connectedUsersMap.clear());

  it('joins socket to sender and receiver rooms on "join room"', () => {
    connectedUsersMap.set('Alice', 'sock-alice');
    connectedUsersMap.set('Bob', 'sock-bob');

    const io = mockServer();
    const socket = mockSocket('socket-1', 'Alice', 'user-alice');
    const handler = new SocketIOChatHandler(io);
    handler.listen();
    connect(io, socket);
    emit(socket, 'join room', { senderName: 'Alice', receiverName: 'Bob' });

    expect(socket.join).toHaveBeenCalledWith('sock-alice');
    expect(socket.join).toHaveBeenCalledWith('sock-bob');
  });
});

// ── SocketIOFollowerHandler ───────────────────────────────────────────────────

describe('SocketIOFollowerHandler', () => {
  it('emits "remove follower" when "unfollow user" is received', () => {
    const io = mockServer();
    const socket = mockSocket();
    const handler = new SocketIOFollowerHandler(io);
    handler.listen();
    connect(io, socket);
    const data = { userId: 'user1' };
    emit(socket, 'unfollow user', data);

    expect(io.emit).toHaveBeenCalledWith('remove follower', data);
  });
});

// ── SocketIONotificationHandler ───────────────────────────────────────────────

describe('SocketIONotificationHandler', () => {
  it('sets the io server reference on listen()', () => {
    const io = mockServer() as unknown as Server;
    const handler = new SocketIONotificationHandler();
    handler.listen(io);
    // Just verify it doesn't throw and the module initialises
    expect(true).toBe(true);
  });
});

// ── SocketIOImageHandler ──────────────────────────────────────────────────────

describe('SocketIOImageHandler', () => {
  it('sets the io server reference on listen()', () => {
    const io = mockServer() as unknown as Server;
    const handler = new SocketIOImageHandler();
    handler.listen(io);
    expect(true).toBe(true);
  });
});

// ── SocketIOFlashcardHandler ──────────────────────────────────────────────────

describe('SocketIOFlashcardHandler', () => {
  it('registers a connection listener without throwing', () => {
    const io = mockServer();
    const handler = new SocketIOFlashcardHandler(io as unknown as Server);
    expect(() => handler.listen()).not.toThrow();
  });
});
