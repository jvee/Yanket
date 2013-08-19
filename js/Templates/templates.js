var templates = {};
templates["Progress"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="b-progress__wrap">\r\n\r\n\t<div class="b-progress__counter">\r\n\t\t<div class="b-progress__counter-wrap">\r\n\t\t\t<span class="b-progress__counter-text">'+
((__t=( progress ))==null?'':__t)+
'</span> %\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<ul class="b-progress__list"></ul>\r\n\r\n</div>';
}
return __p;
}
templates["ProgressItem"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<a class="b-progress__item-link" href="#question'+
((__t=( index ))==null?'':__t)+
'" tabindex="-1">\r\n\t<span class="b-progress__item-text">'+
((__t=( index ))==null?'':__t)+
'</span>\r\n</a>\r\n';
}
return __p;
}
templates["QuestionItem"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="b-question__index">'+
((__t=( index ))==null?'':__t)+
'</div>\r\n<div class="b-question__content">\r\n\t'+
((__t=( content ))==null?'':__t)+
'\r\n\r\n\t';
 if (cutContent !== '') { 
__p+='\r\n\r\n\t\t<div class="b-question__content-cut">\r\n\t\t\t'+
((__t=( cutContent ))==null?'':__t)+
'\r\n\t\t</div>\r\n\t\t<p><a href="#" class="b-question__content-show-cut">Подробнее</a></p>\r\n\r\n\t';
 } 
__p+='\r\n</div>\r\n<div class="b-question__controls">\r\n\t';
 for (var i = 0; i < controls.length; i++) { 
__p+='\r\n\t\t<div class="b-question__row">\r\n\t\t\t';
 if (controls[i].type === 'textarea') { 
__p+='\r\n\t\t\t\t<textarea class="b-question__textarea" tabindex="'+
((__t=( index ))==null?'':__t)+
''+
((__t=( i ))==null?'':__t)+
'"></textarea>\r\n\t\t\t';
 } 
__p+='\r\n\t\t\t';
 if (controls[i].type === 'radio') { 
__p+='\r\n\t\t\t\t';
 for (var j = 0; j < controls[i].options.length; j++) { 
__p+='\r\n\t\t\t\t\t<label class="b-question__label">\r\n\t\t\t\t\t\t<input type="'+
((__t=( controls[i].type ))==null?'':__t)+
'" tabindex="'+
((__t=( index ))==null?'':__t)+
''+
((__t=( i ))==null?'':__t)+
'" name="question__'+
((__t=( index ))==null?'':__t)+
'__'+
((__t=( i ))==null?'':__t)+
'" />\r\n\t\t\t\t\t\t<span>'+
((__t=( controls[i].options[j] ))==null?'':__t)+
'</span>\r\n\t\t\t\t\t</label>\r\n\t\t\t\t';
 } 
__p+='\r\n\t\t\t';
 } 
__p+='\r\n\t\t</div>\r\n\t';
 } 
__p+='\r\n</div>\r\n';
}
return __p;
}
templates["Questions"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='\n\t<form action="#">\n\t\t<div class="b-questions__header">\n\t\t\t'+
((__t=( headContent ))==null?'':__t)+
'\n\t\t\t\n\t\t</div>\n\t\t<div class="b-questions__form">\n\n\t\t</div>\n\t\t<div class="b-questions__footer">\n\t\t\t<button class="b-questions__button" tabindex="1000">Отпарвить анкету</button>\n\t\t</div>\n\t</form>\n\n';
}
return __p;
}