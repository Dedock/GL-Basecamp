var P = {};

P.Model = function () {
    var self = this;
    var cells = [];

    if (localStorage.getItem('cells')) {
        cells = JSON.parse(localStorage.getItem('cells'));
    } else {
        var i = 0;
        while (i !== 15) {
            cells[i] = {
                innerHTML: i + 1,
                movable: false
            };
            i++;
        }
        cells[15] = {
            innerHTML: '',
            movable: false
        };
    }

    this.changeObservableSubject = makeObservableSubject();
    this.notifyObservers = this.changeObservableSubject.notifyObservers;

    this.moveCells = function (cellIndex) {
        if (cells[cellIndex].movable) {
            for (var i = cellIndex - 4; i < cellIndex + 5; i++) {
                if (cells[i]) {
                    if (cells[i].innerHTML === '') {
                        var firstCell = cells[cellIndex];
                        var secondCell = cells[i];
                        cells.splice(cellIndex, 1, secondCell);
                        cells.splice(i, 1, firstCell);
                        break;
                    }
                }
            }

            self.checkWin();
            self.checkMovable();
            localStorage.setItem('cells', JSON.stringify(cells));
            self.notifyObservers(cellIndex, i);
        }
    };

    this.getCells = function () {
        return cells;
    };


    this.checkWin = function () {
        var flag = true;
        for (var i = 0; i < 14; i++) {
            if (+cells[i].innerHTML + 1 !== +cells[i + 1].innerHTML) {
                flag = false;
                break;
            }
        }
        if (flag) {
            alert('you win');
        }
    };


    (this.checkMovable = function () {
        function makeMovable(index) {
            cells[index].movable = true;
        }

        for (var i = 0; i < cells.length; i++) {
            cells[i].movable = false;
        }
        for (i = 0; i < cells.length; i++) {
            if (cells[i].innerHTML == "") {
                switch (i) {
                    case 0:
                        makeMovable(i + 1);
                        makeMovable(i + 4);
                        break;
                    case 1:
                    case 2:
                        makeMovable(i - 1);
                        makeMovable(i + 1);
                        makeMovable(i + 4);
                        break;
                    case 3:
                        makeMovable(i - 1);
                        makeMovable(i + 4);
                        break;
                    case 4:
                        makeMovable(i - 4);
                        makeMovable(i + 4);
                        makeMovable(i + 1);
                        break;
                    case 5:
                    case 6:
                    case 9:
                    case 10:
                        makeMovable(i - 4);
                        makeMovable(i + 4);
                        makeMovable(i + 1);
                        makeMovable(i - 1);
                        break;
                    case 7:
                    case 11:
                        makeMovable(i - 4);
                        makeMovable(i + 4);
                        makeMovable(i - 1);
                        break;
                    case 8:
                        makeMovable(i - 4);
                        makeMovable(i + 1);
                        makeMovable(i + 4);
                        break;
                    case 12:
                        makeMovable(i - 4);
                        makeMovable(i + 1);
                        break;
                    case 13:
                    case 14:
                        makeMovable(i - 4);
                        makeMovable(i - 1);
                        makeMovable(i + 1);
                        break;
                    case 15:
                        makeMovable(i - 4);
                        makeMovable(i - 1);
                        break;
                }
            }
        }
    })();
};


P.View = function (model, rootObject) {
    var self = this;
    this.field = document.createElement('div');
    var fragment = document.createDocumentFragment();
    var cell = document.createElement('div');
    var emptyCell = document.createElement('div');

    self.field.style.width = '500px';
    self.field.style.height = '500px';
    self.field.style.border = '1px solid black';


    cell.style.height = '115px';
    cell.style.width = '115px';
    cell.style.border = '1px solid black';
    cell.style.float = 'left';
    cell.style.margin = '4px';
    cell.style.textAlign = 'center';
    cell.style.fontSize = '50px';
    cell.style.lineHeight = '110px';

    emptyCell.style.height = '115px';
    emptyCell.style.width = '115px';
    emptyCell.style.float = 'left';
    emptyCell.style.margin = '4px';
    emptyCell.style.border = '1px solid white';


    for (var i = 0; i < 16; i++) {
        if (model.getCells()[i].innerHTML === '') {
            fragment.appendChild(emptyCell);
        } else {
            cell.innerHTML = model.getCells()[i].innerHTML;
            fragment.appendChild(cell.cloneNode(true));
        }
    }


    this.swapElements = function (obj1, obj2) {
        obj1 = self.field.children[obj1];
        obj2 = self.field.children[obj2];

        if (obj1 === obj1.parentNode.lastChild) {
            var next2 = obj2.nextSibling;
            if (obj1.previousSibling === obj2) {
                obj1.parentNode.insertBefore(obj1, obj2);
            } else {
                obj1.parentNode.insertBefore(obj2, obj1);
                obj1.parentNode.insertBefore(obj1, next2);
            }
            return;
        }
        if (obj2 === obj1.parentNode.lastChild) {
            var next1 = obj1.nextSibling;
            if (obj1 === obj2.previousSibling) {
                obj1.parentNode.insertBefore(obj2, obj1);
            } else {
                obj1.parentNode.insertBefore(obj1, obj2);
                obj1.parentNode.insertBefore(obj2, next1);
            }
            return;
        }
        if (obj1 === obj1.parentNode.firstChild) {
            next2 = obj2.nextSibling;
            if (obj1.nextSibling === obj2) {
                obj1.parentNode.insertBefore(obj2, obj1);
            } else {
                obj1.parentNode.insertBefore(obj2, obj1);
                obj1.parentNode.insertBefore(obj1, next2);
            }
            return;
        }
        if (obj2 === obj1.parentNode.firstChild) {
            next1 = obj1.nextSibling;
            if (obj1 === obj2.nextSibling) {
                obj1.parentNode.insertBefore(obj1, obj2);
            } else {
                obj1.parentNode.insertBefore(obj1, obj2);
                obj1.parentNode.insertBefore(obj2, next1);
            }
            return;
        }
        else {
            var prev1 = obj1.previousSibling,
                prev2 = obj2.previousSibling;

            insertAfter(obj2, prev1);
            insertAfter(obj1, prev2);
        }
    };

    this.field.appendChild(fragment);
    rootObject.appendChild(this.field);

    model.changeObservableSubject.addObserver(self.swapElements);

};

P.Controller = function (model, view) {
    view.field.addEventListener('click', function (e) {
        model.moveCells(Array.prototype.indexOf.call(view.field.children, e.target));
    });
};

var makeObservableSubject = function () {
    var observers = [];

    var addObserver = function (o) {
        if (typeof o !== 'function') {
            throw new Error('observer must be a function');
        }
        for (var i = 0, ilen = observers.length; i < ilen; i++) {
            var observer = observers[i];
            if (observer === o) {
                throw new Error('observer already in the list');
            }
        }
        observers.push(o);
    };

    var removeObserver = function (o) {
        for (var i = 0, ilen = observers.length; i < ilen; i++) {
            var observer = observers[i];
            if (observer === o) {
                observers.splice(i, 1);
                return;
            }
        }
        throw new Error('could not find observer in list of observers');
    };

    var notifyObservers = function () {
        var observersSnapshot = observers.slice(0);
        for (var i = 0, ilen = observersSnapshot.length; i < ilen; i++) {
            observersSnapshot[i].apply(this, arguments);
        }
    };

    return {
        addObserver: addObserver,
        removeObserver: removeObserver,
        notifyObservers: notifyObservers
    };
};

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}


var model = new P.Model();
var view = new P.View(model, document.body);
var controller = new P.Controller(model, view);

