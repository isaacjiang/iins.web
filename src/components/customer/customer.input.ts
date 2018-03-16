/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component} from '@angular/core';
import {Events, NavParams, ViewController} from "ionic-angular";
import 'rxjs';



@Component({
  selector:"iins-customer-input",
  templateUrl: './customer.input.html'
})
export class CustomerInputComponent {
  public tab: string;
  public customer:any;

  constructor(public params: NavParams,
              public viewCtrl: ViewController,
              public events: Events)
  {
   console.log('params:',params.get("originalData"))
    this.tab = "profile"
    this.customer = params.get("originalData")
  }



  next(current){
console.log(current)
    switch (current){
      case "profile":
        this.tab = "contact"
        break
      case "contact":
        this.tab = "documents"
        break
      default:
        this.tab = "profile"
        break
    }
  }

  submit(quote){

    this.events.publish("submit-customer-info",quote)

    this.dismiss()
  }
  dismiss(){
    this.viewCtrl.dismiss('close');
  }
}
