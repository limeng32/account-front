var $ = require('node').all;
var tpl = require('./article-view');
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
module.exports = {
    init:function(){
        S.log('article init');
        var html = new XTemplate(tpl).render({
            title:'中文',
            content:'render by kg/xtemplate'
        });
        $('article').html(html);
    }
}