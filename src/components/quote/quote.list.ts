/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component} from '@angular/core';


import {Api} from "../../services/api.service";
import {Events, ModalController} from "ionic-angular";
import 'rxjs';
import {QuoteInputComponent} from "./quote.input";



@Component({
  selector: 'iins-quote',
  templateUrl: './quote.list.html'
})
export class QuoteListComponent {
  public originalData: any;
  public formData:any;
  public formTitle:String;

  constructor(public api:Api,
              public modalCtrl: ModalController,
              public events: Events)
  {
    this.eventsHandles(this)

      this.initialiaze()

  }

  eventsHandles(root) {
    root.events.unsubscribe('submit-travel-insurance-quote')
    root.events.subscribe('submit-travel-insurance-quote', (quote) => {
      console.log(quote)
      this.api.post("/api/quote/trv",quote).subscribe((resp)=>{
        console.log(resp)
        this.fillingData(resp)
      })


    })
  }

  initialiaze()
  {
    this.api.get("/api/quote/trv").subscribe((resp)=>{
      console.log(resp)
      this.originalData = resp
      this.fillingData(resp)
    })

  }

  fillingData(originalData) {
    this.formData = [];
    // let titleList = [];


    if (originalData && Object.keys(originalData).length > 0) {
     // console.log('table',originalData)

      this.formTitle = "Travel Insurance Quote List"
      // titleList = ['insurer','policyHolder','policyNumber','effectiveDate','expireDate','numberOfDays']
      this.formData[0] = ["No.",'Trip Type', 'Destination','Date of Departure','Date of Return','Coverage For'];
      for(let line of originalData){
        console.log(line)
        let valueList = []
        // valueList[0]=line['id']
        valueList[0]=line['typeOfTravel']
        valueList[1]=line['destination']
        valueList[2]=line['dateOfDeparture']
        valueList[3]=line['dateOfReturn']
        valueList[4]=line['coverageFor']
        this.formData.push(valueList)
      }
    }
  }
  selectLine(row){

   console.log(row,this.originalData)
   let quoteInputComponent = this.modalCtrl.create(QuoteInputComponent, {originalData:this.originalData[row]},{ enableBackdropDismiss: false });
    quoteInputComponent.present();
  }



  selectCell(row,col){

  }
}
