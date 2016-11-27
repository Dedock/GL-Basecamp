var index = 0;


document.querySelector('.prev').addEventListener('click', () => {
    if (index !== 1) {
        index--;
    }
    loading('listInfo');
    loading('listFilms');

    doAjaxCall('http://swapi.co/api/people/' + index + '/')
        .then(fillCharacterInfo)
        .then(fillFilms)
        .catch(characterDoesntExist);
});

document.querySelector('.next').addEventListener('click', () => {
    if (index !== 88) {
        index++;
    }

    loading('listInfo');
    loading('listFilms');

    doAjaxCall('http://swapi.co/api/people/' + index + '/')
        .then(fillCharacterInfo)
        .then(fillFilms)
        .catch(characterDoesntExist);
});


/*create click to start loading firs character*/
(function createClick(elem) {
    var event = new Event('click', {
        bubbles: true,
        cancelable: false
    });
    elem.dispatchEvent(event);
})(document.querySelector('.next'));

/**
 * make CORS Ajax request
 * @param {String}url URL of the page we're requesting
 * @returns {Promise.<TResult>} promise with parsed promise.value
 */
function doAjaxCall(url) {
    return fetch(url, {
        method: 'GET',
        mode: 'cors'
    })
        .then(function checkStatus(response) {
            if (response.status >= 200 && response.status < 300) {
                return response;
            } else {
                var error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        })
        .then(function json(response) {
            return response.json();
        })
}

/**
 * show on UI received data about StarWars character
 * @param {Promise} data promise with parsed promise.value
 * @returns {Promise.<*>} array of promise with parsed promise.value
 */
function fillCharacterInfo(data) {
    removeAllNodeChildren('.listInfo');
    var list = document.querySelector('.listInfo');

    var list2 = document.createElement('div');
    var item = document.createElement('li');

    var character = new Character(data);

    list.setAttribute('name',character.name);

    list2.appendChild(item.cloneNode(false)).innerHTML = 'Name: ' + character.name;
    list2.appendChild(item.cloneNode(false)).innerHTML = 'Height: ' + character.height;
    list2.appendChild(item.cloneNode(false)).innerHTML = 'Mass: ' + character.mass;
    list2.appendChild(item.cloneNode(false)).innerHTML = 'Hair Color: ' + character.hair_color;
    list2.appendChild(item.cloneNode(false)).innerHTML = 'Skin Color: ' + character.skin_color;
    list2.appendChild(item.cloneNode(false)).innerHTML = 'Eye Color: ' + character.eye_color;
    list2.appendChild(item.cloneNode(false)).innerHTML = 'Birth Year: ' + character.birth_year;
    list2.appendChild(item.cloneNode(false)).innerHTML = 'Gender: ' + character.gender;

    var typeWriter = setupTypewriter(list, list2.innerHTML);

    typeWriter.type();

    return Promise.all(character.films.map(function (film) {
        return doAjaxCall(film);
    }));
}

/**
 * show on UI received data about films in which StarWars character took part
 * @param {Array} data array of promise with parsed promise.value
 */
function fillFilms(data) {
    var films = data.slice();
    films.forEach(function (film) {
        return new Film(film);
    });
    var list = document.createElement('div');
    removeAllNodeChildren('.listFilms');

    films.sort(function (a, b) {
        return a.episode_id - b.episode_id;
    });
    films.forEach(function (film) {
        list.appendChild(document.createElement('li')).textContent = 'Episode ' + film.episode_id + ': ' + film.title;
    });

    var typeWriter = setupTypewriter(document.body.querySelector('.listFilms'), list.innerHTML);

    typeWriter.type();

}
/**
 * show that content of DOM element is loading
 * @param {String} selector selector of DOM element
 */
function loading(selector) {
    var loading = document.createElement('img');
    var lis = document.createElement('ul');
    var parent = document.body.querySelector('.' + selector).parentNode;
    loading.src = './photo/Empire-01-june.gif';
    loading.classList.add('loadingGif');
    document.body.querySelector('.' + selector).parentNode.removeChild(document.body.querySelector('.' + selector));
    lis.classList.add(selector);
    lis.appendChild(loading);
    parent.appendChild(lis);
}

function Character(person) {
    this.name = person.name;
    this.height = person.height;
    this.mass = person.mass;
    this.hair_color = person.hair_color;
    this.skin_color = person.skin_color;
    this.eye_color = person.eye_color;
    this.birth_year = person.birth_year;
    this.gender = person.gender;
    this.films = person.films.slice();
}

function Film(film) {
    this.episode_id = film.episode_id;
    this.title = film.title;
}
/**
 * clear content of DOM element
 * @param {String} selector
 */
function removeAllNodeChildren(selector) {
    while (document.body.querySelector(selector).hasChildNodes()) {
        document.body.querySelector(selector).removeChild(document.body.querySelector(selector).lastChild);
    }
}
/**
 * error handler
 */
function characterDoesntExist() {
    removeAllNodeChildren('.listInfo');
    removeAllNodeChildren('.listFilms');
    document.body.querySelector('.listInfo').innerHTML = 'Sorry, character doesn\'t exist';
}
/**
 * return function which fill text with typewrite effect
 * @param {Node} where
 * @param {String} what
 * @returns {{type: type}}
 */
function setupTypewriter(where, what) {
    where.innerHTML = "";

    var cursorPosition = 0,
        tag = "",
        writingTag = false,
        tagOpen = false,
        typeSpeed = 100,
        tempTypeSpeed = 0;

    var type = function () {

        if (writingTag === true) {
            tag += what[cursorPosition];
        }

        if (what[cursorPosition] === "<") {
            tempTypeSpeed = 0;
            if (tagOpen) {
                tagOpen = false;
                writingTag = true;
            } else {
                tag = "";
                tagOpen = true;
                writingTag = true;
                tag += what[cursorPosition];
            }
        }
        if (!writingTag && tagOpen) {
            tag.innerHTML += what[cursorPosition];
        }
        if (!writingTag && !tagOpen) {
            if (what[cursorPosition] === " ") {
                tempTypeSpeed = 0;
            }
            else {
                tempTypeSpeed = (Math.random() * typeSpeed) + 50;
            }
            where.innerHTML += what[cursorPosition];
        }
        if (writingTag === true && what[cursorPosition] === ">") {
            tempTypeSpeed = (Math.random() * typeSpeed) + 50;
            writingTag = false;
            if (tagOpen) {
                var newSpan = document.createElement(tag.replace(/\W/g, ''));
                where.appendChild(newSpan);
                tag = newSpan;
            }
        }

        cursorPosition += 1;
        if (cursorPosition < what.length - 1) {
            setTimeout(type, tempTypeSpeed);
        }

    };

    return {
        type: type
    };
}
