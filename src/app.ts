import { createBot, createProvider, createFlow, MemoryDB, addKeyword } from '@bot-whatsapp/bot'

import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys'

const flowBienvenida = addKeyword(['pruebecilla'])
    .addAnswer(['Hola, bienvenido a mi tienda', '¿Como puedo ayudarte?'])
    .addAnswer(['Tengo:', 'Zapatos', 'Bolsos', 'etc ...'])
/**
 * Esta es la función principal, ¡Importante, es la que realmente inicia el chatbot!
 */
const main = async () => {

    const provider = createProvider(BaileysProvider)
    provider.initHttpServer(3002)
    provider.http.server.post('/send-message', handleCtx(async (bot, req, res) =>{
        const body = req.body
        const message = body.message
        const phone = body.phone
        await bot.sendMessage(phone, message, {})
        res.end('mensaje enviado')
    }))

    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider
    })
}

main()