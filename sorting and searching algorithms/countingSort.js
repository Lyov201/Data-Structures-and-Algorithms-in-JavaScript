// stable 
function countingSort(arr) {
    if (arr.length <= 1) return arr;

    let min = Math.min(...arr);
    let max = Math.max(...arr);
    let range = max - min + 1;
    
    let count = new Array(range).fill(0);
    let res = new Array(arr.length);

    for (let i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
    }
    console.log(count);
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    console.log(count);
    for (let i = arr.length - 1; i >= 0; i--) {
        let curVal = arr[i];
        let countIdx = curVal - min; 
        
        let position = count[countIdx] - 1;
        res[position] = curVal;
        count[countIdx]--;
    }
    

    return res;
}



// function cointing(arr) {
//     let max = Math.max(...arr);
//     let min = Math.min(...arr);

//     let range = max - min + 1;
//     const count = Array(range).fill(0);

//     for(let i = 0; i < arr.length; ++i) {
//         count[arr[i] - min]++;
//     }

//     let res = [];
//     for(let i =0; i < range; ++i) {
//         while(count[i]--) {
//             res.push(i + min);
//         }
//     }
//     return res;
// }

// console.log(cointing([-1,2,2,0,0,1,-1]));
