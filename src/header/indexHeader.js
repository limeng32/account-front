var $ = require('node').all;
var Node = require('node');
var IO = require('io');
module.exports = {
    init: function () {
        var headerMain = new Node('<div>').addClass('headerMain');
        var headerTail = new Node('<div>').addClass('headerTail');
        $('header').append(headerMain).append(headerTail);
        if (auth == null || auth < 5) {
            headerMain.html('您好，欢迎来到海市蜃楼');
            var signUpButton = new Node('<input>').prop({
                type: 'submit',
                value: '注册'
            }).addClass('ks-button ks-button-primary ks-button-shown signButton');
            var signInButton = new Node('<input>').prop({
                type: 'submit',
                value: '登录'
            }).addClass('ks-button ks-button-shown signButton');
            headerTail.append(signUpButton).append(signInButton);
            signUpButton.on('click', function (e) {
                window.location.href = './signUp';
            });
            signInButton.on('click', function (e) {
                window.location.href = './signIn';
            });
        } else {
            headerMain.html('您已经登录成功');
            var signOutButton = new Node('<input>').prop({
                type: 'submit',
                value: '退出'
            }).addClass('ks-button ks-button-warning ks-button-shown signButton');
            headerTail.append(signOutButton);
            signOutButton.on('click', function (e) {
                IO.post('signOut?_content=json', {}, function (data) {
                    console.log(data);
                    if (data) {
                        window.location.href = './';
                    }
                }, 'json');
            });
        }
    }
}