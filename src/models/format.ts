export function date(date: Date): `<t:${number}:f>` {
  return `<t:${Math.round((new Date(date)).getTime() / 1000)}:f>`
}

export default {
  date,
}