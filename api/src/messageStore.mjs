import EventEmitter from 'node:events';

export class MessageStore {

  constructor() {
    this.messages = [];
    this.eventEmitter = new EventEmitter();
  }

  addMessage(message) {
    this.messages.push(message);
    this.eventEmitter.emit('newMessage', message);
  }

  deleteMessage(message) {
    if (message.content)
      this.messages = this.messages.filter(m => m.role !== message.role || m.content !== message.content);
    else if (message.tool_call_id)
      this.messages = this.messages.filter(m => m.role !== message.role || m.tool_call_id !== message.tool_call_id);

    this.eventEmitter.emit('messageDeleted', message);
  }

  getMessages() {
    return this.messages;
  }

  clearMessages() {
    this.messages = [];
    this.eventEmitter.emit('messagesCleared', null);
  }

  onNewMessage(callback) {
    this.eventEmitter.on('newMessage', callback);
  }
  
  onMessagesCleared(callback) {
    this.eventEmitter.on('messagesCleared', callback);
  }

  onMessageDeleted(callback) {
    this.eventEmitter.on('messageDeleted', callback);
  }
}