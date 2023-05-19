
async function getHomePage(req,res){
   return res.render('landing-page.ejs')
}

async function getCreateTestPage(req,res){
   return res.render('make-test.ejs', {mergedArray : []})
}

async function getAllTestsPage(req,res){
   return res.render('all-tests.ejs')
}

module.exports = {getCreateTestPage, getAllTestsPage ,getHomePage}

