const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const posts = require('./routes/posts');
const mongoose = require('mongoose');

const app = express();

//connect DB
mongoose.connect(`mongodb+srv://thong:thong@mearn-learnit.bbq80.mongodb.net/Post1?retryWrites=true&w=majority`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log('connect database successfully'))
    .catch(() => console.log('connect database error'))


//khoi dong handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//khoi dong bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.json());
app.use(methodOverride('_method'));


app.get('/', (req, res) => res.render('index'));
app.get('/about', (req, res) => res.render('about'))
app.use('/posts', posts);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server listening on ${PORT}`));