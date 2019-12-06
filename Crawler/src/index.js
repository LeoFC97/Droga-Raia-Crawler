const links = require('./transformarLinksEmArray')
const Crawler = require("crawler")
const fs = require('fs');


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
      var codigoDoProduto = datas[0].children[0].data
      var ean = datas[1].children[0].data
      var peso = datas[2].children[0].data
      var quantidade = datas[3].children[0].data
      var marca = datas[4].children[0].data
      var fabricante = datas[5].children[0].data
      try {
        if (datas[7].children[0].data) {
          registroMS = datas[7].children[0].data
        }
      } catch (error) {
        registroMS = "vazio"
      }
      try {
        if (datas[8].children[0].data) {
          principioAtivo = datas[8].children[0].data
        }
      } catch (error) {
        principioAtivo = "vazio"
      }
      try {
        if (datas[9].children[0].data) {
          dosagem = datas[9].children[0].data
        }
      } catch (error) {
        dosagem = "vazio"
      }



      var json = `{
        "codigoDoProduto":"${codigoDoProduto}",
        "ean":"${ean}",
        "peso":"${peso}",
        "quantidade":"${quantidade}",
        "marca":"${marca}",
        "fabricante":"${fabricante}",
        "registroMS":"${registroMS}",
        "principioAtivo":"${principioAtivo}",
        "dosagem":"${dosagem}"
      }`;
      obj = JSON.parse(json);
      fs.open('D:\\ProjetosDoGit\\Crawler\\tudo.json', 'as+', (err, arrayComOsLinks) => {
        if (err) {
          if (err.code === 'EEXIST') {
            console.error('myfile already exists');
            return;
          }
          throw err;
        }
      })
      fs.writeFile("D:\\ProjetosDoGit\\Crawler\\tudo.json", `${JSON.stringify(obj)},`, function (erro) {
        if (erro) {
          console.log(erro)
        }
      })
    }
    done();
  }
})

for (i = 0; i < links.length; i++) {
  c.queue({
    uri: links[i],
  })
}