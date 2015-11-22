var $ = require('node').all;
var Node = require('node');
var SP = require('../smartPath/smartPath');
module.exports = {
    init: function () {
        var headerMain = new Node('<div>').addClass('headerMain');
        var headerTail = new Node('<div>').addClass('headerTail');
        $('header').append(headerMain).append(headerTail);
        headerMain.html('请登录');
        var indexButton = new Node('<input>').prop({
            type: 'submit',
            value: '首页'
        }).addClass('ks-button ks-button-success ks-button-shown signButton');
        var signUpButton = new Node('<input>').prop({
            type: 'submit',
            value: '注册'
        }).addClass('ks-button ks-button-primary ks-button-shown signButton');
        headerTail.append(signUpButton).append(indexButton);
        indexButton.on('click', function (e) {
            window.location.assign(SP.resolvedPath('.'));
        });
        signUpButton.on('click', function (e) {
            window.location.assign(SP.resolvedPath('signUp'));
        });
    }
}