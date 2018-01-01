/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component,Input} from '@angular/core';
import {Events} from 'ionic-angular';
import 'rxjs';
import {Api} from "../../services/api.service";


@Component({
    selector: 'iins-menu',
    templateUrl: '../menu/menu.html',
    providers:[Api]
})
export class MenuComponent{
    public mainMenuWorkflow :any;
    public menuTitle:any;


    constructor(public api:Api,
                public events: Events) {
    }

  setMenu(id){
      switch (id) {
        case 'root': {
          this.menuTitle = 'Home'
          break;
        }
        case 'customer': {
          this.menuTitle = 'Customer Service'
          break;
        }
        case 'settings': {
          this.menuTitle = 'settings'
          break;
        }
        default : {
          this.menuTitle = id.toUpperCase()
        }
      }

    this.getWorkflow(id)
    }


    getWorkflow(parentId) {
        let root = this
       let url = "/api/menu";
        if (parentId !=null) url +="/"+parentId
      this.api.get(url).subscribe((resp)=>{
        root.mainMenuWorkflow = resp
        console.log(root.mainMenuWorkflow )
      })
    }

    menuClick(funcName){
        this.events.publish('menu-click-item',funcName)
    }


}
