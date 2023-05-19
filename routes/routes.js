const express = require('express')
const { getCreateTestPage, getAllTestsPage, getHomePage} = require('../controllers/control.js')
const { Question , Test} = require('../models/models.js')
const {startLiveTest} = require('../controllers/live-test.js')
const router = express.Router()


const Razorpay = require('razorpay');
let instance = new Razorpay({
    key_id: 'rzp_test_DNmKMyeVTLZyts',
    key_secret: '0KBRvhwCIA35BUE33gydblqO'
});

router
    .get('/', getHomePage)
    .get('/login', async (req, res) => {
        res.render('login')
    })
    .get('/live-test', startLiveTest )
    .get('/create-test', getCreateTestPage)
    .get('/all-tests', getAllTestsPage)
    .post('/addQuestion', async (req,res) => {
        const body = req.body
        const author = 'Piyush';
        const subject = 'C++';

        try{
            const result = await Question.create({
                subject: 'C++',
                author: 'Piyush',
                question: body.question,
                correct: body.correct,
                incorrect: body.incorrect,
            })
            const allquestions = await Question.find({author, subject})
            const newArray = allquestions.map(({ question, correct, incorrect }) => ({
                question,
                correct,
                incorrect
            }));
            const mergedArray = newArray.map(({ question, correct, incorrect }) => ({
                question,
                options: [correct, ...incorrect]
            }));
            return res.status(201).render('make-test', {mergedArray})
        }
        catch(err){
            console.log(err.message)
        }
        return res.status(200)
    })
    .post('/generate', async (req, res) => {
        const author = 'Piyush';
        const subject = 'C++';
        
        try {
            const questions = await Question.find({ author, subject });
        
            // const newTest = new Test({
            //     author,
            //     subject,
            //     questions: questions.map(question => question._id)
            // });
            // const savedTest = await newTest.save();
        
            return res.redirect('/all-tests');
        } catch (err) {
            console.log(err.message);
            return res.status(500).send('Error generating the test.');
        }
    })
    .post('/payment', (req, res) => {
        console.log("Create orderID request", JSON.stringify(req.body),"liuytr");
        instance.orders.create(
            {
                amount: Number(req.body.amount),
                currency: "INR",
                receipt: "receipt#1",
                notes: {
                    key1: "value3",
                    key2: "value2"
                }
            },
            (err, order) => {
                console.log(order,"ordrehv");
                res.send(order);
                console.log(err,"error");
            }
        );
        console.log(JSON.stringify(res.body),"res.body");
    })
    


module.exports = router