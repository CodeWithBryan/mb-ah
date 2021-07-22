import https, { RequestOptions } from 'https';
import moment from 'moment';
import webhooks from '../../configs/webhooks.json';

const sendWebhook = (webhook: string, type: string, message: string, customFields?: { name: string, value: any }[]): void => {
    const data = JSON.stringify({
        username: 'AntiHack',
        embeds: [
            {
                author: {
                    name: 'MrBooleans AntiHack',
                    icon_url: 'https://cdn.discordapp.com/avatars/741690973071081573/a66eec8b6168cb509dd6636da5af1158.webp?size=256'
                },
                title: 'AntiHack Alert',
                fields: [
                    {
                        name: 'Type',
                        value: type,
                        inline: true,
                    },
                    {
                        name: 'Message',
                        value: message,
                        inline: false,
                    },
                    ...customFields.map(({ name, value }) => {
                        return {
                            name,
                            value,
                        };
                    }),
                ],
                footer: {
                  text: moment().format('MMMM Do YYYY, h:mm:ss a'),
                  icon_url: 'https://cdn.discordapp.com/emojis/773971596192907314.gif?v=1'
                }
            }
        ]
    });

    const hook = webhooks[webhook];
    if (!hook) return console.error(`Invalid webhook used "${webhook}"`); 

    const options: RequestOptions = {
        hostname: 'discord.com',
        port: 443,
        path: `/api/webhooks/${hook.channel}/${hook.key}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        },
    };

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
      
        res.on('data', d => {
            process.stdout.write(d);
        });
    });

    req.on('error', error => {
        console.error(error);
    });

    req.write(data);
    req.end();
}

export default sendWebhook;