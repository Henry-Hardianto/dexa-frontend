import { Injectable } from '@angular/core';
import * as _ from 'lodash';

declare var $: any;
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  hideHead = [
    '/login',
    '/signup',
    '/forgot-password'
  ]

  hideNavSide = [
    '/',
    '/login',
    '/signup',
    '/forgot-password'
  ]
}
