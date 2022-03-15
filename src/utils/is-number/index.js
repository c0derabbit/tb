export default function isNumber(key) {
  return /((U?Int|Float)\d?|Decimal)/.test(key)
}
