import moment from 'moment';

export function getRangeOfDates(start, end, key, arr = [start.startOf(key)]) {
  
    if(start.isAfter(end)) throw new Error('start must precede end')
    
    const next = moment(start).add(1, key).startOf(key);
    
    
    if(next.isAfter(end, key)) return arr;
    
  
    return getRangeOfDates(next, end, key, arr.concat(next));
    
}

