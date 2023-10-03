import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessService } from 'src/app/services/access.service';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  changePasswordForm! : FormGroup;
  userObj : any = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accessService : AccessService,
    private utentiService : UtentiService
    )
    {
      this.createForm();
    }

  createForm() {
    this.changePasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.email]],
      rewrite_password: ['', Validators.required]
    });
  }

  get password() {
    return this.changePasswordForm.get('password');
  }

  get rewritePassword() {
    return this.changePasswordForm.get('rewrite_password');
  }


  onSubmit(): void {
    let form_information = {
      password: this.password?.value,
      rewrite_password: this.rewritePassword?.value
    };

    // Ottengo il token
    const token = this.accessService.getToken();
    // Decodifico il token
    const tokenInfo = this.accessService.getDecodedAccessToken(token!);
    this.utentiService.getUtenteByEmail(tokenInfo['sub']).subscribe( (res) => {
      this.userObj.id = res.id;
      this.utentiService.updateCambioPassword(true, form_information.password, this.userObj.id!).subscribe((res)=> {
        // Ho modificato la password
        console.log(res);
        // Redirect alla homepage della Dashboard
        this.router.navigate(['home']);
      });
    });

  }

  onTouch() {
    this.onSubmit();
  }

}
