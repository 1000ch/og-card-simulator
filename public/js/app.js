"use strict";

const URL = /(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*/g;

const linkify = string => {

  let matches = string.match(URL);

  if (!matches) {
    return string;
  }

  matches = matches.filter((url, i, array) => i === array.indexOf(url));

  while (matches.length) {
    let url = matches.shift();
    let regexp = new RegExp(url, 'g');
    string = string.replace(regexp, `<a href="${url}">${url}</a>`);
  }

  return string;
};

const fetchify = string => {

  let matches = URL.exec(string);

  if (!matches) {
    return Promise.reject({});
  }

  if (matches.length !== 0) {

    let url = matches.shift();
    let cache = sessionStorage.getItem(url);

    if (cache) {
      return Promise.resolve(JSON.parse(cache));
    }

    return fetch('/api/og', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        url: url
      })
    }).then(response => response.json())
      .then(data => {
        sessionStorage.setItem(url, JSON.stringify(data));
        return data;
      });

  } else {
    return Promise.reject({});
  }
};

const createCard = data => {
  return `<a href="${data.url}" target="_blank">
            <div class="card">
              <div>
                <img width="100" height="100" src="${data.image}">
              </div>
              <div>
                <h2>${data.title}</h2>
                <p>${data.description}</p>
              </div>
            </div>
          </a>`;
};

window.onload = e => {

  let textarea = document.querySelector('textarea');
  let post = document.querySelector('.post');
  let content = document.querySelector('.content');
  let wrapper = document.querySelector('.card-wrapper');

  textarea.addEventListener('input', () => {

    content.innerHTML = linkify(textarea.value);

    fetchify(textarea.value).then(data => {
      wrapper.innerHTML = createCard(data);
    }).catch(error => {
      wrapper.innerHTML = '';
    });
  });
};
