import data from "../../../shared/infra/db.json"

export function getDataSales(dataToAnailist: any[]){
const allData = dataToAnailist.length>0? dataToAnailist: data

const summary= allData.reduce(
    (acc, item) => {
      acc.sum += item.price; 
      acc.count += 1; 
      return acc;
    },
    { sum: 0, count: 0 }
  );

  const result = {
    totalPrice: (summary.sum).toFixed(2),
    averagePrice: (summary.count > 0 ? summary.sum / summary.count : 0).toFixed(2),
    totalItems: summary.count,
  };

  return result;
}

export function getUniqueBranch(){
    const Branches = [...new Set(data.map(x=> x.branchId))]
    
    return Branches;
}
export function filterByBranchId(myBranchId: number){
    const dataByBranches = data.filter(x=> x.branchId === myBranchId)
    return getDataSales(dataByBranches)
}

export function filterDataByDate(date: string){
    const dataByDate = data.filter( x=> x.createdAt.split('T')[0] == date)
    return getDataSales(dataByDate)
}

export function getDataFilterByDateFromHistory(date: string){
    
    if(date !== ''){
        return data.filter( x=> x.createdAt.split('T')[0] == date)
    }
    else{
        return data
    }
    
}