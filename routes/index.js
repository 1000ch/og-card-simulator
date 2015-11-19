"use strict";

module.exports = (request, response) => {
  response.send(`<!doctype html>
                  <html>
                    <head>
                      <meta charset="utf-8">
                      <title>og-card-simulator</title>
                      <link rel="stylesheet" href="css/app.css">
                    </head>
                    <body>
                      <h2>Show open graph card from URL</h2>
                      <form>
                        <textarea></textarea>
                      </form>
                      <h2>Card example</h2>
                      <div class="post">
                        <div class="content"></div>
                        <div class="card-wrapper"></div>
                      </div>
                      <script src="js/app.js"></script>
                    </body>
                  </html>`);
};
