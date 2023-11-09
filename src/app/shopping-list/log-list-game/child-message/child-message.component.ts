import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child-message',
  templateUrl: './child-message.component.html',
  styleUrls: ['./child-message.component.scss'],
})
export class ChildMessageComponent {
  @Input() validity = false;
  @Input() cartList: { nb: number; name: string; isInBasket: boolean }[] = [];
  @Output() secretEvent = new EventEmitter<string>();

  hootySecret() {
    this.secretEvent.emit("c'est pour éviter les carences en FER !!!");
  }
}
