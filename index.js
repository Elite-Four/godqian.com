/**
 * @file entry
 * @author o.o@mug.dog
 */

const Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keynZdgF8AWA4v8OA'
});
const base = Airtable.base('app4cVgEKayWtPKz8');

function renderComments(list) {
    const fragment = new DocumentFragment();
    list.forEach(item => {
        const $comment = document.createElement('div');
        const $username = document.createElement('div');
        const $content = document.createElement('div');
        const $datetime = document.createElement('span');

        $username.innerText = item.username || '匿名';
        $content.innerText = item.content || '';

        const d = new Date(item.datetime);
        $datetime.innerText = new Date(item.datetime) <= 1596530702000
            ? ' - 很久以前'
            : ` - ${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

        $comment.classList.add('box');
        $username.classList.add('has-text-weight-bold', 'is-size-4');
        $datetime.classList.add('has-text-grey-dark', 'has-text-weight-light', 'is-size-7', 'ml-2');

        $comment.appendChild($username);
        $username.appendChild($datetime);
        $comment.appendChild($content);
        fragment.appendChild($comment);
    });
    return fragment;
}

function insertComments(list) {
    const fragment = renderComments(list);
    const $list = document.getElementById('comment-list');
    $list.insertBefore(fragment, $list.childNodes[0]);
}

function appendComments(list) {
    const fragment = renderComments(list);
    const $list = document.getElementById('comment-list');
    $list.appendChild(fragment);
}

function getList() {
    base('Godqian').select({
        sort: [{field: 'datetime', direction: 'desc'}],
        pageSize: 50,
        view: 'Worship'
    }).eachPage(function page(records, fetchNextPage) {
        appendComments(
            records.map(record => ({
                username: record.get('username'),
                content: record.get('content'),
                datetime: record.get('datetime')
            })
        ));
        window.nextPageHandler = fetchNextPage;
    }, function done(err) {
        if (err) {
            console.error(err);
        }
    });
}

const $comment = document.getElementById('comment');
$comment.addEventListener('submit', e => {
    e.preventDefault();
    const $formItems = e.target.elements;
    const fields = {};
    for (const $item of $formItems) {
        if ($item.name) {
            fields[$item.name] = $item.value;
        }
    }
    base('Godqian').create([
        {fields}
    ], (err, records) => {
        if (err) {
            console.error(err);
            return;
        }
        e.target.reset();
        insertComments(
            records.map(record => ({
                username: record.get('username'),
                content: record.get('content'),
                datetime: record.get('datetime')
            })
        ));
    });
});

function nextPage(e) {
    const maxHeight = document.body.clientHeight;
    const scrollTop = document.scrollTop || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    if (window.nextPageHandler && windowHeight + scrollTop >= maxHeight) {
        window.nextPageHandler();
    }
}

window.onscroll = nextPage;

window.onload = getList;
