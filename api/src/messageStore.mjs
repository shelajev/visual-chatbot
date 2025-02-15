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
}