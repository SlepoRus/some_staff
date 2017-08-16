const express = require('express');
const app = express();
const server_config = require('./config/server_config.json');
const logger = require('./config/logger');
const simple_template = require('./template/');
const { PORT, dev_assets, prod_assets } = server_config;
const asset = process.env.NODE_ENV !== 'production' ? dev_assets : prod_assets;

app.listen(PORT, function(err) {
  if (!err) logger.debug('Server started');
  else logger.danger(err);
})
app.use('/public', express.static(__dirname.substr(0,__dirname.length-4) + '/public'));
app.use((req,res) => {
  return res.end(simple_template(asset));
})
