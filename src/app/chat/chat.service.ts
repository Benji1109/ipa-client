import io from 'socket.io-client';
import { Observable } from 'rxjs';

export class ChatService {
	private url = 'https://sleepy-lowlands-43655.herokuapp.com';
	private socket;

	constructor() {
		this.socket = io(this.url);
	}

	public sendMessage(userMesseage: { user: string, channel: string, messeage: string }) {
		this.socket.emit('new-message', userMesseage);
	}

	public getMessages() {
		return Observable.create((observer) => {
			this.socket.on('message', (message) => {
				console.log(message);
				observer.next(message);
			});
		});
	}

	public getUserJoined() {

		let observable = new Observable<{ user: string, messeage: string }>(observer => {
			this.socket.on('new-user-joined', (data) => {
				observer.next(data);
			});
			return () => { this.socket.disconnect(); }
		});

		return observable;
	}

	public getUserLeaved() {

		let observable = new Observable<{ user: string, messeage: string }>(observer => {
			this.socket.on('user-leaved', (data) => {
				observer.next(data);
			});
			return () => { this.socket.disconnect(); }
		});

		return observable;
	}

	public getUserConn() {

		let observable = new Observable<{ user: string, messeage: string }>(observer => {
			this.socket.on('client-conn', (data) => {
				observer.next(data);
			});
			return () => { this.socket.disconnect(); }
		});

		return observable;
	}

	public getUserDisConn() {

		let observable = new Observable<{ user: string, messeage: string }>(observer => {
			this.socket.on('client-disconn', (data) => {
				observer.next(data);
			});
			return () => { this.socket.disconnect(); }
		});

		return observable;
	}

	public joinChannel(user): void {
		this.socket.emit('join', user);
	}

	public leaveChannel(user): void {
		this.socket.emit('leave', user);
	}

}
