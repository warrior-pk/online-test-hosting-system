const ejs = require('ejs')
const {
    Test
} = require('../models/models')
const shuffleArray = require('./shuffle')

async function startLiveTest(req, res) {
    const body = req.body
    const author = 'Piyush';
    const subject = 'C++';

    try {
        const test = await Test.findOne({
            author,
            subject
        }).populate('questions').exec();

        if (!test) {
            return res.status(404).send('Test not found');
        }
        const questionObjects = test.questions;
        const mergedArray = questionObjects.map(({ question, correct, incorrect }) => ({
            question,
            options: [correct, ...incorrect]
        }))
        const shuffledArray = mergedArray.map(({ question, options }) => ({
            question,
            options: shuffleArray(options)
        }))

        return res.render('live-test', {
            questions : shuffledArray
        })
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Error retrieving the test questions.');
    }

}
module.exports = {
    startLiveTest
}