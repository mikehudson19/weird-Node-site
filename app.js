const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const https = require('https');
require('dotenv').config();


app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'))

const posts = [{ 
  blogTitle: 'Title 1',
  blogContent: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
}];

const tasks = [];

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/tasks', (req, res) => {
  res.render('tasks', {tasks : tasks});
})

app.get('/blog', (req, res) => {
  res.render('blog', {posts : posts});
})

app.get('/compose', (req, res) => {
  res.render('compose');
})

app.get('/blog/:blogTitle', (req, res) => {
  posts.forEach((post) => {
    if (post.blogTitle == req.params.blogTitle) {
      res.render('post', {title : post.blogTitle, content : post.blogContent});
    }
  })
})

app.get('/about', (req, res) => {
  res.render('about');
} )

app.get('/weather', (req, res) => {
  res.render('weather');
})

app.post('/weather', (req, res) => {
  const apiKey = process.env.W_API_KEY;
  const city = req.body.city;
  console.log(city);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`



  https.get(url, (response) => {
    response.on('data', (d) => {
      const jsonData = JSON.parse(d);
      const description = jsonData.weather[0].description;
      const temp = jsonData.main.temp;
      res.render('weatherResult', {description : description, city : city, temp : temp});
  
    });
  })
})

app.post('/', (req, res) => {
  const apiKey = process.env.MC_API_KEY;
  const audienceId = process.env.MC_AUD_ID;
  const url = `https://us10.api.mailchimp.com/3.0/lists/${AUD_ID}`;
  const options = {
    auth: `michael:${apiKey}`,
    method: 'POST'
  }
  const data = {
    name: req.body.name,
    email: req.body.email
  }
  const jsonData = JSON.parse(data);
  console.log(req.body);
  https.request(url, options, (res => {
    res.on('data', (d) => {
      console.log(d);
    })
  }));
})

app.post('/compose', (req, res) => {
  const post = {
    blogTitle: req.body.title,
    blogContent: req.body.content
  }
  posts.push(post);
  console.log(posts);
  res.redirect('/blog');
})

app.post('/tasks', (req, res) => {
  console.log(req.body);
  const task = req.body.task;
  tasks.push(task);
  res.redirect('/tasks');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log('Server is running on port 3000...' )})

