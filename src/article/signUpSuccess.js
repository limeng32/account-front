var $ = require('node').all;
var tpl = require('./article-view');
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Node = require('node');
var IO = require('io');
module.exports = {
    init: function () {
        var mainDiv = new Node('<div>').addClass('articleMiddle');
        $('article').append(mainDiv);
        if (reason == '') {
            reason = '恭喜您帐号注册成功，请前往您的邮箱来激活账号^^';
        }
        mainDiv.html(reason);
    }
}