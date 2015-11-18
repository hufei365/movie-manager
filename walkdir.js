/*
 * 目录扫描程序
 */
var fs = require('fs');
var filesOper = {
	fileList : [],
	walk : function(path){
		var _this = this;
		var files =  fs.readdirSync(path); //需要使用readdirSync同步读取方法
		files.forEach(function(file){
			if( !/System Volume Information|Friends/.test(file)){
				var stats = fs.statSync(path + '/' + file);
				if(stats.isDirectory()){
					_this.walk(path + '/' + file);
				}else{	
					if( /.mkv$|.mp4$|.rmvb$|.avi$/.test(file)){
					 	_this.fileList.push({name: file, path : path + '/' + file, size : stats.size});	
					}
				}
			}
		});
	}
}
exports.filesOper = filesOper;
