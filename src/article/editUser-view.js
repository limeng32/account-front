KISSY.add(function(S,require,exports,module){
/*compiled by xtemplate#3.3.3*/
var ret = module.exports = function editUserView(undefined){
var t;
var t0;
var t1;
var t2;
var t3;
var t4;
var t5;
var t6;
var t7;
var t8;
var t9;
var tpl = this;
var root = tpl.root;
var buffer = tpl.buffer;
var scope = tpl.scope;
var runtime = tpl.runtime;
var name = tpl.name;
var pos = tpl.pos;
var data = scope.data;
var affix = scope.affix;
var nativeCommands = root.nativeCommands;
var utils = root.utils;
var callFnUtil = utils["callFn"];
var callCommandUtil = utils["callCommand"];
var rangeCommand = nativeCommands["range"];
var foreachCommand = nativeCommands["foreach"];
var forinCommand = nativeCommands["forin"];
var eachCommand = nativeCommands["each"];
var withCommand = nativeCommands["with"];
var ifCommand = nativeCommands["if"];
var setCommand = nativeCommands["set"];
var includeCommand = nativeCommands["include"];
var parseCommand = nativeCommands["parse"];
var extendCommand = nativeCommands["extend"];
var blockCommand = nativeCommands["block"];
var macroCommand = nativeCommands["macro"];
var debuggerCommand = nativeCommands["debugger"];


buffer.data += '<h2>uploader</h2>\n\n<div class="uploader-wrapper">\n    <div class="grid">\n        <input type="file" class="g-u" id="J_UploaderBtn" value="上传" name="Filedata" accept="image/*">\n        <input type="hidden" id="J_Urls" name="urls"/>\n\n        <div class="g-u">asd<span id="J_UploadCount">3</span>qwe</div>\n    </div>\n    <ul id="J_UploaderQueue" class="grid"></ul>\n</div>\n<div class="J_CropArea" style="width:500px;height:500px;"></div>';
return buffer;
};
ret.TPL_NAME = module.id || module.name;
});