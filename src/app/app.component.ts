import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { TopAreaComponent } from "./top-area/top-area.component";
import { FormsModule } from '@angular/forms';
import { DatatableComponent } from './datatable/datatable.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule,FormsModule, TopAreaComponent,DatatableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
grid_columns: any[] = [];
  grid_data: any[] = [];
  allSelected: boolean = false;
  pages: number[] = [1, 2, 3];
  currentPage: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://01.fy25ey01.64mb.io/').subscribe(response => {
      // Insert checkbox column at the start
      this.grid_columns = [
        { column_key: 'checkbox', column_name: '', type: 'checkbox', align: 'center' },
        ...response.grid_columns,
        { column_key: 'actions', column_name: 'Actions', type: 'actions', align: 'center' }
      ];

      // Add selection property
      this.grid_data = response.grid_data.map((item:any) => ({
        ...item,
        selected: false
      }));
    });
  }

  toggleAllSelection() {
    this.grid_data.forEach(row => row.selected = this.allSelected);
  }

  deleteRow(index: number) {
    const name = this.grid_data[index]?.name?.first_name || 'this user';
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      this.grid_data.splice(index, 1);
    }
  }

  showPopup(row: any) {
    alert(`Selected: ${row.name?.first_name} ${row.name?.last_name}`);
  }
}


