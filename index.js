const hashmap = () => {
  const map = {
      size: 16,
      buckets: new Array(16).fill(null).map(() => [])
  };

  const hash = (key) => {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % map.size;
      }
      return hashCode;
  }; 

  const checkIndexBounds = (index) => {
    // Check that index is within bounds
    if (index < 0 || index >= map.buckets.length) {
        throw new Error("Trying to access index out of bounds");
    }
  };

  const set = (key, value) => {
      const index = hash(key);
      const bucket = map.buckets[index];
      checkIndexBounds(index);
      // Check if key already exists in the bucket
      for (let i = 0; i < bucket.length; i++) {
          if (bucket[i].key === key) {
              // If key exists, update the value
              bucket[i].value = value;
              return;
          }
      }
      // If key doesn't exist, push a new entry
      bucket.push({ key, value });
  };

  const get = (key) => {
    const index = hash(key);
    const bucket = map.buckets[index];
    checkIndexBounds(index);
    // Checks if key matches and existing entry
    for(let i = 0; i < bucket.length; i++){
      if(bucket[i].key === key){
        // Return the value associated with that key
        return bucket[i].value;
      } 
    }
    return null;
  }

  const has = (key) => {
    const index = hash(key);
    const bucket = map.buckets[index];
    checkIndexBounds(index);
    // Checks if key matches and existing entry
    for(let i = 0; i < bucket.length; i++){
      if(bucket[i].key === key){
        return true;
      } 
    }
    return false;
  }

  const remove = (key) => {
    const index = hash(key);
    const bucket = map.buckets[index];
    checkIndexBounds(index);
    // Checks if key matches and existing entry
    for(let i = 0; i < bucket.length; i++){
      if(bucket[i].key === key){
        // Remove the entry with that key
        bucket.splice(i, 1); // Remove 1 element starting at index i
        return true;
      } 
    }
    return false;
  }

  const length = () => {
    let count = 0;
    for(let i = 0; i < map.buckets.length; i++){
      count += map.buckets[i].length
    }
    return count;
  }

  const clear = () => {
    map.buckets = new Array(map.size).fill(null).map(() => []);
  }

  const keys = () => {
    const arr = [];
    // Add all keys to the array
    for (let i = 0; i < map.buckets.length; i++) {
        const bucket = map.buckets[i];
        for (let j = 0; j < bucket.length; j++) {
            arr.push(bucket[j].key);
        }
    }
    return arr;
  };

  const values = () => {
    const arr = [];
    // Add all values to the array
    for (let i = 0; i < map.buckets.length; i++) {
        const bucket = map.buckets[i];
        for (let j = 0; j < bucket.length; j++) {
            arr.push(bucket[j].value);
        }
    }
    return arr;
  }

  const entries = () => {
    const arr = [];
    // Add all entries to the array
    for (let i = 0; i < map.buckets.length; i++) {
        const bucket = map.buckets[i];
        for (let j = 0; j < bucket.length; j++) {
          arr.push([bucket[j].key, bucket[j].value]);
        }
    }
    return arr;
  }

  return { 
    hash,
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries
   };
};
// Example
const myMap = hashmap();
myMap.set("Jeff", "I am the old value")
myMap.set("Jeff", "I am the new value")
myMap.set("Bob", "My name is Bob")
myMap.set("Chris", "My name is Chris")
console.log(myMap.get("Jeff"));
console.log(myMap.has("Carlos"));
console.log(myMap.length());
console.log(myMap.keys());
console.log(myMap.values());
console.log(myMap.entries());
myMap.clear()
console.log(myMap.has("Jeff"));
console.log(myMap.length());
console.log(myMap.entries())