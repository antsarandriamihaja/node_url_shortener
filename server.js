const express = require('express');
var app = express();
const path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var shorten = require('./public/javascripts/shorten');
var Url = require('./models/url');

var port = process.env.PORT || 3000;
var db = process.env.MONGODB_URI ||'mongodb://localhost/url_shortener';
var webhost = 'http://localhost:3000/';
mongoose.connect(db);

//configure app
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=>{
res.render(path.join(__dirname, 'views/index.hbs'))
})

app.post('/api/compress', (req, res)=>{
    var longUrl = req.body.url;
    var shortUrl = '';
    Url.findOne({
        long_url: longUrl
    }, function(err, doc){
        if (doc){
            shortUrl = webhost +shorten.encode(doc._id);

            res.send({'shortUrl': shortUrl});
        }
        else{
            var newUrl = Url({
                long_url: longUrl
            });

            newUrl.save(function(err){
                if (err){ return console.log(err);}
                shortUrl = webhost + shorten.encode(newUrl._id);
                res.send({'shortUrl': shortUrl});
            });
        }
    });
})

app.get('/:encoded_id', (req, res)=>{
    var base58Id = req.params.encoded_id;
    var id = shorten.decode(base58Id);

    Url.findOne({_id: id}, function(err, doc){
        if (doc){res.redirect(doc.long_url);}
        else{
            res.redirect(webhost);
        }
    });
})

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})