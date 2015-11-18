/**
 * 主程序
 */

var filesOper = require('./walkdir').filesOper;
var dataDB = require('./models/mongodb').dataDB;

//console.log(dataDB);
filesOper.walk('I:');
filesOper.walk('J:');
filesOper.walk('K:');
//console.log(filesOper.fileList);

//找出文件名包含相同字符串的文件
var allFiles = filesOper.fileList;
var fileNameList = [];
allFiles.forEach(function(fileObj){
	var fileName = fileObj.name;
	if(!/.torrent|神盾局特工|钢铁侠|飞机总动员|谍影重重|火影剧场版|黑社会|星际迷航|美国队长|最长一码|死神来了|虎胆龙威|碟中谍|黑夜传说|古惑仔/.test(fileName)){		
		var regFormate = /.mkv|.mp4|.rmvb|.avi|/gi,
			regSite = /迅雷下载|梦幻天堂|电影天堂|飘花电影|eee4提供|3E电影站|3E迅雷电影站|-人人影视制作|小调网|xiaodiao|3E电影院|6v电影|bbs.hdbird.|飞鸟娱乐|www.|dy2018|6vdy|dygod|dy131|dytt9|eee4|3edyy|longbuluo|ygdy8.|.net|.cn|.com|com.|阳光电影|.org|.cc|2tu|piaohua|poxiao|\[\]|\[|\]|【|】/gi,
			regWord = /a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z/gi,
			regDot = /\.|1|2|3|4|5|6|7|8|9|0|\-|\_|:|：|I|II|<>| \( |\) |（|）| ( | ) |Ⅲ|Ⅱ|Ⅰ|Ⅵ|Ⅴ|Ⅳ|(|)|×|×|晰版/gi,
			regInfo = /超清|BD|BD1280|BD1024|中英双字|(国英双语)|无水印|中俄|晰版|高清版|中文字幕|字幕|国语|大卫·林奇经典悬疑惊悚|国粤日三语|配音|破晓电影|韩版|韩剧精灵|韩语|中字|国英|典藏版|版无水印|修正|龙部落|双语|提供|更多电影请去|双字|高清|大陆最新悬疑剧情|重制版|加长版|幕|720|.1024|IMDB|1280X720|1024|1280|中英字幕|HD|英语中字|HD国语|分辨率/gi;
		fileName = fileName.replace(regFormate, "");
		fileName = fileName.replace(regSite, "");
		fileName = fileName.replace(regWord, "");
		fileName = fileName.replace(regDot, "");
		fileName = fileName.replace(regInfo, "");
		fileNameList.push(fileName.trim());
	}
});

Array.prototype.unique = function(){
	this.sort();
	var re=[this[0]];
	for(var i = 1; i < this.length; i++)
	{
		if( this[i] !== re[re.length-1])
		{
			re.push(this[i]);
		}
	}
	return re;
}
var keywords = fileNameList.unique();
//console.log(keywords);
//dataDB.create(filesOper.fileList);
var result = [];
	
	
keywords.forEach(function(keyword){
	if(keyword){
		var pattern = new RegExp(keyword);
	}
	dataDB.find("name",pattern,function(results){
		if(results && results.length > 1){
			console.log(results);
		}
	});
});






