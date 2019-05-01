import { AuthGuard } from './auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule, MatTooltipModule, MatInputModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat/chat.service';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

const customNotifierOptions: NotifierOptions = {
	position: {
		horizontal: {
			position: 'left',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
	theme: 'material',
	behaviour: {
		autoHide: 5000,
		onClick: 'hide',
		onMouseover: 'pauseAutoHide',
		showDismissButton: true,
		stacking: 4
	},
	animations: {
		enabled: true,
		show: {
			preset: 'slide',
			speed: 300,
			easing: 'ease'
		},
		hide: {
			preset: 'fade',
			speed: 300,
			easing: 'ease',
			offset: 50
		},
		shift: {
			speed: 300,
			easing: 'ease'
		},
		overlap: 150
	}
};
export function tokenGetter() {
	return localStorage.getItem('access_token');
}
@NgModule({
	declarations: [AppComponent, LoginComponent, RegisterComponent, ChatComponent],
	imports: [

		BrowserModule,
		FormsModule,
		HttpModule,
		NotifierModule.withConfig(customNotifierOptions),
		NgbModule,
		MatTooltipModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatToolbarModule,
		HttpClientModule,
		MatInputModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		MatCardModule,
		MatFormFieldModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		AppRoutingModule
	],
	providers: [ChatService, AuthGuard],
	bootstrap: [AppComponent]
})
export class AppModule { }
