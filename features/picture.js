/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = function(controller) {

    controller.hears('sample','message,direct_message', async(bot, message) => {
        await bot.reply(message, 'I heard a sample message.');
    });

    controller.on('message,direct_message', async(bot, message) => {
        await bot.reply(message, `Echo: ${ message.text }`);
    });

   controller.on('slash_command', async(bot, message) => {
     console.log(message);
     if (message.command == '/wednesday') {
         await bot.reply(message,'https://i1.wp.com/bestlifeonline.com/wp-content/uploads/2019/04/its-wednesday-camel-.jpg?fit=1200%2C894&ssl=1');
     }
 });

}
