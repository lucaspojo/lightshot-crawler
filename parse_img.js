var request = require('request');
var cheerio = require('cheerio');
const download = require('image-downloader')

var db = require('node-localdb');
var list_id = db('list_id.json');


list_id.findOne({}).then(function(u){
    parsePage(u.ls_id, u.number_id);
});


function parsePage(ls_id, number_id){
	console.log('PARSING : ' + ls_id + ' ID : ' + number_id);

	var options = {
	  url: 'https://prnt.sc/'+ls_id,
	  headers: {
	    'User-Agent': 'Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev>(KHTML, like Gecko) Chrome/<Chrome Rev> Safari/<WebKit Rev>'
	  }
	};

	
	request(options, function (error, response, html) {
	  if (!error && response.statusCode == 200) {
	    var $ = cheerio.load(html);
	    var img_url = $('.screenshot-image').attr('src');
	    downloadImg(ls_id, number_id, img_url)
	  } else {
	  	console.log(response.statusCode);
	  }
	});
}

function downloadImg(ls_id, number_id, url_img) {
	const options = {
	  url: url_img,
	  dest: 'images/'+ls_id+'.png'          
	}

	download.image(options)
	  .then(({ filename, image }) => {
	    console.log('File saved to', filename)
	  }).catch((err) => {
	    throw err
	  })

	setTimeout(function(){

		var next_id = number_id + 1;

		list_id.findOne({number_id:next_id}).then(function(u){
		    parsePage(u.ls_id, u.number_id);
		});


	}, 5000);
}