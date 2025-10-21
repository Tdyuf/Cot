const { Client, GatewayIntentBits } = require('discord.js');
const { status } = require('minecraft-server-util');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// ضع هنا توكن البوت
const TOKEN = 'MTM2MTgwMDIzMzY1NDE1NzU3Mg.GX5_qg.yf-xdR-1mIxUqPHbs6srb3s7M3ixQYLgMh4mPo';
// ضع هنا معرف القناة
const CHANNEL_ID = '1430030749314318456';
// ضع هنا IP وPort لسيرفر Aternos
const SERVER_IP = 'center_back.aternos.me';
const SERVER_PORT = 14878;

let statusMessage;

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const channel = await client.channels.fetch(CHANNEL_ID);

    // إرسال أول رسالة
    statusMessage = await channel.send('⏳ يتم التحقق من حالة السيرفر...');

    // التحقق كل دقيقة
    setInterval(async () => {
        try {
            const response = await status(SERVER_IP, SERVER_PORT);
            await statusMessage.edit(`✅ سيرفر Aternos شغال! ${response.players.online}/${response.players.max} لاعبين`);
        } catch (err) {
            await statusMessage.edit('❌ السيرفر متوقف أو غير متاح');
        }
    }, 60_000); // كل دقيقة
});

client.login(TOKEN);
