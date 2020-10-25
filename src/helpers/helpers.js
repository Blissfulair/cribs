export const getDates=(startDate, stopDate)=> {
    for(var arr=[],dt=new Date(startDate); dt<=stopDate; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
}