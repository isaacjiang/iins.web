import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api.service';

@Injectable()
export class Items {

  constructor(public api: Api) { }

  query(params?: any) {
    return this.api.get('/items', params);
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
