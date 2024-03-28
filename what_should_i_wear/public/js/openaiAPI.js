// import OpenAI from "openai";
const OpenAI = require("openai");

async function askAI(cityName, currentWeather) {
  const openai = new OpenAI(process.env.OPEN_AI_KEY);

  let rawDATA = JSON.stringify(currentWeather);

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are being provided weather data for the city of ${cityName}:\n\n ${rawDATA} \n\n give a fun and short breakdown of what the user should wear outside, use emojis for fun and try to make it sound like a gen z is typing it: \n\n when reading the temperature data make sure to round it`,
      },
    ],

    model: "gpt-3.5-turbo",
  });
  // console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
}

// askAI();

module.exports = { askAI };
