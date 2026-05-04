import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
// import { ChatUi } from '../../../../features/chatbot/chat-ui/chat-ui';
import { FloatingChat } from '../../floating-chat/floating-chat';
import { header } from '../header/header';
import { ToastContainer } from '../../ui/toast/toast-container';

@Component({
  selector: 'app-root-layout',
  imports: [RouterOutlet, Sidebar, FloatingChat, header, ToastContainer],
  templateUrl: './root-layout.html',
})
export class RootLayout {}
