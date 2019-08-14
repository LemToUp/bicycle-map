const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');

module.exports = function(bot) {
    bot.on('message', (ctx) => {
        if (ctx.update.message.document) {
            ctx.telegram.sendDocument(process.env.MINE_ID, ctx.update.message.document.file_id).then(() => {
                ctx.telegram.sendMessage(ctx.from.id, 'Спасибо. Файл отправлен.');
            });

            if (ctx.update.message.chat) {
                ctx.telegram.deleteMessage(ctx.update.message.chat.id, ctx.update.message.message_id);
            }
        }

        if (ctx.update.message.text === '/help') {
            const keyboard = Markup.inlineKeyboard([
                Markup.urlButton('Ссылка на карту', process.env.MAP_LINK),
            ]);
            ctx.telegram.sendMessage(ctx.from.id, '', Extra.markup(keyboard));
            ctx.telegram.sendMessage(ctx.from.id, 'В этом чате вы можете отправить файл с вашим маршрутом. (Подробнее https://yandex.ru/support/maps-builder/concept/markers_3.html) ', Extra.markup(keyboard));
            if (ctx.update.message.chat) {
                ctx.telegram.deleteMessage(ctx.update.message.chat.id, ctx.update.message.message_id);
            }
        }
    });
};
