function doAjaxCall1(url, method, onSuccess, onError) {
    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                onSuccess(httpRequest.responseText);
            } else {
                onError();
            }
        }
    };

    httpRequest.open(method, url);
    httpRequest.send();

}
function doAjaxCall2(url, method) {
    return fetch(url, {
        method: method
    })
        .then(
            function (response) {
                if (response.status === 200) {
                    return response
                }
            }
        )
}
/*

 API

 GET api/books/:id -> get Book detais { id: 15, name: 'The Adventures of Tom Sawyer', authorId: 25 }

 GET api/authors/:id -> get Author detais { name: 'Mark Twain' books: [34, 57, 69, 15] }

 GET api/bestsellers/similar/:id
 -> get mutiple book names

 'The Prince and the Pauper',
 'Golden Age',
 'The Adventures of Huckleberry Finn',
 'Old Times on the Mississippi'



 */

/*

 HTML

 <div>
 <div id="book">

 </div>

 <div id="author">

 </div>

 <div id="similar">

 </div>
 </div>

 */


function getBookById1(id) {
    document.getElementById('book').textContent = 'Please wait. Book is loading';

    doAjaxCall('api/books/' + id, 'GET', function (response) {
        document.getElementById('book').textContent = response.name;
    }, function (response) {
        document.getElementById('book').textContent = 'Error. Please refresh your browser';
    })
}


function loadPage(bookId) {

    document.getElementById('book').textContent = 'Please wait. Book is loading';
    document.getElementById('author').textContent = 'Please wait. Author details are loading';
    document.getElementById('similar').textContent = 'Please wait. Similar books are loading';

    doAjaxCall2('api/books/' + id, 'GET', function (response) {
        document.getElementById('book').textContent = response.name;
        doAjaxCall2('api/autors' + response.authorId, 'GET', function (response) {
            document.getElementById('author').textContent = response.name;
            var similarBooksLoaded = 0;
            var similarBooksAmount = response.books.lenght;

            response.books.forEach(function (similarBookId) {
                doAjaxCall2('api/bestsellers/similar/' + similarBookId, 'GET', function (response) {
                    var p = document.getElementById('similar').appendChild('p').textContent = response;
                    similarBooksLoaded += 1;

                    if (similarBooksLoaded === similarBooksAmount) {
                        alert('Horray everything loaded');
                    }
                }, function () {
                    document.getElementById('similar').textContent = 'Error. Please refresh your browser';
                })
            })
        }, function () {
            document.getElementById('author').textContent = 'Error. Please refresh your browser';
        })
    }, function (response) {
        document.getElementById('book').textContent = 'Error. Please refresh your browser';
    })
}


function loadPage2(bookId) {

    document.getElementById('book').textContent = 'Please wait. Book is loading';
    document.getElementById('author').textContent = 'Please wait. Author details are loading';
    document.getElementById('similar').textContent = 'Please wait. Similar books are loading';

    fetch('api/books/' + bookId)
        .then(function getBookByAuthor(response) {
            document.getElementById('book').textContent = response.name;
            return fetch(('api/autors' + response.authorId));
        },function () {
            document.getElementById('book').textContent = 'Error. Please refresh your browser';
        })
        .then(function getSimilarBooks(response) {
            document.getElementById('author').textContent = response.name;

            return Promise.all(response.books.map(function (similarBookId) {
                fetch('api/bestsellers/similar/' + similarBookId);
            }))
        },function () {
            document.getElementById('author').textContent = 'Error. Please refresh your browser';
        })
        .then(function showBooks(response) {
            document.getElementById('similar').appendChild('p').textContent = response;
        }, function () {
            document.getElementById('book').textContent = 'Error. Please refresh your browser';
        })

}
/*

 Rewrite using fetch API https://developer.mozilla.org/ru/docs/Web/API/Fetch_API

 */
