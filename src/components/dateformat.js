'use strict'

export function toLocaleDateString(stringDate) {
    let d = new Date(stringDate)
    
    let formatter = new Intl.DateTimeFormat("ru", {
        day: "numeric",
        month: "numeric",
        year: "numeric", 
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });

    return formatter.format(d)
}