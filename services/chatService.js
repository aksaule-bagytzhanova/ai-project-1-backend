// Implement streaming logic for OpenAI and Cohere
exports.streamResponse = async (message, model, onData) => {
  // Pseudo-code for streaming
  if (model === 'openai') {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: message,
      max_tokens: 150,
      stream: true,
    });
    response.on('data', (chunk) => {
      onData(chunk.choices[0].text);
    });
  } else if (model === 'cohere') {
    const response = await cohere.generate({
      model: 'large',
      prompt: message,
      max_tokens: 150,
      stream: true,
    });
    response.on('data', (chunk) => {
      onData(chunk.generations[0].text);
    });
  } else {
    throw new Error('Unsupported model');
  }
};
