import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "../data.service";
import { User } from "../user";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent implements OnInit {
  id: string;
  update: boolean = false;
  user: User;
  userForm = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(5)]],
    age: ["", [Validators.required, Validators.min(18), Validators.max(90)]],
    division: ["", [Validators.required]],
    height: ["", [Validators.required, Validators.min(150)]],
    check: [false, [Validators.requiredTrue]],
  });

  name = this.userForm.get("name");
  age = this.userForm.get("age");
  division = this.userForm.get("division");
  height = this.userForm.get("height");
  check = this.userForm.get("check");

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ds: DataService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      if (param.get("id")) {
        this.id = param.get("id");
        this.ds.getUser(this.id).subscribe(
          (response) => {
            this.user = response;
            this.update = true;

            this.userForm.get("name").setValue(this.user.name);
            this.userForm.get("age").setValue(this.user.age);
            this.userForm.get("height").setValue(this.user.height);
            this.userForm.get("division").setValue(this.user.division);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  addUser() {
    const param = this.userForm.value;
    delete param.check;

    this.ds.addUser(this.userForm.value).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(["home"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateUser() {
    this.ds.updateUser(this.id, this.userForm.value).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(["home"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteUser() {
    if (confirm("Are you sure you want to delete this user?")) {
      this.ds.deleteUser(this.id).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(["home"]);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
