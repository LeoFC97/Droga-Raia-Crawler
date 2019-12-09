const Crawler = require("crawler")
const fs = require('fs');
const path = require('path')

var arrayComOsLinks = []

const c = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  callback: function (error, res, done) {
    if (error) {
      console.log(error);
    } else {


      var $ = res.$;
      // $ is Cheerio by default
      //a lean implementation of core jQuery designed specifically for the server
      const botoesComOsLinks = $(`.product-image`)
      for (i = 2; i < botoesComOsLinks.length; i++) {
        arrayComOsLinks.push(botoesComOsLinks[i].attribs.href)
      }
      fs.open(path.join(__dirname, '../')+'links.txt', 'as+', (err, arrayComOsLinks) => {
        if (err) {
          if (err.code === 'EEXIST') {
            console.error('myfile already exists');
            return;
          }
          throw err;
        }
      })
      
      fs.writeFile(path.join(__dirname, '../')+'links.txt', arrayComOsLinks.join('\n'), function (erro) {
        if (erro) {
          console.log(erro)
        }
        else {
        }
      })
    }
    done();
  }
})

for (i = 1; i < 142; i++) {
  c.queue({
    uri: `https://www.drogaraia.com.br/saude/medicamentos/todos-de-a-z.html?limit=48&p=${i}`,
  })
}




