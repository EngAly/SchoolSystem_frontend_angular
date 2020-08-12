import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-search-worker',
   templateUrl: './search-worker.component.html',
   styleUrls: ['./search-worker.component.scss']
})
export class SearchWorkerComponent {

   items = [
      { id: "7", name: "ali", age: "22" },
      { id: "2", name: "hossam", age: "66" },
      { id: "5", name: "nader", age: "55" },
      { id: "4", name: "hanan", age: "33" },
      { id: "1", name: "moussa", age: "12" },
   ]
   after = [];

   constructor() { }

   btn() {
      this.after = Object.assign([], this.items)
      // this.after.sort((a, b) => a.id.localeCompare(b.id))
      this.after.sort((a, b) => a.name.localeCompare(b.name))
   }

}
