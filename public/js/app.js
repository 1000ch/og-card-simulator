'use strict';
const URL = /(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*/g;

const linkify = string => {
  let matches = string.match(URL);

  if (!matches) {
    return string;
  }

  matches = matches.filter((url, i, array) => i === array.indexOf(url));

  while (matches.length > 0) {
    const url = matches.shift();
    const regexp = new RegExp(url, 'g');
    string = string.replace(regexp, `<a href="${url}">${url}</a>`);
  }

  return string;
};

const fetchify = async string => {
  const matches = URL.exec(string);

  if (!matches || matches.length === 0) {
    throw new Error('invalid url');
  }

  const url = matches.shift();
  const cache = sessionStorage.getItem(url);

  if (cache) {
    return JSON.parse(cache);
  }

  const response = await fetch('/api/og', {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      url
    })
  });

  const data = await response.json();
  sessionStorage.setItem(url, JSON.stringify(data));
  return data;
};

const createCard = data => {
  return `
    <a href="${data.url}" target="_blank">
      <div class="card">
        <img width="100" height="100" src="${data.image}">
        <div>
          <h2>${data.title}</h2>
          <p>${data.description}</p>
        </div>
      </div>
    </a>`;
};

window.addEventListener('load', () => {
  const textarea = document.querySelector('textarea');
  const content = document.querySelector('.content');
  const wrapper = document.querySelector('.card-wrapper');

  textarea.addEventListener('input', async () => {
    content.innerHTML = linkify(textarea.value);

    try {
      const data = await fetchify(textarea.value);
      wrapper.innerHTML = createCard(data);
    } catch (error) {
      console.info(error);
      wrapper.innerHTML = '';
    }
  });
});
