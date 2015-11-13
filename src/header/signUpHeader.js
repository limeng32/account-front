var $ = require('node').all;
var Node = require('node');
module.exports = {
    init: function () {
        var headerMain = new Node('<div>').addClass('headerMain');
        var headerTail = new Node('<div>').addClass('headerTail');
        $('header').append(headerMain).append(headerTail);
        headerMain.html('请您先进行注册');
        var indexButton = new Node('<input>').prop({
            type: 'submit',
            value: '首页'
        }).addClass('ks-button ks-button-success ks-button-shown signButton');
        var signInButton = new Node('<input>').prop({
            type: 'submit',
            value: '登录'
        }).addClass('ks-button ks-button-shown signButton');
        headerTail.append(indexButton).append(signInButton);
        indexButton.on('click', function (e) {
            window.location.href = './';
        });
        signInButton.on('click', function (e) {
            window.location.href = './signIn';
        });
    }
}