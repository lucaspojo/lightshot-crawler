var request = require('request');
var cheerio = require('cheerio');
const arrayFindIndex = require('array-find-index');
var bruteForce = require("node-bruteforce");
var db = require('node-localdb');

var list_id = db('list_id.json');

var i = 0;

bruteForce(["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"], function(value){

    i++;

    if(value.length == 6 && i > 15979879){
    	console.log(value, i);
    	list_id.insert({"ls_id": value, "number_id": i}).then(function(u){
		    //console.log("Id Saved : " + i); // print user, with a auto generate uuid
		});
    }

    return false;
    
});