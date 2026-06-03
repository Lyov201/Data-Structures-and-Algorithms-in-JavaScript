function quickSort(arr,low = 0, high = arr.length - 1) {
    if(low >= high) return;

    let pivot = quickLast(arr, low, high);
    
    quickSort(arr, low, pivot - 1);
    quickSort(arr, pivot + 1, high);
}
function quickFirst(arr, low, high) {
    let pivot = arr[low];
    let i = high + 1;
    for(let j = high; j > low; --j) {
        if(pivot < arr[j]) {
            i--;
            [arr[i], arr[j]] = [arr[j],arr[i]];
        }
    }
    [arr[low], arr[i - 1]] = [arr[i -1], arr[low]];
    return i-1;
}

function quickLast(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    for(let j = low; j < high; ++j) {
        if(pivot > arr[j]) {
            i++;
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i+1]];
    return i+1;
}
