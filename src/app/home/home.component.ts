import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { User } from "../user";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  users: User[] = [];

  constructor(private ds: DataService, private router: Router) {}

  ngOnInit(): void {
    this.ds.getUsers().subscribe(
      (response) => {
        console.log(response);
        this.users = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  userOnClick(id: string) {
    console.log(id);
    this.router.navigate([`/form/${id}`]);
  }
}
