import getCredentialByChatId from '../credentialsModule/getCredentialByChatId'
import setIsCredentialEnabled from '../credentialsModule/setIsCredentialEnabled'
import { TELEGRAM_OWNER_CHAT_ID, TELEGRAM_OWNER_LOGIN } from '../config'
import logToBot from './logToBot'
import bot from '.'

export default function startBot() {
    bot.command('start', (ctx) => {
        ctx.reply(`This bot allows you to automatically sell on cotps.com. If you want to use it please contact ${TELEGRAM_OWNER_LOGIN}`);
        logToBot(TELEGRAM_OWNER_CHAT_ID, `Start command recevied.\n${JSON.stringify(ctx.update.message.from, null, 2)}`)
    })

    bot.command('check', (ctx) => ctx.reply('🌚'))

    bot.command('disable', async (ctx) => {
        const chatId = ctx.update.message.chat.id;
        const credential = await getCredentialByChatId(chatId);

        if (!credential) {
            ctx.reply('User not found')
            return
        }

        await setIsCredentialEnabled(credential._id, false)

        ctx.reply('Disabled')
    })

    bot.command('enable', async (ctx) => {
        const chatId = ctx.update.message.chat.id;
        const credential = await getCredentialByChatId(chatId);

        if (!credential) {
            ctx.reply('User not found')
            return
        }

        await setIsCredentialEnabled(credential._id, true)

        ctx.reply('Enabled')
    })

    bot.launch()
}