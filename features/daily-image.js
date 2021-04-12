/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const axios = require('axios');

module.exports = function(controller) {
 
  controller.on('slash_command', async (bot, message) => {
    console.log(message);
    if (message.command == '/daily-image') {
      let imageSearchString = getImageQueryString(message.text.trim());
      console.log('Image Search String = '+imageSearchString);
      await getImage(bot, message, imageSearchString);
    }
  });
 };

async function getImage(bot, message, imageSearchString) {
  let searchUrl = 'https://api.bing.microsoft.com/v7.0/images/search?q='+imageSearchString+'&size=medium&mkt=en-us&count=50'
  let searchResponse = await axios.get(searchUrl, { 
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.BING_SEARCH_API_KEY
    }
  })
  let imageResult = searchResponse.data.value[Math.floor(Math.random() * searchResponse.data.value.length)];
  console.log(`Image web search url: ${imageResult.webSearchUrl}`);
  console.log(`Image content url: ${imageResult.contentUrl}`);
  await bot.reply(message, imageResult.contentUrl);
};

function getImageQueryString(messageText){
  if (messageText != "") {
    return messageText;
  }
  let day = new Date().getDay();
  let searchString = 'funny+meme';
  console.log("Today is day #"+day);
  switch(day) {
    case "1": //monday
      searchString = 'monday+funny+meme';
      break;
    case "2": //tuesday
      searchString = 'taco+tuesday+funny+meme';
      break;
    case "3": //wednesday
      searchString = 'camel+wednesday+hump+day+funny+meme';
      break;
    case "4": //thursday
      searchString = 'thursday+funny+meme';
      break;
    case "5": //friday
      searchString = 'friday+funny+meme';
      break;
    default: //weekend
      searchString = 'weekend+funny+meme';
  }
  console.log("DAYSTRING = "+ searchString);
  return searchString
};

