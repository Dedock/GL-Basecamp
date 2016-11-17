/*
 Напишите функцию, которая принимает 1 аргумент и возварщает его тип
 */
function getDataType(variable) {
    return typeof variable;
}

/*
 Напишите функцию, которая принимает 1 аргумент и возвращает:
 'primitive' если тип данных относится к примивным
 'primitive-special' если тип данных специальный
 'object' - если простой обьект
 'object-array' - если массив
 'object-function' - если функция
 */
function getDataTypePseudoName(variable) {
    var variableType = typeof variable;

    if (variableType === 'object') {
        if (variable) {
            if (variable.constructor === Array) {
                return 'object-array';
            }
            return 'object';
        } else {
            return 'primitive-special';
        }
    }
    if (variableType === 'undefined') {
        return 'primitive-special';
    }
    if (variableType === 'function') {
        return 'object-function';
    }
    else {
        return 'primitive';
    }
}


/*
 Напишите функцию, которая принимает 2 аргумента,
 и возврвщает 1 если их значения и их типы равны,
 0 если равны только значения
 и -1 в другом случае
 */
function compareByType(a, b) {
    if (a == b) {
        if (getDataType(a) === getDataType(b)) return 1;
        else return 0;
    } else return -1;
}
// Numbers

/*
 Напишите функцию, которая принимает 1 аргумент,
 и в случае если аргумент имеет числовой тип увеличивает его на 1
 и возврвщвет результат,
 в любом другом случае возврвщвет -1
 */
function increase(value) {
    if (getDataType(value) === 'number') {
        if (testForSafeNumber(value) === 'safe') {
            return ++value;
        } else return -1;
    }
    else return -1;
}

/*
 Напишите функцию, которая принимает 1 аргумент(число),
 и в случае если аргумент не Infinity или NaN возвращает строку 'safe' иначе 'danger'
 */
function testForSafeNumber(value) {
    if (isNaN(value * 0)) return 'danger';
    else return 'safe';
}


// Strings

/*
 Напишите функцию, которая принимает 1 аргумент (строку),
 и возвращает массив из елементов строки разделенных по пробелу ' '
 */
function stringToArray(str) {
    return str.split(' ');
}


/*
 Напишите функцию, которая принимает 1 аргумент (строку),
 и возвращает часть этой строки до первой запятой
 */
function getStringPart(str) {
    return str.split(',')[0];
}

/*
 Напишите функцию, которая принимает 2 аргумента (строку и симовл),
 и возвращает порядковый номер симовола в строе если символ встречается в строке 1 раз,
 false в противоположном случае
 */
function isSingleSymbolMatch(str, symbol) {
    var result = str.indexOf(symbol);
    if (result === -1 || str.indexOf(symbol, result + 1) != -1) {
        return false;
    } else {
        return result
    }
}

/*
 Напишите функцию, которая принимает 2 аргумента,
 массив в разделитель[опционально],
 и возвращает строку ввиде элементов массива c разделителями если разделитель задан
 или строку разделенную "-" если не задан
 */
function join(array, separator) {
    separator = separator || '-';
    return array.join(separator);
}


/*
 Напишите функцию, которая принимает 2 массива,
 и возвращает один состоящий из элементов перового и второго (последовательно сначала первый потом второй)
 */
function glue(arrA, arrB) {
    return arrA.concat(arrB);
}


/*
 Напишите функцию, которая принимает 1 массив,
 и возвращает другой массив отсортированный от большего к меньшему
 */
function order(arr) {
        return arr.slice().sort(function (a, b) {
            if (a > b) return -1;
            if (a < b) return 1;
            return 0;
        });
}


/*
 Напишите функцию, которая принимает 1 массив,
 и возвращает другой без чисел которые меньше 0
 */
function removeNegative(arr) {
    return arr.filter(function (item) {
        return item > 0;
    });
}

/*
 Напишите функцию, которая принимает 2 числовых массива,
 и возвращает новый массив, состоящий из элементов первого но без элементов
 которые присутствуют во втром
 [1,2,3], [1, 3] => [2]
 */
function without(arrA, arrB) {
    return arrA.filter(function (itemA) {
        for (var i = 0; i < arrB.length; i++) {
            if (arrB[i] === itemA) return false;
        }
        return true;
    })
}

