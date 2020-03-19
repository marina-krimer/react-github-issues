/* eslint-disable import/prefer-default-export */
export function toLocaleDateString(stringDate) {
  const d = new Date(stringDate)

  const formatter = new Intl.DateTimeFormat('ru', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })

  return formatter.format(d)
}
