import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const list = {
  0: { id: 72, name: "David Beckham" },
  1: {
    0: [
      { id: 11, name: "Brad Pitt" },
      { id: 1, name: "Alexandra Daddario" },
    ],
    1: { id: 19, name: "Michael Myers" },
  },
  2: { 0: { 0: [{ id: 33, name: "Matthew Heafy" }] } },
  3: [
    [
      { id: 4, name: "John Petrucci" },
      { id: 55, name: "Wayne Rooney" },
    ],
    [
      { id: 57, name: "Garbeil Tronpis" },
      { id: 10, name: "Donald Trump" },
      { 0: { id: 69, name: "[Object object]" } },
    ],
    { id: 13, name: "Ester Exposito" },
    {
      0: [
        { id: 3, name: "Jordan Rudess" },
        { id: 8, name: "Michael Jackson" },
      ],
      1: { id: 99, name: "undefined undefined" },
    },
    { id: 47, name: "Raul Garcia" },
    { id: 40, name: "Benito Martinez" },
  ],
  4: [
    { id: 68, name: "Lionel Messi" },
    { id: 84, name: "Kobe Bryant" },
    { id: 71, name: "Gilgamesh" },
    [
      { id: 7, name: "Miyamoto Musashi" },
      {
        0: [{ id: 23, name: "Arthur Pendragon" }],
        1: [{ id: 5, name: "Bedivere" }],
      },
      { id: 96, name: "Lord Valdomero" },
      { id: 18, name: "Literalmente nadie" },
    ],
  ],
};

const App = () => {
  let flattenedList = Object.values(list)
  const [ bestTime, setBestTime ] = useState(10000000000);
  const [ actualTime, setActualTime ] = useState(0);
  const [ bestAlgo, setBestAlgo ] = useState('none yet')
  
  let doneList = []

  const flattenHandler = (list) => {
    for(let i = 0; i < list.length; i++){
      if(list[i].id >= 0 ){
        doneList = [...doneList, list[i]]
      }
      else {
        if(list[i].length >= 0){
          flattenArrHandler(list[i])
        }
        else{
          flattenObjHandler(list[i])
        }
      }
    }
  }

  const flattenObjHandler = (obj) => {
    let aux = Object.values(obj)
    let arrEl = []

    for(let i=0; i < aux.length; i++) {
      //its value
      if(aux[i].id >= 0) {
        doneList = [...doneList, aux[i]]
      }
      //its an array
      else if(aux[i].length >= 0){
        flattenArrHandler(aux[i])
      } 
      //its an obj
      else {
        flattenObjHandler(aux[i])
      }
    }
  }

  const flattenArrHandler = arr => {
    for(let i = 0; i<arr.length; i++) {
      if(arr[i].id >= 0){
        doneList = [...doneList, arr[i]]
      }
      else{
        if(arr[i].length >= 0){
          flattenArrHandler(arr[i])
        }
        else{
          flattenObjHandler(arr[i])
        }
      }
    }
  }
  flattenHandler(flattenedList)
  // console.log(doneList)

  function swap(items, leftIndex, rightIndex){
      var temp = items[leftIndex];
      items[leftIndex] = items[rightIndex];
      items[rightIndex] = temp;
  }
  function partition(items, left, right) {
      var pivot   = items[Math.floor((right + left) / 2)].id, //middle element
          i       = left, //left pointer
          j       = right; //right pointer
      while (i <= j) {
          while (items[i].id < pivot) {
              i++;
          }
          while (items[j].id > pivot) {
              j--;
          }
          if (i <= j) {
              swap(items, i, j); //sawpping two elements
              i++;
              j--;
          }
      }
      return i;
  }
  
  const quickSort = (items, left, right) => {
      let index;
      if (items.length > 1) {
          index = partition(items, left, right); //index returned from partition
          if (left < index - 1) { //more elements on the left side of the pivot
              quickSort(items, left, index - 1);
          }
          if (index < right) { //more elements on the right side of the pivot
              quickSort(items, index, right);
          }
      }
      console.log(items)
  }

  function radixSort(arr) {
    console.log('no hago nada')
   console.log(Date.now())

 }

 const mergeSort = arr => {
  if (arr.length === 1) {
    // return once we hit an array with a single item
    return arr
  }

  const middle = Math.floor(arr.length / 2) // get the middle item of the array rounded down
  const left = arr.slice(0, middle) // items on the left side
  const right = arr.slice(middle) // items on the right side

  return merge(
    mergeSort(left),
    mergeSort(right)
  )
}

// compare the arrays item by item and return the concatenated result
function merge (left, right) {
  let result = []
  let indexLeft = 0
  let indexRight = 0

  while (indexLeft < left.length && indexRight < right.length) {
    if (left[indexLeft].id < right[indexRight].id) {
      result.push(left[indexLeft])
      indexLeft++
    } else {
      result.push(right[indexRight])
      indexRight++
    }
  }

  return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
}

const mergeSortHandler = async () => {
  let startTime = Date.now()
  let result = await mergeSort(doneList)
  let doneTime = Date.now();
  let totalTime = doneTime - startTime
  if (totalTime < bestTime){ 
    setBestTime(totalTime) 
    setBestAlgo('merge sort')
  }
  setActualTime(totalTime)
}

const quickSortHandler = async () => {
  let startTime = Date.now()
  let result = await quickSort(doneList, 0, doneList.length - 1 )
  let doneTime = Date.now();
  let totalTime = doneTime - startTime
  if (totalTime < bestTime){ 
    setBestTime(totalTime) 
    setBestAlgo('quick sort')
  }
  setActualTime(totalTime)
}

const [index, setIndex] = useState(0)
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
          <TouchableOpacity style={{...styles.button}} onPress={()=>{quickSortHandler()}}>
            <Text>Quick sort</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{...styles.button}} onPress={()=>{radixSort(doneList)}}>
            <Text>Radix sort</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{...styles.button}} onPress={()=>{mergeSortHandler()}}>
            <Text>Merge sort</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.data}>
          <TouchableOpacity onPress={()=>{index > 0 ? setIndex(index-1) : null}}>
            <Text>{'<'}</Text>
          </TouchableOpacity>
          <Text>name: {doneList[index].name}</Text>
          <TouchableOpacity onPress={()=>{index+1 < doneList.length ? setIndex(index+1) : null}}>
            <Text>{'>'}</Text>
          </TouchableOpacity>
      </View>
      <Text>Best time: {bestTime == 10000000000 ? 'no op yet' : bestTime}</Text>
      <Text>Actual time: {actualTime}</Text>
      <Text>Fastest Algorithm: {bestAlgo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
    height: 50,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: '30%',
    backgroundColor: 'grey',
    height: '80%',
    margin: 5,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  data: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 100
  }
});

export default App;
