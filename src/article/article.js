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
            type: 'password'
        });
        $('article').append(new Node('<div>').append('输入密码： ').append(password));
        var confirmPassword = new Node('<input>').prop({
            type: 'password'
        });
        $('article').append(new Node('<div>').append('确认密码： ').append(confirmPassword));
        var refreshCaptchaButton = new Node('<button>').prop({
            content: '刷新'
        });
        var captImage = new Node('<img>').prop({
            src: 'signUp/captchaImage'
        });
        var captInput = new Node('<input>').prop({
            id: 'captInput'
        });
        $('article').append(new Node('<div>').append('验 证 码： ').append(captInput).append(' ').append(captImage).append(refreshCaptchaButton));
        refreshCaptchaButton.on('click', function (e) {
            captImage.prop('src', 'signUp/captchaImage?t=' + (new Date()).valueOf());
        });
        var verifyButton = new Node('<button>').prop({});
        $('article').append(new Node('<div>').append('验    证： ').append(verifyButton));
        verifyButton.on('click', function (e) {
            var name = emailInput.val().substring(0, emailInput.val().indexOf('@'));
            console.log(name);
        });
        var signUpButton = new Node('<button>').prop({});
        $('article').append(new Node('<div>').append('提    交： ').append(signUpButton));
        signUpButton.on('click', function (e) {
            if (password.val() != confirmPassword.val()) {
                alert('您两次输入的密码不一致');
                return;
            }
            var name = emailInput.val().substring(0, emailInput.val().indexOf('@'));
            IO.post('signUp/submit?_content=json', {
                captchaValue: captInput.val(),
                email: emailInput.val(),
                name: name,
                password: password.val()
            }, function (data) {
                console.log(data);
            }, 'json');
        });
    }
}