// const API_KEY = <YOUR-API-KEY>;
const API_KEY = "xyz";

const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", getMessage);

const outputElement = document.querySelector("#output");

const inputEl = document.querySelector("input");

const historyEl = document.querySelector(".history");

async function getMessage() {
  console.log("click hoeche");
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: inputEl.value,
        },
      ],
      max_tokens: 100,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );

    const data = await response.json();
    console.log(data);
    outputElement.textContent = data.choices[0].message.content;
    if (data.choices[0].message.content) {
      const pEl = document.createElement("p");
      pEl.textContent = inputEl.value;
      historyEl.append(pEl);
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * 
 * const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: "Hello world"}],
});
console.log(completion.data.choices[0].message);

 */
