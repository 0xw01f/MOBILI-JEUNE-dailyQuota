const webhook = require("webhook-discord")

const Hook = new webhook.Webhook("DISCORD-WEBHOOK")
var request = require('request');

var headers = {
    'Host': 'mobilijeune.actionlogement.fr',
    'Sec-Ch-Ua': '"Chromium";v="95", ";Not A Brand";v="99"',
    'Accept': 'application/json',
    'Sparoute': 'connexion',
    'Sec-Ch-Ua-Mobile': '?0',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Referer': 'https://mobilijeune.actionlogement.fr/eligibilite',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
    'Connection': 'close',
};

var options = {
    url: 'https://mobilijeune.actionlogement.fr/api/dossiers/1.0/checkDailyQuota',
    headers: headers
};


function callback(error, response, body) {
    if (!error && response.statusCode == 200) {

        if (body === 'true') {
            // True
            console.log('\x1b[97;42m', new Date().toLocaleString() + "=>" + body, "\x1b[0m");
            Hook.success("MOBILI-JEUNE","**Service Disponible !**\n(" + new Date().toLocaleString() + "=>" + body + ")")

        } else {
            // False
            console.log('\x1b[97;41m', new Date().toLocaleString() + "=>" + body, "\x1b[0m");
            
        }
        

    }
}


function timeLoop() {         
    setTimeout(function() {  
        request(options, callback);
        timeLoop();             
    }, 30 * 60 * 1000) // 30 minutes (30 * 60 * 1000)
  }


  
timeLoop();               

