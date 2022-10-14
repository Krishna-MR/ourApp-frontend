import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editUserForm: userForm = new userForm();

  @ViewChild("userForm")
  userForm!: NgForm;

  isSubmitted: boolean = false;
  userId: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['employeeId'];
    this.getEmployeeDetailById();
  }
  getEmployeeDetailById() {
    this.httpProvider.getUserDetailById(this.userId).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.editUserForm.Id = resultData.id;
          this.editUserForm.FirstName = resultData.firstName;
          this.editUserForm.LastName = resultData.lastName;
          this.editUserForm.Email = resultData.email;
          this.editUserForm.Address = resultData.address;
          this.editUserForm.Phone = resultData.phone;
        }
      }
    },
      (error: any) => { });
  }

  EditUser(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.saveUser(this.editUserForm).subscribe(async data => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData != null && resultData.isSuccess) {
            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
            }
          }
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }
}

export class userForm {
  Id: number = 0;
  FirstName: string = "";
  LastName: string = "";
  Email: string = "";
  Address: string = "";
  Phone: string = "";
}