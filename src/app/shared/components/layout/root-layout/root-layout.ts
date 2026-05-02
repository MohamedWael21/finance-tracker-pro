import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { ChatUi } from '../../../../features/chatbot/chat-ui/chat-ui';
import { header } from '../header/header';

@Component({
  selector: 'app-root-layout',
  imports: [RouterOutlet, Sidebar, ChatUi, header],
  templateUrl: './root-layout.html',
})
export class RootLayout {}
