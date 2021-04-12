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

/**  
 * Using the bing image search api which requires an api key you receive from creating a search resource:
 *   https://docs.microsoft.com/en-us/bing/search-apis/bing-web-search/create-bing-search-service-resource#create-your-bing-resource
 */
async function getImage(bot, message, imageSearchString) {
  // We could break this out a bit but this works for today...
  let searchUrl = 'https://api.bing.microsoft.com/v7.0/images/search?q='+imageSearchString+'&size=medium&mkt=en-us&count=50'
  let searchResponse = await axios.get(searchUrl, { 
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.BING_SEARCH_API_KEY
    }
  })
  // Grabbing a random image from the results
  let imageResult = searchResponse.data.value[Math.floor(Math.random() * searchResponse.data.value.length)];
  console.log(`Image web search url: ${imageResult.webSearchUrl}`);
  console.log(`Image content url: ${imageResult.contentUrl}`);
  // Respond with the contentUrl of the image which is set to "medium" resolution in our search string
  await bot.reply(message, imageResult.contentUrl);
};

function getImageQueryString(messageText){
  if (messageText != "") {
    return messageText;
  }
  let day = new Date().getDay();
  // Just to make sure we're getting some default funny stuff...
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

