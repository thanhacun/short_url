'use strict';

var Urls = require('../models/urls.js');

function UrlHandler () {
    this.para2url = function(paramsObj) {
        //passing url as a parameter is quite tricky
        //using * after parameter and handle req.params specially
        if (paramsObj['0']) {
            return paramsObj['url'] + paramsObj['0'];
        } else {
            return paramsObj['0'];
        }
    };
    
    this.makeShortcut = function(origin_url, req, res) {
        //find the shortcut
        Urls.findOne({'origin': origin_url}, {'_id': false}, function(err, result) {
            if (err) { throw err; }
            
            //create if not exist then return result
            if (!result) {
                Urls.create({
                    'origin': origin_url,
                    'short': Math.round(Math.random() * 10000)
                }, function(err, newRecord) {
                   if (err) { throw err; }
                   
                   res.json({
                       'origin': newRecord.origin,
                       'short': newRecord.short
                   });
                });
            } else {
                res.json({
                    'origin': result.origin,
                    'short': result.short
                });
            }
        });
        
        
    };
    
    this.getUrl = function(shortNumber, callback) {
        //get the origin url from shortcut
        Urls.findOne({'short': Number(shortNumber)}, {'_id': false}, function(err, result) {
            console.log(result);
            if (err) { throw err; }
            if (!result) {
                callback(false);
            } else {
                callback(result.origin);
            }
        });
        
    };
    
}

module.exports = UrlHandler;