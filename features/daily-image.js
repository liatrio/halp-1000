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
      //This is an interesting workaround to handle timing of the nested promises
      await bot.changeContext(message.reference);
      await getImage(bot, message, imageSearchString);
    }
  });
 };

async function getImage(bot, message, imageSearchString) {
  let searchUrl = 'https://api.bing.microsoft.com/v7.0/images/search?q='+imageSearchString+'&size=medium&mkt=en-us&count=50'
  await axios.get(searchUrl, { 
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY
    }
  })
  .then(response => {
    console.log(response);
    let imageResult = response.data.value[Math.floor(Math.random() * response.data.value.length)];
    console.log(`Image result count: ${response.data.value.length}`);
    console.log(`Image web search url: ${imageResult.webSearchUrl}`);
    // Reply to your request with the image URL
    bot.reply(message, imageResult.contentUrl);
  })
  .catch(error => {
    console.log(error);
  });
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

