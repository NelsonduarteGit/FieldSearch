import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from '../search-data.service';
import { MockDataService } from '../mock-data.service';

import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-fs-search',
  templateUrl: './fs-search.component.html',
  styleUrls: ['./fs-search.component.scss'],
})
export class FsSearchComponent implements OnInit {
  searchForm!: FormGroup;
  formData: any;
  mockData: any[] = [];
  filteredData: any[] = [];
  imageUrl: SafeResourceUrl;
  displayedColumns: string[] = [
    'dataEmail',
    'categoria',
    'nProposta',
    'gestorRemetente',
    'gestorDestinatario',
  ];

  expandedIndex = 0;

  dataSource!: MatTableDataSource<any>;
  totalRecords: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  pageSize: number = 10;
  pageIndex = 0;
  currentPage: number = 1;

  panelOpenState = false;

  @ViewChild('paginatorRef', { static: true }) paginator!: MatPaginator;
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private mockDataService: MockDataService,
    private sanitizer: DomSanitizer
  ) {
    this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      './assets/images/search.png'
    );
  }

  ngOnInit(): void {
    this.createForm();

    this.formService.getFormData().subscribe((data) => {
      this.formData = data;
    });

    this.mockData = this.mockDataService.getMockData(50);

    this.dataSource = new MatTableDataSource(this.mockData);
    this.dataSource.paginator = this.paginator;
    this.getPagedData();
  }

  createForm(): void {
    this.searchForm = this.formBuilder.group({
      numeroCliente: [''],
      dataInicial: [''],
      dataFinal: [''],
      nProposta: [''],
      categoria: [''],
      gestorRemetente: [''],
      gestorDestinatario: [''],
      simOuNao: [''],
    });
  }

  clearFilteredData(): void {
    this.filteredData = [];
    this.formData = [];
    this.searchForm.reset();
  }

  onSubmit(): void {
    const formValues = this.searchForm.value;

    // Update the filteredData based on form values
    this.filteredData = this.mockData.filter((data) => {
      return (
        this.filterByText(
          data.numeroCliente.toString(),
          formValues.numeroCliente
        ) &&
        this.filterByDate(data.dataInicial, formValues.dataInicial, true) &&
        this.filterByDate(data.dataFinal, formValues.dataFinal, false) &&
        this.filterByText(data.nProposta.toString(), formValues.nProposta) &&
        this.filterByText(data.categoria, formValues.categoria) &&
        this.filterByText(data.gestorRemetente, formValues.gestorRemetente) &&
        this.filterByText(data.simOuNao, formValues.simOuNao)
      );
    });

    // Update the totalRecords property
    this.totalRecords = this.filteredData.length;

    // Update the data source for the table with the current page of filtered data
    this.dataSource.data = this.filteredData.slice(0, this.pageSize);

    // Update the paginator configuration
    this.paginator.pageIndex = 0; // Reset to the first page
    this.paginator.pageSize = this.pageSize;
    this.paginator.length = this.totalRecords;

    // Associate the paginator with the data source
    this.dataSource.paginator = this.paginator;
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.getPagedData();
  }

  getPagedData(): void {
    this.dataSource.data = this.filteredData.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }

  private filterByText(dataField: string, formField: string): boolean {
    return (
      !formField || dataField.toLowerCase().includes(formField.toLowerCase())
    );
  }

  private filterByDate(
    dataField: Date,
    formField: string,
    isStartOfDay: boolean
  ): boolean {
    if (!formField) return true;

    const formData = new Date(formField);
    const dataFieldValue = dataField.getTime();

    return isStartOfDay
      ? dataFieldValue >= formData.setHours(0, 0, 0, 0) &&
          dataFieldValue <= formData.setHours(23, 59, 59, 999)
      : dataFieldValue <= formData.setHours(23, 59, 59, 999) &&
          dataFieldValue >= formData.setHours(0, 0, 0, 0);
  }
}
