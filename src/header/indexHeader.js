var $ = require('node').all;
module.exports = {
    init: function () {
        if (auth == null || auth < 5) {
            $('header').html('您好，欢迎来到海市蜃楼');
        }else{
            $('header').html('您已经登录成功');
        }
    }
}