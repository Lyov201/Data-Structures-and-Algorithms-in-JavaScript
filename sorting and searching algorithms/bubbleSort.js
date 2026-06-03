function bubbleSort(arr) {
    for (let i = 0; i < arr.length; ++i) {
        let swapped = false;

        for (let j = 0; j < arr.length - i - 1; ++j) {
            if (arr[j] > arr[j + 1]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
                swapped = true;
            }
        }

        if (!swapped) break;
    }

    return arr;
}