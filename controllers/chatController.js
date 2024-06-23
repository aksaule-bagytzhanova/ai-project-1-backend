const chatService = require('../services/chatService');

exports.handleChatRequest = async (req, res) => {
  const { message, model } = req.body;
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    await chatService.streamResponse(message, model, (chunk) => {
      res.write(`data: ${chunk}\n\n`);
    });
    res.end();
  } catch (error) {
    res.write(`event: error\ndata: ${error.message}\n\n`);
    res.end();
  }
};
