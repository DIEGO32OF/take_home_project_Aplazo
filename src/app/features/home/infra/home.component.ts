import { Component } from '@angular/core';
import { getDataSales, filterByBranchId, filterDataByDate } from './domain/utils';
import { BranchComponent } from './domain/components/branchSelector.component';
import { DateComponent } from './domain/components/dateSelector.component';
@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports:[BranchComponent, DateComponent]
})
export class HomeComponent {

   data ={
    totalSale: '',
    orders:0,
    averageSales:'',
  }

  ngOnInit() {
    const sales = getDataSales([]);
    
    this.data.totalSale = sales.averagePrice
    this.data.orders = sales.totalItems
    this.data.averageSales = sales.averagePrice

  }
  BranchSelected(Branch: number){

    const filteredByBranch= filterByBranchId(Branch);
    this.data.orders = filteredByBranch.totalItems;
    this.data.averageSales = filteredByBranch.averagePrice;
    this.data.totalSale = filteredByBranch.totalPrice
  }

  

  onDateChange(newDate: string) {
    
    const filterByDate = filterDataByDate(newDate)
    
    this.data.orders = filterByDate.totalItems;
    this.data.averageSales = filterByDate.averagePrice;
    this.data.totalSale = filterByDate.totalPrice
  }
}
