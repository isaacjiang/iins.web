/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component, ComponentFactoryResolver, ViewChild} from '@angular/core';
import {MenuController, LoadingController, App, Events, IonicPage} from 'ionic-angular';
import 'rxjs';
import {MenuDirective} from "../../directives/menu.directive";
import {MenuComponent} from "../../components/menu/menu";
import {ContentDirective} from "../../directives/content.directive";
import {QuoteComponent} from "../../components/quote/quote";
import {CustomerlistComponent} from "../../components/customer/customerlist";


@Component({
    templateUrl: '../root/root.html',
})
export class Root {
    //public uploader: FileUploader = new FileUploader({url: '/rest/files/upload'});
    @ViewChild(MenuDirective) menuHost: MenuDirective;
   @ViewChild(ContentDirective) contentHost: ContentDirective;

    constructor(
                public events: Events,
                public menuCtrl: MenuController,
                private componentFactoryResolver: ComponentFactoryResolver,
                public app: App)
    {
      this.eventsHandles(this)
    }

    eventsHandles(root) {
      root.events.unsubscribe('header-load-page')
      root.events.unsubscribe('menu-click-item')

      root.events.subscribe('header-load-page', (param) => {
        this.loadComponent(this.menuHost.viewContainerRef,MenuComponent,param)
      })
      root.events.subscribe('menu-click-item', (param) => {
            console.log(param)
            this.menuCtrl.close()
        switch (param.itemKey){
          case "travel_insurance_quote":
            this.loadComponent(this.contentHost.viewContainerRef,QuoteComponent,param);
            break;
          case "customer_list":
            this.loadComponent(this.contentHost.viewContainerRef,CustomerlistComponent,param)
            break;
        }

        })
    }

    ionViewWillEnter() {

    }

    ionViewDidEnter() {

      this.app.setTitle('Intelligent Insurance')
      this.loadComponent(this.menuHost.viewContainerRef,MenuComponent,"root")
    }

    ionViewWillLeave() {

    }
    openMenu() {
        this.menuCtrl.toggle()
    }

   loadComponent(viewContainerRef,component,id) {
    viewContainerRef.clear();
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    let ref = viewContainerRef.createComponent(componentFactory);

    switch (ref.componentType){
      case MenuComponent:{
        ref.instance.setMenu(id)
      }
      case QuoteComponent:{

      }
    }


  }

}
