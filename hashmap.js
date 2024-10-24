  class HashMap{
    constructor(initialCapacity = 16 , loadFactor =.75){
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.size = 0;
        this.buckets = new Array(this.capacity).fill().map(() => []);
    }
    
    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
     
        return hashCode;
      } 

    checkIndex(index){
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
          }
    }

    set(key, value){
        const hashCode = this.hash(key);
        const index = hashCode % this.capacity;

        this.checkIndex(index);

        const bucket = this.buckets[index];
        for(let i=0; i < bucket.length; i++){
            if(bucket[i][0] === key){
                bucket[i][1] = value;
                return;
            }
        }

        //when key isnt found, add a new key-value pair
        bucket.push([key, value]);
        this.size++;

        if (this.size > this.capacity * this.loadFactor){
            this.resize();
        }
    }

    get(key){
        const hashCode = this.hash(key);
        const index = hashCode % this.capacity;
        this.checkIndex(index);
        const bucket = this.buckets[index];
        for( let i=0; i < bucket.length; i++ ){
            if(bucket[i][0] === key){
                return bucket[i][1];
            }
        }
        return null;
    }

    has(key){
        const hashCode = this.hash(key);
        const index = hashCode % this.capacity;
        this.checkIndex(index);

        const bucket = this.buckets[index];
        for ( let i = 0 ; i < bucket.length; i++){
            if(bucket[i][0] === key){
                return true;
            }            
        }
        return false;
    }

    remove(key){
        const hashCode = this.hash(key);
        const index = hashCode % this.capacity;
        this.checkIndex(index);
        const bucket = this.buckets[index];
        for (let i=0 ; i< bucket.length; i++){
            if(bucket[i][0] === key){
                bucket.splice(i, 1);
               return true; 
            }
        }
        return false;
    }

    totalKeys(){
        let count = 0;
        const allBuckets = this.buckets;
        //
        for (let i = 0 ; i < allBuckets.length; i++){            
                count += allBuckets[i].length;
        }
        return count;
    }
    
    clear(){
        const allBuckets = this.buckets;
        for (let i = 0 ; i< allBuckets.length ; i++){
            allBuckets[i] = [];
        }
        this.size = 0;
    }

    keys (){
        const allBuckets = this.buckets;
        const arrayOfKeys = []
        for (let i = 0 ; i<allBuckets.length; i++){
            for(let j=0 ; j<allBuckets[i].length; j++){
                arrayOfKeys.push(allBuckets[i][j][0])                
            }
        }
        console.log(arrayOfKeys);
        return arrayOfKeys;
    }

    values (){
        const allBuckets = this.buckets;
        const arrayOfValues = []
        for (let i = 0 ; i<allBuckets.length; i++){
            for(let j=0 ; j<allBuckets[i].length; j++){
                arrayOfValues.push(allBuckets[i][j][1])                
            }
        }
        console.log(arrayOfValues);
                return arrayOfValues;
    }
    
    entries(){
        const allBuckets = this.buckets;
        const arrayOfEntries = []
        for (let i = 0 ; i<allBuckets.length; i++){
            for(let j=0 ; j<allBuckets[i].length; j++){
                arrayOfEntries.push(allBuckets[i][j]);                
            }
        }
        console.log(arrayOfEntries);
        return arrayOfEntries;
    }

    resize(){
        const currentBuckets = this.buckets;
        this.capacity *= 2;
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(null).map
        ( () => []);
        for(bucket of currentBuckets){
            for (const [key,value] of bucket){
                this.set(key,value);
            }
        }
    }
  }

//   const hashmap = new HashMap();
//   console.log(hashmap.hash("poop"));
// const testArray = [[]]
//   console.log(testArray[0].length);
const test = new HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
// test.entries();
// console.log(test.buckets)
test.keys();