import moment from "moment"

export function strComp(arg1, arg2) { return (arg1.toString() == arg2.toString()) }

export function add(arg1, arg2) { return (arg1 + arg2) }

export function sub(arg1, arg2) { return (arg1 - arg2) }

export function stripTags(str){ return str.replace(/<(?:.|\n)*?>/gm, '') }

export function formatDate(date, format) { return moment(date).format(format) }

export function loop(loopTo, block) { 
  let accum = ''

  for(let i=0; i<loopTo; i++){
    block.data.index = i+1;
    block.data.first = i === 0;
    block.data.last = i === (loopTo - 1);
    accum += block.fn(i)
  }
  
  return accum
}