const apiUrl = 'your_api_url_here';

const ApiService = {
  async getQuestions() {
    const response = await fetch(`${apiUrl}/questions`);
    return response.json();
  },

  async saveQuestion(question, answer) {
    const response = await fetch(`${apiUrl}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, answer }),
    });
    return response.json();
  },
};

export default ApiService;
