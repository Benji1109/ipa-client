import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
	selector: "login",
	templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
	private url = 'http://localhost:3000';

	public loginForm: FormGroup;
	public error: string;

	constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) {
		this.loginForm = new FormGroup(
			this.formBuilder.group({
				username: [
					"",
					[
						Validators.required,
						Validators.email
					]
				],
				password: [
					"",
					[
						Validators.required,
						Validators.maxLength(16),
						Validators.minLength(6)
					]
				]
			}).controls,
			{
				updateOn: "blur"
			}
		);
	}

	public ngOnInit(): void {
		if (localStorage.getItem('access_token')) {
			this.router.navigate(['/chat']);
		}
	}

	public onLogin(event: any) {
		this.error = null;
		this.httpClient.post(`${this.url}/login`, this.loginForm.value).subscribe((data: { token?: string, error?: string }) => {
			if (data.error) { this.error = data.error; } else {localStorage.setItem('access_token', data.token); this.router.navigate(['/chat']); }
		}, (error) =>
				this.error = 'Not valid password/username!'
		);
	}

	public onRegister(event: any) {
		this.error = null;
		this.httpClient.post(`${this.url}/register`, this.loginForm.value).subscribe((data: { token?: string, error?: string }) => {
			if (data.error) { this.error = data.error; } else {localStorage.setItem('access_token', data.token); this.router.navigate(['/chat']); }
		}, (error) => this.error = error.error);

	}
}
