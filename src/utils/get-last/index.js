export default function getLast(arr, key) {
  if (!Array.isArray(arr) || arr.length < 1) return

  const lastItem = arr[arr.length - 1]

  if (typeof lastItem === 'object')
    return lastItem[key]
  return lastItem
}
