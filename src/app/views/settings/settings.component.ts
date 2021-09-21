import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../services/account.service';
import {User} from '../../models/user';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Account} from '../../models/account';
import {UserService} from '../../services/user.service';
import {UserRole} from '../../models/user-role';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @ViewChild('editUserModal') public editUserModal: ModalDirective;
  @ViewChild('newUserModal') public newUserModal: ModalDirective;

  editUserForm: FormGroup;
  newUserForm: FormGroup;

  public loggedUser: User = new User();
  public currentAccount: Account = new Account();
  public allUsersRoles: UserRole[] = [];
  public accountUsers: User[] = [];

  public editingUser: User = new User();
  public newUser: User = new User();

  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    this.accountService.getLoggerUserAccount(this.loggedUser).subscribe(account => {
      this.currentAccount = account;
      this.userService.getAllUsersByAccount(account.id).subscribe(users => {
        this.accountUsers = users;
      });
    });

    this.editUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
      status: ['', Validators.required],
      email: ['', Validators.required]
    });

    this.newUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
      status: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get editUserFormControl() { return this.editUserForm.controls; }
  get newUserFormControl() { return this.newUserForm.controls; }

  getAccountStatusColor(accountStatus: string) {
    if (accountStatus === 'Ativa') {
      return 'badge badge-success';
    } else if (accountStatus === 'Inativa') {
      return 'badge badge-secondary';
    } else if (accountStatus === 'Pendente') {
      return 'badge badge-warning';
    } else if (accountStatus === 'Bloqueada') {
      return 'badge badge-danger';
    } else if (accountStatus === 'Expirada') {
      return 'badge badge-danger';
    }
  }

  openUserEditing(user: User) {
    this.userService.getUserById(user.id).subscribe(currentEditingUser => {
      this.userService.getAllUsersRoles().subscribe(usersRoles => {
        this.allUsersRoles = usersRoles;
      });
      this.editingUser = currentEditingUser;
      this.editUserModal.show();
    });
  }

  closeUserEditing() {
    this.editingUser = new User();
    this.allUsersRoles = [];
    this.editUserModal.hide();
  }

  openNewUserModal() {
    this.newUser = new User();
    this.newUserModal.show();
  }

  closeNewUserModal() {
    this.newUser = new User();
    this.allUsersRoles = [];
    this.newUserModal.hide();
  }
}
