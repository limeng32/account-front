var $ = require('node').all;
var tpl = require('./editUser-view');
var XTemplate = require('kg/xtemplate/3.3.3/runtime');
var Node = require('node');
var IO = require('io');
var Auth = require('kg/auth/2.0.6/');
var SP = require('../smartPath/smartPath');
var UrlsInput = require('kg/uploader/2.0.3/plugins/urlsInput/urlsInput');
var ProBars = require('kg/uploader/2.0.3/plugins/proBars/proBars');
var Filedrop = require('kg/uploader/2.0.3/plugins/filedrop/filedrop');
var ImgCrop = require('kg/uploader/2.0.3/plugins/imgcrop/imgcrop');
var AliUploader = require('gallery/uploader/kissyuploader/5.0.0/index');
var AI = require('../authIdentify/index');
var JSONX = require('../jsonx/jsonx');
var AD = require('kg/agiledialog/1.0.2/index');
module.exports = {
    init: function () {
        var ai = new AI(token);
        if (ai.existChecked()) {
            ai.acquireAccount(SP.resolvedIOPath('getAccountWithBucket?_content=json'), function (account) {
                doInit(account);
            });
        } else {
            new AD({
                type: 'alert',
                content: "您还没有登录"
            });
        }
        var doInit = function (account) {
            var uploadContainer = new Node('<div>').prop({
                id: 'J_Uploader'
            });
            $('article').append(uploadContainer);
            uploadContainer.html(new XTemplate(tpl).render({
                portrait: account.accountBucket[0].portrait
            }));
            var cropContainer = new Node('<div>').prop({
                id: 'J_CropBox'
            });
            KISSY.use('kg/uploader/2.0.3/themes/cropUploader/index,kg/uploader/2.0.3/themes/imageUploader/style.css,kg/uploader/2.0.3/themes/cropUploader/style.css', function (S, ImageUploader) {
                var uploader = new AliUploader('#J_UploaderBtn', {
                    action: SP.resolvedIOPath('uploadPortrait?_content=json'),
                    multiple: false,
                    type: 'ajax',
                    name: 'Filedata'
                    //filter: function (data) {
                    //    debugger;
                    //}
                });
                uploader.set('filter', function (data) {
                    data.success = 1;
                    return data;
                })
                uploader.theme(new ImageUploader({queueTarget: '#J_UploaderQueue'}));
                var imgCrop = new ImgCrop({
                    initialXY: [10, 10], //初始坐标
                    initWidth: 200, //初始宽度
                    initHeight: 200, //初始高度
                    minHeight: 100, //最小高度
                    minWidth: 100, //最小宽度
                    //previewEl: "#J_PrevBox", //预览容器，不需要的话可以不配置
                    touchable: true, //支持touch、pinch
                    ratio: true, //固定比例缩放
                    resizable: true//可以缩放
                });
                uploader.plug(new UrlsInput({target: '#J_Urls'}))
                    .plug(new ProBars())
                    .plug(new Filedrop())
                    .plug(imgCrop)
                ;
                uploader.on('error', function (ev) {
                    //var index = ev.index, file = ev.file;
                    //服务器端返回的结果集
                    //var result = ev.result;
                    alert('上传失败,错误消息为');
                });
                uploader.on('success', function (ev) {
                    var index = ev.index, file = ev.file;
                    var id = file.id;
                    //服务器端返回的结果集
                    //var result = ev.result;
                });
                var computeModifyH = function () {
                    var crop = imgCrop.get('crop');
                    return parseInt(crop.getCropCoords().h * crop.getOriginalSize().height / crop.getDisplaySize().height);
                };
                var computeModifyW = function () {
                    var crop = imgCrop.get('crop');
                    return parseInt(crop.getCropCoords().w * crop.getOriginalSize().width / crop.getDisplaySize().width);
                };
                var computeModifyX = function () {
                    var crop = imgCrop.get('crop');
                    return parseInt(crop.getCropCoords().x * crop.getOriginalSize().width / crop.getDisplaySize().width);
                };
                var computeModifyY = function () {
                    var crop = imgCrop.get('crop');
                    return parseInt(crop.getCropCoords().y * crop.getOriginalSize().height / crop.getDisplaySize().height);
                };
                $('.submitPortrait').on('click', function () {
                    if (imgCrop.get('crop').get('url') != '') {
                        IO.post(SP.resolvedIOPath('edit/savePortraitModify?_content=json'),
                            {
                                id: account.accountBucket[0].id,
                                portraitModify: account.accountBucket[0].portraitModify,
                                portraitModifyH: computeModifyH(),
                                portraitModifyW: computeModifyW(),
                                portraitModifyX: computeModifyX(),
                                portraitModifyY: computeModifyY()
                            },
                            function (d) {
                                d = JSONX.decode(d);
                                $('.portrait').prop('src', d.portrait);
                            }, "json");
                    } else {
                        new AD({
                            type: 'alert',
                            content: "您还没有上传新头像"
                        });
                    }
                })
            })
        }
    }
}