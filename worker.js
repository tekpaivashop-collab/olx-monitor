const axios = require("axios");
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappTo = process.env.WHATSAPP_TO;

const client = twilio(accountSid, authToken);

const keywords = [
  "ps5",
  "playstation 5",
  "ps4 pro",
  "xbox series x",
  "nintendo switch",
  "steam deck",
  "legion go",
  "rtx 4090",
  "rtx 5070 ti",
  "rtx 5090",
  "i9 14900k",
  "ryzen 9"
];

async function checkOlx() {
  try {
    console.log("Verificando OLX...");

    for (const keyword of keywords) {
      const url = `https://www.olx.com.br/brasil?q=${encodeURIComponent(keyword)}`;

      const response = await axios.get(url);

      if (response.data.includes(keyword)) {
        console.log(`Encontrado: ${keyword}`);

        await client.messages.create({
          from: "whatsapp:+14155238886",
          to: `whatsapp:+${whatsappTo}`,
          body: `Nova oportunidade encontrada na OLX para: ${keyword}`
        });
      }
    }
  } catch (error) {
    console.error("Erro:", error.message);
  }
}

setInterval(checkOlx, process.env.CHECK_INTERVAL_SECONDS * 1000);

checkOlx();
