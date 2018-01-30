/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component} from '@angular/core';


import {Api} from "../../services/api.service";
import {Events, ModalController, NavParams, ViewController} from "ionic-angular";
import 'rxjs';



@Component({
  selector:"iins-quote-input",
  templateUrl: './quote.input.html'
})
export class QuoteInputComponent {
  public tab: string;
  public quote:any;

  constructor(public params: NavParams,
              public viewCtrl: ViewController,
              public events: Events)
  {
   console.log('params:',params.get("originalData"))
    this.tab = "travel_insurance_quote"
    this.quote = params.get("originalData")
  }



  next(current){
console.log(current)
    switch (current){
      case "travel_insurance_quote":
        this.tab = "coverage"
        break
      case "coverage":
        this.tab = "payment"
        break
      default:
        this.tab = "travel_insurance_quote"
        break
    }
  }

  submit(quote){
    console.log(quote)

    this.dismiss()
  }
  dismiss(){
    this.viewCtrl.dismiss('close');
  }
}
