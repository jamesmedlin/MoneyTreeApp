export function roundMoney(num: number) {
  return (Math.floor(num * 100) / 100).toFixed(2);
}
