var $ = require('node').all;
var tpl = require('./article-view');
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Node = require('node');
var IO = require('io');
module.exports = {
    init: function () {
        $('article').html('您好'+token);
    }
}