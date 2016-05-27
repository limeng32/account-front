var $ = require('node').all;
var Node = require('node');
var IO = require('io');
var SP = require('../smartPath/smartPath');
module.exports = {
    init: function () {
        var headerMain = new Node('<div>').addClass('headerMain');
        var headerTail = new Node('<div>').addClass('headerTail');
        $('header').append(headerMain).append(headerTail);
        if (token == '') {
            headerMain.html('您好，欢迎来到海市蜃楼');
            var signUpButton = new Node('<input>').prop({
                type: 'submit',
                value: '注册'
            }).addClass('ks-button ks-button-primary ks-button-shown signButton');
            var signInButton = new Node('<input>').prop({
                type: 'submit',
                value: '登录'
            }).addClass('ks-button ks-button-shown signButton');
            var homeButton = new Node('<input>').prop({
                type: 'submit',
                value: '进来看看'
            }).addClass('ks-button ks-button-info ks-button-shown signButton');
            headerTail.append(signUpButton).append(signInButton).append(homeButton);
            signUpButton.on('click', function (e) {
                window.location.assign(SP.resolvedPath('signUp'));
            });
            signInButton.on('click', function (e) {
                window.location.assign(SP.resolvedPath('signIn'));
            });
            homeButton.on('click', function (e) {
                window.location.assign(SP.resolvedPath('home'));
            });
        } else {
            headerMain.html('您已经登录成功。您是我们的前100名用户之一，非常非常感谢您参与本站的运行测试。');
            var signOutButton = new Node('<input>').prop({
                type: 'submit',
                value: '退出'
            }).addClass('ks-button ks-button-warning ks-button-shown signButton');
            var writeStoryButton = new Node('<input>').prop({
                type: 'submit',
                value: '开始创作'
            }).addClass('ks-button ks-button-info ks-button-shown signButton');
            headerTail.append(signOutButton).append(writeStoryButton);
            signOutButton.on('click', function (e) {
                IO.post(SP.resolvedIOPath('signOut?_content=json'), {}, function (data) {
                    if (data) {
                        window.location.assign(SP.resolvedPath('.'));
                    }
                }, 'json');
            });
            writeStoryButton.on('click', function (e) {
                window.location.assign(SP.resolvedPath('writeStory'));
            });
        }
    }
}