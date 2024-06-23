const chatService = require('../services/chatService');

exports.handleChatRequest = async (req, res) => {
  const { message, model } = req.body;
  try {
    const response = await chatService.getResponse(message, model);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
