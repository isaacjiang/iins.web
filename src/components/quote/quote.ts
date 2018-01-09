/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component} from '@angular/core';
import {Http} from '@angular/http'
import 'rxjs';
import {HttpClient} from "@angular/common/http";



@Component({
  selector: 'iins-quote',
  templateUrl: '../quote/quote.html'
})
export class QuoteComponent {
  public information: string;
  public policyInfo:any;

  constructor(public http:HttpClient)
  {
    this.information = "policy"
    this.policyInfo = {agent:{},policy:{},coverage:{},payment:{}}

  }


}
