NODE_OPTIONS="–max-old-space-size=2048";
const links = require('./transformarLinksEmArray')
const Crawler = require("crawler")
const fs = require('fs');

array = [];
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
      var datas = $(`.data`)
      try{
        var codigoDoProduto = datas[0].children[0].data
      }catch{
        var codigoDoProduto = "";
      }
      try{
        var ean = datas[1].children[0].data




      }catch{
        var ean  = "";
      }
      try{
        var peso = datas[2].children[0].data
      }catch{
        var peso  = "";
      }
      try{
        var quantidade = datas[3].children[0].data
      }catch{
        var quantidade  = "";
      }
      try{
        var marca = datas[4].children[0].data
      }catch{
        var marca  = "";
      }
      try{
        var fabricante = datas[5].children[0].data
      }catch{
        var fabricante  = "";
      }
      try {
        if (datas[7].children[0].data) {
          registroMS = datas[7].children[0].data
        }
      } catch (error) {
        registroMS = ""
      }
      try {
        if (datas[8].children[0].data) {
          principioAtivo = datas[8].children[0].data
        }
      } catch (error) {
        principioAtivo = ""
      }
      try {
        if (datas[9].children[0].data) {
          dosagem = datas[9].children[0].data
        }
      } catch (error) {
        dosagem = ""
      }
      var preco = $('.cifra')
      try {
        preco = preco[1].next.next.attribs.content
      } catch (error) {
        preco=""
      }
      var obj = { codigoDoProduto,  ean, peso, quantidade, marca, fabricante, registroMS, principioAtivo, dosagem, preco};
      array.push(obj)
      array.length == links.length ? escreverJson(array) : null
    }
    done();
  }
})

c.queue(links)

let escreverJson = (array) => {
  console.log('Chamou Escrever');
  fs.open('C:\\Users\\leona\\Documents\\crawler\\Crawler\\tudo.json', 'as+', (err, arrayComOsLinks) => {
        if (err) {
          if (err.code === 'EEXIST') {
            console.error('myfile already exists');
            return;
          }
          throw err;
        }
      })
      fs.writeFile('C:\\Users\\leona\\Documents\\crawler\\Crawler\\tudo.json', `${JSON.stringify(array)},`, function (erro) {
        if (erro) {
          console.log(erro)
        }
      })
}