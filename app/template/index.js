module.exports = function(asset) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="${asset}/public/dist/styles.css">
        <link rel="shortcut icon" href="/public/favicon.ico" type="image/x-icon">
        <title>Repository issues</title>
      </head>
      <body>
        <div id="react-view"></div>
        <script src="${asset}/public/dist/bundle.js"></script>
      </body>
    </html>
  `
}
