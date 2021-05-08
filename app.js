const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const task = {
  engineer: ['加個按鈕', '加新功能', '切個版', '改一點 code'],
  designer: ['畫一張圖', '改個 logo', '順便幫忙設計一下', '隨便換個設計'],
  entrepreneur: ['週末加班', '要能賺錢', '想個 business model', '找 VC 募錢']
}

const phrase = ['很簡單', '很容易', '很快', '很正常']


const app = express()

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    eq: function (v1, v2) { return v1 === v2 }
  }
}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/generate', (req, res) => {
  let garbageWord = ''

  const job = req.body.job
  const jobTasks = task[job]

  const jobInChinese = jobTranslate(job)
  const jobRandomIndex = Math.floor(Math.random() * jobTasks.length)
  const phraseRandomIndex = Math.floor(Math.random() * phrase.length)

  garbageWord = `身為一個${jobInChinese}，${jobTasks[jobRandomIndex]}，${phrase[phraseRandomIndex]}！`

  res.render('index', { garbageWord, job })
})

app.listen(3000, () => {
  console.log('server is running on https://localhost:3000')
})


function jobTranslate(englishJobName) {
  switch (englishJobName) {
    case 'engineer':
      return '工程師';
    case 'designer':
      return '設計師';
    case 'entrepreneur':
      return '創業家';
  }
}