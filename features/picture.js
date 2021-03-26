/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = function(controller) {
   controller.on('slash_command', async(bot, message) => {
     console.log(message);
     camel_meme = [
        'https://www.liveabout.com/thmb/099tc9eKaiZWpueTOIgsTBzSlDU=/1920x1080/filters:no_upscale():max_bytes(150000):strip_icc()/guess-what-day-it-is-hump-day-whoop-whoop-5af49483875db9003696b1cc.jpg',
       'https://i1.wp.com/bestlifeonline.com/wp-content/uploads/2019/04/its-wednesday-camel-.jpg?fit=1200%2C894&ssl=1',
       'https://www.digitalmomblog.com/wp-content/uploads/2020/12/yes-we-know-its-hump-day-memes.jpg',
       'https://i.pinimg.com/originals/dd/84/ae/dd84aeadca46de4cb6550c75a14add1e.jpg',
       'https://i.pinimg.com/originals/26/c1/e9/26c1e9f9f6ffbe0f3c153a02cbdd5e62.jpg',
     ]

     if (message.command == '/wednesday') {
         await bot.reply(message, camel_meme[Math.floor(Math.random() * camel_meme.length)]);
     }
 });

}
