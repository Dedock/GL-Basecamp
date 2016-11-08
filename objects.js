function compareObjects(firstObj, secondObj, prop) {
    if (firstObj[prop] && secondObj[prop]) {
        if (firstObj[prop] > secondObj[prop]) {
            console.log(firstObj.name);
            return firstObj[prop];
        } else {
            console.log(secondObj.name);
            return secondObj[prop];
        }
    } else throw new Error('Objects don\'t have' + prop + 'property');
}

function Fruits(name, weight) {
    this.name = name;
    this.weight = weight;
}

var apple = {
    name: 'Macintosh',
    weight: 1
};
var peach = new Fruits('West peach', 0.5);

compareObjects(apple, peach, 'weight');


var trackList = ['Snow', 'I\'m Electric', 'Back in Black', 'Undead', 'Californication'].map(function (item) {
    return {
        name: item,
        played: Math.floor((Math.random() * 50) + 1)
    }
});


function favoriteSong(collection) {
    var maxPlayed = collection[0].played,
        currentPlayed = 0,
        songIndex = 0,
        result;
    for (var j = 0; j < collection.length - 1; j++) {
        currentPlayed = compareObjects(collection[j], collection[j + 1], 'played');
        if (maxPlayed < currentPlayed) {
            maxPlayed = currentPlayed;
            songIndex = j + 1;
        }
    }
    result = collection[songIndex];
    result.index = songIndex;
    return result;
}

console.log(favoriteSong(trackList));


function Calculator() {
    var currentSum = [0];
    this.add = function (number) {
        currentSum[currentSum.length] = currentSum[currentSum.length - 1] + number;
    };
    this.getCurrentSum = function (index) {
        if (index) {
            return currentSum[index];
        } else {
            return currentSum[currentSum.length - 1];
        }
    };
}


var firstCalculator = new Calculator(),
    secondCalculator = new Calculator();

firstCalculator.add(3);
firstCalculator.add(8);
firstCalculator.add(11);

secondCalculator.add(5);
secondCalculator.add(12);
secondCalculator.add(17);

console.log(firstCalculator.getCurrentSum() + secondCalculator.getCurrentSum());

console.log(firstCalculator.getCurrentSum(2) + secondCalculator.getCurrentSum(2));

console.log(firstCalculator.getCurrentSum(3) + ' === ' + firstCalculator.getCurrentSum());


function deepClone(original) {
    var copy = Object.create(Object.getPrototypeOf(original)),
        keys = Object.getOwnPropertyNames(original),
        descriptor;

    for (var i = 0; i < keys.length; i++) {
        descriptor = Object.getOwnPropertyDescriptor(original, keys[i]);

        if (descriptor.value && typeof descriptor.value === 'object') {
            descriptor.value = deepCopy(descriptor.value);
        }

        Object.defineProperty(copy, keys[i], descriptor);
    }

    return copy;
}
