KISSY.use('account-front/signUpSuccessWrapper.css', function (S) {
//初始化header模块
    var header = require('./header/signUpHeader');
    header.init();

//初始化article模块
    var article = require('./article/signUpSuccess');
    article.init();
})