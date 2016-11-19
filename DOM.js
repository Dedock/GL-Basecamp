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

    for (var i = 1; i <= 15; i++) {
        cell.innerText = i;
        fragment.appendChild(cell.cloneNode(true));
    }


    fragment.appendChild(emptyCell);

    field.appendChild(fragment);

    var element = document.querySelector("div.battlefield");

    element.addEventListener('click', function (e) {
        e.target;
    })

}

pyatnashki();