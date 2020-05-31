'use strict';
module.exports = (request, response) => {
  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>og-card-simulator</title>
        <link rel="stylesheet" href="css/app.css">
      </head>
      <body>
        <div class="container">
          <h2>Show open graph card from URL</h2>
          <div class="input">
            <textarea></textarea>
          </div>
          <h2>Card example</h2>
          <div class="output">
            <div class="content"></div>
            <div class="card-wrapper"></div>
          </div>
        </div>
        <script src="js/app.js"></script>
      </body>
    </html>`;
  response.send(html);
};
