const { OpenAIApi, Configuration } = require('openai');
const cohere = require('cohere-ai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.getResponse = async (message, model) => {
  if (model === 'openai') {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: message,
      max_tokens: 150,
    });
    return response.data.choices[0].text;
  } else if (model === 'cohere') {
    const response = await cohere.generate({
      model: 'large',
      prompt: message,
      max_tokens: 150,
    }, {
      headers: { 'Authorization': `Bearer ${process.env.COHERE_API_KEY}` }
    });
    return response.body.generations[0].text;
  } else {
    throw new Error('Unsupported model');
  }
};
