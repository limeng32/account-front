var $ = require('node').all;
var tpl = require('./article-view');
var XTemplate = require('kg/xtemplate/3.3.3/runtime');
var Node = require('node');
var IO = require('io');
var Auth = require('kg/auth/2.0.6/');
var AuthMsgs = require('kg/auth/2.0.6/plugin/msgs/');
var SP = require('../smartPath/smartPath');
module.exports = {
    init: function () {
        var signUpForm = new Node('<form>').prop({
            action: SP.resolvedPath('signUp/submitNew?'),
            method: 'post'
        }).addClass('form-horizontal');
        var emailDiv = new Node('<div>').addClass('control-group');
        var emailInput = new Node('<input>').prop({
            type: 'text',
            placeholder: '您的邮件地址',
            name: 'email'
        }).attr('iRequired', '邮件地址').attr('email', 'email').attr('max-len', '100').attr('email-unique', '');
        var emailLabel = new Node('<label>').addClass('control-label').attr('for', emailInput).html('邮件地址：');
        var passwordDiv = new Node('<div>').addClass('control-group');
        var password = new Node('<input>').prop({
            type: 'password',
            placeholder: '请设置密码',
            name: 'password'
        }).attr('iRequired', '密码').attr('min-len', '6').attr('max-len', '10').attr('pattern', '^(?!.*?&).*$').attr('pattern-msg', '密码中不能含有字符&');
        var passwordLabel = new Node('<label>').addClass('control-label').attr('for', password).html('密码：');
        var confirmPasswordDiv = new Node('<div>').addClass('control-group');
        var confirmPassword = new Node('<input>').prop({
            type: 'password',
            placeholder: '请再次输入密码'
        }).attr('iRequired', '密码确认').attr('equal-field', 'password').attr('equal-field-msg', '两次密码输入需一致');
        var confirmPasswordLabel = new Node('<label>').addClass('control-label').attr('for', confirmPassword).html('请再次输入密码：');
        var captDiv = new Node('<div>').addClass('control-group');
        var captVale = new Node('<input>').prop({
            type: 'text',
            name: 'captchaValue',
            placeholder: '请输入下方的验证码'
        }).attr('iRequired', '验证码').attr('max-len', '20').attr('capt-check', '');
        var captLabel = new Node('<label>').addClass('control-label').attr('for', captVale).html('输入验证码：');
        var captImageDiv = new Node('<div>').addClass('control-group');
        var captImage = new Node('<img>').prop({
            src: SP.resolvedPath('signUp/captchaImage')
        }).addClass('captchaImage');
        var captImageLabel = new Node('<label>').addClass('control-label').attr('for', captImage).html('验证码：');
        var refreshCaptchaButton = new Node('<input>').prop({
            type: 'button',
            value: '刷新'
        }).addClass('ks-button ks-button-warning ks-button-shown refreshCaptchaButton');
        var submitDiv = new Node('<div>').addClass('form-actions');
        var signUpButton = new Node('<input>').prop({
            type: 'submit',
            value: '提交'
        }).addClass('ks-button ks-button-primary ks-button-shown');
        signUpForm.append(emailDiv.append(emailLabel).append(emailInput)).append(passwordDiv.append(passwordLabel).append(password)).append(confirmPasswordDiv.append(confirmPasswordLabel).append(confirmPassword));
        signUpForm.append(captDiv.append(captLabel).append(captVale)).append(captImageDiv.append(captImageLabel).append(captImage).append(refreshCaptchaButton));
        signUpForm.append(submitDiv.append(signUpButton));
        $('article').append(signUpForm);
        var formAuth = new Auth(signUpForm);
        formAuth.plug(new AuthMsgs());
        formAuth.register('min-len', function (value, attr, defer, field) {
            var min = Number(attr);
            this.msg('error', '请您输入至少' + min + '个字符');
            return value.length >= Number(attr);
        }).register('max-len', function (value, attr, defer, field) {
            var max = Number(attr);
            this.msg('error', '请您输入不超过' + max + '个字符');
            return value.length <= Number(attr);
        }).register('iRequired', function (value, attr, defer, field) {
            var name = attr;
            this.msg('error', name + '不可以为空');
            return value != '';
        }).register('email-unique', function (value, attr, defer, field) {
            var self = this;
            IO.post(SP.resolvedIOPath('signUp/checkUnique?_content=json&email=' + value), 'json').then(function (data) {
                if (data[0]) {
                    defer.resolve(self);
                } else {
                    defer.reject(self);
                }
                self.msg('error', '这个邮箱已经被注册过');
            });
            return defer.promise;
        }).register('capt-check', function (value, attr, defer, field) {
            var self = this;
            IO.post(SP.resolvedIOPath('signUp/captCheck?_content=json&captValue=' + value), 'json').then(function (data) {
                if (data[0]) {
                    defer.resolve(self);
                } else {
                    defer.reject(self);
                }
                self.msg('error', '您输入的验证码有误，请重新输入');
            });
            return defer.promise;
        });
        formAuth.render();
        refreshCaptchaButton.on('click', function (e) {
            captImage.prop('src', SP.resolvedPath('signUp/captchaImage?t=' + (new Date()).valueOf()));
        });
    }
}