const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ytdl = require('ytdl-core');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.set('views', __dirname);

app.use(express.static(__dirname + '/public'));

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index.html'));


app.post('/', async (req, res) => {
    try {
        const { url } = req.body;
        let info = await ytdl.getInfo(url);
        info = info.videoDetails.media;
        console.log(info);
        const dir = 'songs/';
        let fullName = 'song.mp3';
        if(!Object.entries(info).length == 0)
         fullName = info.song + '—' + info.artist + '.mp3'
        ytdl(url, {
            filter: 'audioonly'
        })
        .pipe(fs.createWriteStream(dir + fullName));

    }catch (err) {
        res.status(400).json('Error Happend!');
    }
});
const port = process.env.PORT || 3001;
app.listen(port, ()=> {
  console.log(`app is running on port ${port}`);
})