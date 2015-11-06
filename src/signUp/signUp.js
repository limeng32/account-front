var $ = require('node').all;
var tpl = require('./signUp-view');
var XTemplate = require('kg/xtemplate/3.3.3/runtime');
var Node = require('node');
var IO = require('io');
var Auth = require('kg/auth/2.0.6/');
var AuthMsgs = require('kg/auth/2.0.6/plugin/msgs/');
module.exports = {
    init: function () {
        var signUpForm = new Node('<form>').addClass('form-horizontal');
        var emailDiv = new Node('<div>').addClass('control-group');
        var emailInput = new Node('<input>').prop({
            type: 'text',
            placeholder: '您的邮件地址',
            required: 'required'
        }).addClass('input-xlarge');
        var emailLabel = new Node('<label>').addClass('control-label').attr('for', emailInput).html('邮件地址：');
        var passwordDiv = new Node('<div>').addClass('control-group');
        var password = new Node('<input>').prop({
            type: 'password',
            placeholder: '请设置密码',
            required: 'required'
        });
        var passwordLabel = new Node('<label>').addClass('control-label').attr('for', password).html('密码：');
        var confirmPasswordDiv = new Node('<div>').addClass('control-group');
        var confirmPassword = new Node('<input>').prop({
            type: 'password',
            placeholder: '请再次输入密码',
            required: 'required'
        });
        var confirmPasswordLabel = new Node('<label>').addClass('control-label').attr('for', confirmPassword).html('请再次输入密码：');
        signUpForm.append(emailDiv.append(emailLabel).append(emailInput)).append(passwordDiv.append(passwordLabel).append(password)).append(confirmPasswordDiv.append(confirmPasswordLabel).append(confirmPassword));
        $('article').append(signUpForm);
        var auth = new Auth(signUpForm);
        auth.plug(new AuthMsgs());
        auth.render();
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