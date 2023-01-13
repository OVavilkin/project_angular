import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '../account.service';
import { User } from '../user';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  @Input() Message: string;

  form: FormGroup;
  loading = false;
  submitted = false;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.accountService.user.subscribe( user => this.user = user);
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if(this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.editUser(this.f.username.value, this.f.password.value)
    .pipe(first())
    .subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: error => {
        this.loading = false;
      }
    });
  }


}
