import moment from "moment"

export function strComp(arg1, arg2, options) { 
  return (arg1.toString() == arg2.toString()) 
}

export function stripTags(str){ return str.replace(/<(?:.|\n)*?>/gm, '') }

export function formatDate(date, format) { return moment(date).format(format) }