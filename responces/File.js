const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');

module.exports = function(bot) {
    const keyboard = Markup.inlineKeyboard([
        Markup.urlButton('❤️', 'http://telegraf.js.org'),
    ]);

    bot.on('message', (ctx) => {
        if (ctx.update.message.document) {
            ctx.telegram.sendDocument(process.env.MINE_ID, ctx.update.message.document.file_id)
        }
        ctx.telegram.sendMessage(ctx.from.id, 'Вы можете загрузить сюда свой маршрут.', Extra.markup(keyboard));
    });
};
