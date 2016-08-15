KISSY.use('account-front/signInErrorWrapper.css', function (S) {
//初始化header模块
    var header = require('./header/signInHeader');
    header.init();

//初始化article模块
    var article = require('./article/signInError');
    article.init();
})