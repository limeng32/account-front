var $ = require('node').all;
var tpl = require('./article-view');
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
var Node = require('node');
var IO = require('io');
module.exports = {
    init: function () {
        var emailInput = new Node('<input>').prop({
            id: 'email'
        });
        $('article').append(new Node('<div>').append('邮件地址： ').append(emailInput));
        var password = new Node('<input>').prop({
            id: 'password'
        });
        $('article').append(new Node('<div>').append('输入密码： ').append(password));
        var confirmPassword = new Node('<input>').prop({
            id: 'confirmPassword'
        });
        $('article').append(new Node('<div>').append('确认密码： ').append(confirmPassword));
        var refreshCaptchaButton = new Node('<button>').prop({
            content: '刷新'
        });
        var captImage = new Node('<img>').prop({});
        var captInput = new Node('<input>').prop({
            id: 'captInput'
        });
        $('article').append(new Node('<div>').append('验 证 码： ').append(captInput).append(' ').append(captImage).append(refreshCaptchaButton));
        var initCaptcha = function () {
            IO.post('signUp/captcha?_content=json', {}, function (data) {
                captImage.prop('src', 'signUp/captchaImage?text=' + data + '&t=' + (new Date()).valueOf());
            }, 'json');
        }
        initCaptcha();
        refreshCaptchaButton.on("click", function (e) {
            initCaptcha();
        });
    }
}