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
    setTimeout(()=>{

      this.initialiaze()

     // console.log(this.formData)
    },10)
  }

  eventsHandles(root) {
    root.events.unsubscribe('policyList')
    root.events.subscribe('policyList', (originalData) => {
      console.log(originalData)


    })
  }

  initialiaze()
  {
    this.api.get("/api/quote/trv").subscribe((resp)=>{
      console.log(resp)
      this.originalData = resp
      this.fillingData(resp)
    })

    // this.originalData =[
    //   {id:10000021,customerName:'Michael Lin',policyNo:"3502301201303",expireDate:'2017-06-09',notified:"Yes"},
    //   {id:10000022,customerName:'DDDDD Ln',policyNo:"3502301201303",expireDate:'2017-06-09',notified:"Yes"},
    //   {id:10000023,customerName:'QUR Lin',policyNo:"3502301201303",expireDate:'2017-06-09',notified:"No"},
    //   {id:10000041,customerName:'HA Lin',policyNo:"3502301201303",expireDate:'2017-06-09',notified:"Yes"},
    //   {id:10000066,customerName:'MIN Lin',policyNo:"3502301201303",expireDate:'2017-06-09',notified:"Yes"},
    //   {id:10000025,customerName:'Micha2l Lin',policyNo:"3502301201303",expireDate:'2017-06-10',notified:"Yes"},
    //   {id:10000028,customerName:'Michae4 Lin',policyNo:"3502301201304",expireDate:'2017-06-19',notified:"No"},
    //   {id:10000029,customerName:'Michae6 Lin',policyNo:"3502301201306",expireDate:'2017-06-29',notified:"Yes"}
    // ]
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
