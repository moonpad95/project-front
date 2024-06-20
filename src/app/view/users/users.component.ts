import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Users } from 'src/app/model/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Users,
    private formBuilder: FormBuilder,
    private userListService: UsersService // Inyectamos el servicio
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (!this.data) {
      this.formGroup = this.formBuilder.group({
        username: ["", Validators.required],
        name: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        phone: ["", Validators.required],
        password: ["", Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
        role: ["", Validators.required],
        status: ["", Validators.required]
      });
    } else {
      console.log('Editing user:', this.data);
      this.formGroup = this.formBuilder.group({
        username: [this.data.username, Validators.required],
        name: [this.data.name, Validators.required],
        lastName: [this.data.lastName, Validators.required],
        email: [this.data.email, [Validators.required, Validators.email]],
        phone: [this.data.phone, Validators.required],
        password: ["", Validators.compose([Validators.minLength(4), Validators.maxLength(16)])], // Password is optional for editing
        role: [this.data.role, Validators.required],
        status: [this.data.status, Validators.required]
      });
    }
  }

  save(): void {
    const request = {
      id: this.data ? this.data._id : null,
      username: this.formGroup.value.username,
      name: this.formGroup.value.name,
      lastName: this.formGroup.value.lastName,
      phone: this.formGroup.value.phone,
      email: this.formGroup.value.email,
      password: this.formGroup.value.password,
      role: this.formGroup.value.role,
      status: this.formGroup.value.status
    };

    try {
      if (!this.data) {
        this.userListService.addUser(request).subscribe(item => console.log(item));
      } else {
        console.log('Nuevos datos: ', request)
        this.userListService.editUsers(request).subscribe(item => console.log(item));
      }
      this.dialogRef.close(true); //cerrar modal
    } catch (error) {
      console.log(error);
    }
  }
}
