function extractCharacters(str) {
    var result = str.toLowerCase().split('');
    for (var i = 0; i < result.length; i++) {
        for (var j = i + 1; j < result.length;) {
            if (result[i] === result[j]) {
                result.splice(j, 1);
            } else j++;
        }
    }
    console.log(result);
}


function createLogger(prefix) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        args.splice(0, 0, new Date().toISOString(), prefix,':');
        console.log.apply(console, args);
    };
}

var myLogger = createLogger('My Logger');

myLogger('some data');

myLogger({data: 1});

myLogger('My data is -', {data: 1});

function argumentsSum() {
    var sum = 0,
        args = Array.prototype.slice.call(arguments);
    for (var i = 0; i < args.length; i++) {
        if (args[i] instanceof Array) {
            args = args.concat(args[i]);
            args.splice(i, 1);
        }
        sum += +args[i];
    }
    return sum;
}

function celsiusToFahrenheit(celsius) {
    var fahrenheit = celsius;
    fahrenheit = celsius * 1.8 + 32;
    console.log(celsius + '℃ is ' + fahrenheit + '℉')
}
function fahrenheitToCelsius(fahrenheit) {
    var celsius = fahrenheit;
    celsius = (fahrenheit - 32) / 1.8;
    console.log(fahrenheit + '℉ is ' + celsius + '℃')
}

function findTheLongestWord(str) {
    var splitStr = str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(' '),
        maxLength = 0,
        position;

    for (var i = 0; i < splitStr.length; i++) {
        if (splitStr[i].length > maxLength) {
            maxLength = splitStr[i].length;
            position = i;
        }
    }
    return splitStr[position];
}
