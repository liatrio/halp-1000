/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const axios = require('axios');
async function getImage(bot, message) {
  var searchUrl = 'https://api.bing.microsoft.com/v7.0/images/search?q=camel+hump+day&size=medium&mkt=en-us&count=50'
  await axios.get(searchUrl, { 
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY
    }
  })
  .then(response => {
    console.log(response);
    let imageResult = response.data.value[Math.floor(Math.random() * response.data.value.length)];
    console.log(`Image result count: ${response.data.value.length}`);
    console.log(`First image content url: ${imageResult.contentUrl}`);
    console.log(`First image web search url: ${imageResult.webSearchUrl}`);
    bot.reply(message, imageResult.contentUrl);
  })
  .catch(error => {
    console.log(error);
  });
};

module.exports = function(controller) {
 
  controller.on('slash_command', async (bot, message) => {
    console.log(message);
    if (message.command == '/daily-image') {
      await getImage(bot, message);
    }
  });
 };
