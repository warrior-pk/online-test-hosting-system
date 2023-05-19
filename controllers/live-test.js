const ejs = require('ejs')

async function startLiveTest(req, res){
    
    const questions = [
      {
        question: 'What is the capital of France?',
        options: ['London', 'Paris', 'Berlin', 'Rome']
      },
      {
        question: 'Who painted the Mona Lisa?',
        options: ['Pablo Picasso', 'Leonardo da Vinci', 'Vincent van Gogh', 'Claude Monet']
      }
    ];
    
    return res.render('live-test', {questions})

}
module.exports = {startLiveTest}
