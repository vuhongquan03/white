import {Component, HostListener, ViewChild} from '@angular/core';
import {MdbTableDirective} from "PATH-TO-MDB-ANGULAR";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
    elements: any = [];
    headElements = ['ID', 'First', 'Last', 'Handle'];
  
    searchText: string = '';
    previous: string;
  
    constructor() { }
  
    @HostListener('input') oninput() {
      this.searchItems();
    }
  
    ngOnInit() {
      for (let i = 1; i <= 10; i++) {
        this.elements.push({ id: i.toString(), first: 'Wpis ' + i, last: 'Last ' + i, handle: 'Handle ' + i });
      }
  
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    }
  
    searchItems() {
      const prev = this.mdbTable.getDataSource();
  
      if (!this.searchText) {
        this.mdbTable.setDataSource(this.previous);
        this.elements = this.mdbTable.getDataSource();
      }
  
      if (this.searchText) {
        this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
        this.mdbTable.setDataSource(prev);
      }
    }
  }