KISSY.use('account-front/signInSuccessWrapper.css', function (S) {
//初始化header模块
    var header = require('./header/signInSuccessHeader');
    header.init();

//初始化article模块
    var article = require('./article/signInSuccess');
    article.init();
})