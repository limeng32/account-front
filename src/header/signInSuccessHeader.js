var $ = require('node').all;
var SP = require('core-front/smartPath/smartPath');
module.exports = {
    init: function () {
        if (auth == null || auth < 5) {
            window.location.assign(SP.resolvedPath('index'));
        }
        $('header').html('您已经登录成功');
    }
}