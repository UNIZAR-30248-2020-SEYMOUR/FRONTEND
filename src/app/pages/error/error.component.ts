import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  errorCode: string;
  errorMessage: string;
  constructor(private route: ActivatedRoute) {
    this.errorCode = '';
    this.errorMessage = '';
    const sub = this.route.params.subscribe(params => {
      this.errorCode = params.code;
      this.errorMessage = params.message;
    });
  }

  ngOnInit(): void {
  }


}
export function manageGenericError(error: HttpErrorResponse, router:Router){

  if (error['error'] === 'User does not exist')
    this.route.navigate(['/login']);

  if(error.status === 0)
    router.navigate(['error', "ERROR", "Se ha producido un error en el servidor"]);
  if(error.status === 500)
    router.navigate(['error', 500, "Se ha producido un error en el servidor"]);
  if(error.status === 404)
    router.navigate(['error', 404, "Página no encontrada"]);

}
