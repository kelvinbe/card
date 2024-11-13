
  export const formatDate = (inputDate) => {
    if(!Array.isArray(inputDate)){
      return
    }
    const [year, month, day] = inputDate
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const formattedMonth = months[month - 1];
    return `${formattedMonth} ${day}, ${year}`;
  };
  
  
  export function formatDateForDay(date) {
    const pad = (number) => (number < 10? `0${number}` : number);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    let day = pad(date.getDate());
    let month = months[date.getMonth()];
    let year = date.getFullYear();
  
    return `${day} ${month} ${year}`;
  }


  export function extractSpecificObjects(arr, id, property){
    const result = []
    arr.forEach(obj => {
      if(obj.id === Number(id) && Array.isArray(obj[property])){
        result.push(...obj[property])
      }
    })

    return result
  }


   export function transformMerchantsData(operatorsData) {
    return operatorsData.map(operator => ({
      value: operator.merchant,
      label: operator.merchant
    }));
  }