const express = require('express');
const path = require('path');
const cors = require('cors');
const { nanoid } = require('nanoid');

const app = express();
const port = process.env.PORT || 3000;
const host = "localhost";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
      origin: '*',
    })
)

var urlDatabase = []; // Pour stocker les URL raccourcies

function find_shortURL(list, url) {
    for (const links of list) {
        if (links.shortUrl === url) {
            return links;
        }
    }
    return {};
}

app.use(express.static('static'));

app.get('/:shortUrl', (req, res) => {
  let shortUrl = req.params.shortUrl;
  const longUrl = find_shortURL(urlDatabase, shortUrl);
  if (longUrl.longUrl) {
    res.redirect(longUrl.longUrl);
  } else {
    res.status(404).send('URL not found');
  }
});


  

app.post('/shorten', (req, res) => {
  let longUrl = req.body.longUrl;
  let shortUrl = nanoid(7);
  while (find_shortURL(urlDatabase, shortUrl).longUrl) {
    shortUrl = nanoid(7);
  }

  urlDatabase.push(
    {
        "longUrl": longUrl,
        "shortUrl": shortUrl
    }
  );

  res.json({ shortUrl: `http://localhost:3000/${shortUrl}` });
});



app.listen(port, host, () => {
  console.log(`Server is running on port http://${host}:${port}`);
});
