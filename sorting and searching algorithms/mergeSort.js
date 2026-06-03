function mergeSort(arr) {
    if(arr.length === 1) return arr;
    let mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0,mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    let i = 0;
    let j = 0;
    const res = [];

    while(i < left.length && j < right.length) {
        if(left[i] > right[j]) {
            res.push(right[j]);
            j++;
        } else {
            res.push(left[i]);
            i++;
        }
    }

    while(i < left.length) {
        res.push(left[i]);
        i++;
    }

    while(j < right.length) {
        res.push(right[j]);
        j++;
    }

    return res;
}


