KISSY.use('account-front/signInWrapper.css', function (S) {
//初始化header模块
    var header = require('./header/signInHeader');
    header.init();

//初始化article模块
    var article = require('./article/signIn');
    article.init();
})