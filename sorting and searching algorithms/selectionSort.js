function selectionSort(arr) {
    for(let i = 0; i < arr.length ; ++i) {
        let min = i;
        for(let j = i ; j < arr.length -1 ; ++j) {
            if(arr[min] > arr[j + 1]) {
                min = j+1;
            }
        }
        [arr[min], arr[i]] = [arr[i], arr[min]];
    }
    return arr;
}
