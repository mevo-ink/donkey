/*
  Shift the array elements (times) number

  (eg):
  input: array = ['a', 'b', 'c', 'd'], times = 2
  output: array = ['c', 'd', 'a', 'b']
*/
const rotate = (array, times) => {
  while (times--) {
    const temp = array.shift()
    array.push(temp)
  }
}

export default rotate
