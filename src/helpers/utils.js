// Chunks the array of daysm (arr) into arrays of 5 (size) - working days
export const chunkArray = (arr, size) => {
  const chunkedArr = [];
  let index = 0;
  while (index < arr.length) {
    chunkedArr.push(arr.slice(index, size + index));
    index += size;
  }

  return chunkedArr;
};
