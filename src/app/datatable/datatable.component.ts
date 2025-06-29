import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-datatable',
  standalone: true,
   imports: [CommonModule, HttpClientModule,FormsModule],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss'
})
export class DatatableComponent implements OnInit {
  grid_columns: any[] = [];
  grid_data: any[] = [];
  paged_data: any[] = [];
  allSelected: boolean = false;
  pageSize: number = 10;
  pages: any[] = [];
  currentPage: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://01.fy25ey01.64mb.io/').subscribe(response => {
      this.grid_columns = [
        { column_key: 'checkbox', column_name: '', type: 'checkbox', align: 'center' },
        ...response.grid_columns,
        { column_key: 'actions', column_name: 'Actions', type: 'actions', align: 'center' }
      ];

      this.grid_data = response.grid_data.map((item: any) => ({
        ...item,
        selected: false
      }));
      this.setupPagination();
    });
  }

  setupPagination() {
    const totalPages = Math.ceil(this.grid_data.length / this.pageSize);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    this.setPagedData();
  }

  setPagedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paged_data = this.grid_data.slice(start, end);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.pages.length) return;
    this.currentPage = page;
    this.setPagedData();
  }

  userimage = "assets/icon.jfif";
  toggleAllSelection() {
    this.paged_data.forEach(row => row.selected = this.allSelected);
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