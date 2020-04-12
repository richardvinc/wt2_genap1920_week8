import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { User } from "../user";

@Component({
  selector: "app-user-card",
  templateUrl: "./user-card.component.html",
  styleUrls: ["./user-card.component.scss"],
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  @Output() childClicked = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  userClick(id: string) {
    this.childClicked.emit(id);
  }
}
