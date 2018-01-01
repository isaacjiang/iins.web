7/**
 * Created by isaacjiang on 2017-09-01.
 */
import {Component} from '@angular/core';
import {Events, NavController} from "ionic-angular";



@Component({
    selector: 'iins-header',
    templateUrl: 'header.html'
})


export class HeaderComponent {
    constructor(public events: Events,
                public navCtrl: NavController) {
        this.eventsHandles(this)
    }

    eventsHandles(root) {

    }

    loadPage(pageName) {
      this.events.publish("header-load-page",pageName)

    }


}
