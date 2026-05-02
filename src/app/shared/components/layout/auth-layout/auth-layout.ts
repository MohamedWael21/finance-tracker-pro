import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideWallet } from '@lucide/angular';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, LucideWallet],
  templateUrl: './auth-layout.html',
})
export class AuthLayout {}
