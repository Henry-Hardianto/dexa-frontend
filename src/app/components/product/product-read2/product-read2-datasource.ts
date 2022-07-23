import { Product } from './../product.model';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

const EXAMPLE_DATA: Product[] = [
  {id: 1, name: 'Hydrogen', datebirth: 15-3-1993, birthplace: 'hi', gender: 'hi', idcard: 1234567890123},
  {id: 2, name: 'Helium', datebirth: 15-4-1993, birthplace: 'ho', gender: 'hi', idcard: 1234567890123},
  {id: 3, name: 'Lithium', datebirth: 15-5-1993, birthplace: 'hrtr', gender: 'hi', idcard: 1234567890123},
  {id: 4, name: 'Beryllium', datebirth: 15-4-1993, birthplace: 'hrtrt', gender: 'hi', idcard: 1234567890123},
  {id: 5, name: 'Boron', datebirth: 15-7-1993, birthplace: 'hrw', gender: 'hi', idcard: 1234567890123},
  {id: 6, name: 'Carbon', datebirth: 15-3-1993, birthplace: 'her', gender: 'hi', idcard: 1234567890123},
  {id: 7, name: 'Nitrogen', datebirth: 15-3-1993, birthplace: 'hedr', gender: 'hi', idcard: 1234567890123},
  {id: 8, name: 'Oxygen', datebirth: 15-3-1993, birthplace: 'hss', gender: 'hi', idcard: 1234567890123},
  {id: 9, name: 'Fluorine', datebirth: 15-3-1993, birthplace: 'hdf', gender: 'hi', idcard: 1234567890123},
  {id: 10, name: 'Neon', datebirth: 15-3-1993, birthplace: 'hdfd', gender: 'hi', idcard: 1234567890123},
  {id: 11, name: 'Sodium', datebirth: 15-3-1993, birthplace: 'hhd', gender: 'hi', idcard: 1234567890123},
  {id: 12, name: 'Magnesium', datebirth: 15-3-1993, birthplace: 'heh', gender: 'hi', idcard: 1234567890123},
  {id: 13, name: 'Aluminum', datebirth: 15-3-1993, birthplace: 'hdb', gender: 'hi', idcard: 1234567890123},
  {id: 14, name: 'Silicon', datebirth: 15-3-1993, birthplace: 'hege', gender: 'hi', idcard: 1234567890123},
  {id: 15, name: 'Phosphorus', datebirth: 15-3-1993, birthplace: 'hehe', gender: 'hi', idcard: 1234567890123},
  {id: 16, name: 'Sulfur', datebirth: 15-5-1993, birthplace: 'hegs', gender: 'hi', idcard: 1234567890123},
  {id: 17, name: 'Chlorine', datebirth: 15-3-1993, birthplace: 'hebs', gender: 'hi', idcard: 1234567890123},
  {id: 18, name: 'Argon', datebirth: 15-3-1993, birthplace: 'hsgr', gender: 'hi', idcard: 1234567890123},
  {id: 19, name: 'Potassium', datebirth: 15-3-1993, birthplace: 'hsrgsg', gender: 'hi', idcard: 1234567890123},
  {id: 20, name: 'Calcium', datebirth: 15-3-1993, birthplace: 'hssg', gender: 'hi', idcard: 1234567890123},
];


export class ProductRead2DataSource extends DataSource<Product> {
  data: Product[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  
  connect(): Observable<Product[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }


  disconnect() {}

 
  private getPagedData(data: Product[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }


  private getSortedData(data: Product[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}


function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
