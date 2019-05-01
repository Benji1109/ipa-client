import { map } from 'rxjs/operators';
import { ChatService } from './chat.service';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
	message: string;
	messages: any[] = [];
	channels: any[] = ['Lobby', 'Private', 'Yolo', 'Infinity Szenya', 'RECS', 'lári Fári', 'Várandós'];
	channelName: string = '';
	uuid: string = 'TesztUser' + new Date().getMilliseconds();
	private readonly notifier: NotifierService;

	constructor(private chatService: ChatService, private notifierService: NotifierService) {
		this.notifier = this.notifierService;
	}

	ngOnInit() {

		this.chatService.getMessages().pipe(map((data: { type: string, text: string }) => data.text))
			.subscribe((data) => {
				this.messages.push(data);
			});
		this.chatService.getUserJoined()
			.subscribe((data) => {
				this.notifier.notify('success', data.messeage);
			});
		this.chatService.getUserLeaved()
			.subscribe((data) => {
				this.notifier.notify('error', data.messeage);
			});
		this.chatService.getUserConn()
			.subscribe((data) => {
				this.notifier.notify('success', data.messeage);
			});
		this.chatService.getUserDisConn()
			.subscribe((data) => {
				this.notifier.notify('error', data.messeage);
			});

	}

	sendMessage() {
		if (!this.channelName || this.channelName === '') {
			this.messages = [{ user: 'System', messeage: 'Nem léptél be csatornába!!!!' }];
		} else {
			this.chatService.sendMessage({ user: this.uuid, channel: this.channelName, messeage: this.message });
			this.message = '';
		}
	}

	public joinRoom(channelName: string): void {
		if (!this.channelName) {
			this.chatService.joinChannel({ user: this.uuid, channel: channelName });
		}
		else if (this.channelName !== channelName) {
			this.chatService.leaveChannel({ user: this.uuid, channel: this.channelName });
			this.chatService.joinChannel({ user: this.uuid, channel: channelName });
		}
		else if (this.channelName === channelName) {
			return;
		}
		this.channelName = channelName;
		this.messages = [];
	}


}
