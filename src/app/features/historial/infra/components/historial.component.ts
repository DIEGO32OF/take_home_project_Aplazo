import { Component } from '@angular/core';
import data from "../../../shared/infra/db.json"
import { CommonModule } from '@angular/common';
import { getDataFilterByDateFromHistory } from '../../../home/infra/domain/utils';
import { DateComponent } from '../../../home/infra/domain/components/dateSelector.component';

@Component({
  standalone: true,
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  imports:[CommonModule, DateComponent]
})
export class HistorialComponent {

  dataTable: any[]=[] //una disculpa x no poner un type o interface fue x el tiempo
  
  data ={
    totalSale: '',
    orders:0,
    averageSales:'',
  }
  ngOnInit() {
    this.dataTable = data.map(item => {
      const date = new Date(item.updatedAt);
      const formattedDate = date.toISOString().split('T')[0] + ' ' + date.toISOString().split('T')[1].split('.')[0];

      return { ...item, updatedAt: formattedDate };
    });
    this.data.orders = this.dataTable.length
  }

  sortData(property: string) {
    const sortedData = [...this.dataTable];
    const isString = typeof this.dataTable[0][property] === 'string';

    
    sortedData.sort((a, b) => {
      if (isString) {
        return a[property].localeCompare(b[property]);
      } else {
        return a[property] - b[property]; 
      }
    });


    this.dataTable = sortedData;
  }

  
  onDateChange(newDate: string) {
    
    this.dataTable = getDataFilterByDateFromHistory(newDate)
    
    this.data.orders = this.dataTable.length;
    
  }
}
