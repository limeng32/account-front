var $ = require('node').all;
module.exports = {
    init: function () {
        if (auth == null || auth < 5) {
            window.location.href = 'index';
        }
        $('header').html('您已经登录成功');
    }
}