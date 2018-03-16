/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component,Input} from '@angular/core';
import {Events, ModalController} from 'ionic-angular';
import 'rxjs';
import {Api} from "../../services/api.service";
import {QuoteInputComponent} from "../quote/quote.input";
import {CustomerInputComponent} from "./customer.input";


@Component({
    selector: 'iins-customer-list',
    templateUrl: './customer.list.html'

})
export class CustomerListComponent {

    public originalData ;
    public formData = [];
    public formTitle:any;

    constructor(public api:Api,
                public modalCtrl: ModalController,
                public events: Events) {
      this.eventsHandles(this)
      this.initialiaze()
    }

    eventsHandles(root) {
        root.events.unsubscribe('submit-customer-info')
        root.events.subscribe('submit-customer-info', (customer) => {
            console.log(customer)
          this.api.post("/api/customer/save",customer).subscribe((resp)=>{
            console.log(resp)
            this.fillingData(resp)
          })

        })
    }

    initialiaze()
    {
      this.api.get("/api/customer").subscribe((resp)=>{
        console.log(resp)
       this.originalData = resp
        this.fillingData(resp)
      })
    }

    fillingData(originalData) {
        this.formData = [];
        // let titleList = [];


        if (originalData && Object.keys(originalData).length > 0) {
            console.log('table',originalData)

                this.formTitle = "Customer List"
                // titleList = ['insurer','policyHolder','policyNumber','effectiveDate','expireDate','numberOfDays']
                this.formData[0] = ['First Name', 'Last Name','Birth Date',"Gender"];
                for(let line of originalData){
                    console.log(line)
                    let valueList = []
                    valueList[0]=line['firstname']
                    valueList[1]=line['lastname']
                    valueList[2]=line['date_of_Birth']
                    valueList[3]=line['gennder']

                    this.formData.push(valueList)
                }
        }
    }
    selectLine(row){
      console.log(row,this.originalData)
      let customerInputComponent = this.modalCtrl.create(CustomerInputComponent, {originalData:this.originalData[row]},{ enableBackdropDismiss: false });
      customerInputComponent.present();
    }

    selectCell(row,col){

    }






}
