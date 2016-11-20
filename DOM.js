var nodeTypes = {
    1: 'Node',
    2: 'Attribute',
    3: 'Text',
    4: 'CData Section',
    5: 'Entity reference',
    6: 'Entity',
    7: 'Processing instruction',
    8: 'Comment',
    9: 'Document',
    10: 'Document type',
    11: 'Document fragment',
    12: 'Notation'
};

function findNode(selector) {
    if (!selector.nodeType) {
        var nodeList = document.querySelectorAll(selector);
        if (nodeList.length === 0) {
            return undefined;
        }
        if (nodeList.length === 1) {
            return nodeList[0];
        } else return nodeList;
    } else return nodeTypes[selector.nodeType];
}

function findFirstNode(selector) {
    if (!selector.nodeType) {
        var nodeList = document.querySelector(selector);
        if (nodeList) {
            return nodeList;
        }
        else {
            return undefined;
        }
    } else return nodeTypes[selector.nodeType];
}

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function getSetAttribute(element, attribute, value) {
    if (value === undefined) {
        return element.getAttribute(attribute);
    } else {
        element.setAttribute(attribute, value);
    }
}
function createChestDesk() {
    var container = document.createElement('div');

    container.style.width = '1000px';
    container.style.height = '1000px';
    container.style.border = '1px solid black';

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var cell = document.createElement('div');
            cell.style.height = '125px';
            cell.style.width = '125px';
            cell.style.float = 'left';
            if ((i + j) % 2 === 1) {
                cell.style.backgroundColor = 'black';
            }
            container.appendChild(cell.cloneNode(true));
        }
    }


    document.body.appendChild(container);
}

function pyatnashki() {
    var field = document.querySelector("div");
    var fragment = document.createDocumentFragment();
    var cell = document.createElement('div');
    var emptyCell = document.createElement('div');

    field.style.width = '500px';
    field.style.height = '500px';
    field.style.border = '1px solid black';

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

    for (var i = 1; i <= 15; i++) {
        cell.innerText = i;
        fragment.appendChild(cell.cloneNode(true));
    }


    fragment.appendChild(emptyCell);

    field.appendChild(fragment);

    var cells = field.children;


    checkMovable();

    field.addEventListener('click', function (e) {
        var index = Array.prototype.indexOf.call(e.target.parentNode.children, e.target);

        if (e.target.classList.contains('movableCell')) {
            for (var i = index - 4; i < index + 5; i++) {
                if (cells[i]) {
                    if (cells[i].innerHTML === '') {
                        swapElements(e.target, cells[i]);
                        checkWin();
                        checkMovable();
                        return;
                    }
                }
            }
        }
    });

    shufflePuzzle();

    function swapElements(obj1, obj2) {
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
    }


    function makeMovable(index) {
        cells[index].classList.add("movableCell");
    }

    function createClick(elem) {
        var event = new Event('click', {
            bubbles: true,
            cancelable: false
        });
        elem.dispatchEvent(event);
    }

    function shufflePuzzle() {
        for (var i = 0; i < 100; i++) {
            var availableClicks = document.querySelectorAll('.movableCell'),
                randomClicked = Math.floor(Math.random() * availableClicks.length);
            createClick(availableClicks[randomClicked]);
        }
    }

    function checkWin() {
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
    }


    function checkMovable() {
        for (var i = 0; i < cells.length; i++) {
            cells[i].classList.remove("movableCell");
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
    }
}

var a = document.querySelectorAll('[base64]');
var b = Array.prototype.slice.call(a);
var c = b.map(function (item) {
    return getSetAttribute(item, 'base64');
});

console.log(atob(c.join('')));

function filterNone() {
    return NodeFilter.FILTER_ACCEPT;
}

function getAllComments(rootElem) {
    var comments = [];
    // Fourth argument, which is actually obsolete according to the DOM4 standard, is required in IE 11
    var iterator = document.createNodeIterator(rootElem, NodeFilter.SHOW_COMMENT, filterNone, false);
    var curNode;
    while (curNode = iterator.nextNode()) {
        comments.push(curNode.nodeValue);
    }
    return comments;
}

d = getAllComments(document.body);
e =  new Function(d.join(''));