var templates = {};
templates["Progress"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="b-progress__wrap"><div class="b-progress__counter"><div class="b-progress__counter-wrap"><span class="b-progress__counter-text">'+
((__t=( progress ))==null?'':__t)+
'</span> %</div></div><ul class="b-progress__list"></ul></div>';
}
return __p;
}
templates["ProgressItem"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<a class="b-progress__item-link" href="#question'+
((__t=( index ))==null?'':__t)+
'" tabindex="-1"><span class="b-progress__item-text">'+
((__t=( index ))==null?'':__t)+
'</span></a>';
}
return __p;
}
templates["QuestionItem"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="b-question__index">'+
((__t=( index ))==null?'':__t)+
'</div><div class="b-question__content">'+
((__t=( content ))==null?'':__t)+
'';
 if (cutContent !== '') { 
__p+='<div class="b-question__content-cut">'+
((__t=( cutContent ))==null?'':__t)+
'</div><p><a href="#" class="b-question__content-show-cut">Подробнее</a></p>';
 } 
__p+='</div><div class="b-question__controls">';
 for (var i = 0; i < controls.length; i++) { 
__p+='<div class="b-question__row">';
 if (controls[i].type === 'textarea') { 
__p+='<textarea class="b-question__textarea" tabindex="'+
((__t=( index ))==null?'':__t)+
''+
((__t=( i ))==null?'':__t)+
'"></textarea>';
 } 
__p+='';
 if (controls[i].type === 'radio') { 
__p+='';
 for (var j = 0; j < controls[i].options.length; j++) { 
__p+='<label class="b-question__label"><input type="'+
((__t=( controls[i].type ))==null?'':__t)+
'" tabindex="'+
((__t=( index ))==null?'':__t)+
''+
((__t=( i ))==null?'':__t)+
'" name="question__'+
((__t=( index ))==null?'':__t)+
'__'+
((__t=( i ))==null?'':__t)+
'" /><span>'+
((__t=( controls[i].options[j] ))==null?'':__t)+
'</span></label>';
 } 
__p+='';
 } 
__p+='</div>';
 } 
__p+='</div>';
}
return __p;
}
templates["Form"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<form action="#"><div class="b-form__header">'+
((__t=( headContent ))==null?'':__t)+
'</div><div class="b-form__form"></div><div class="b-form__footer"><button class="b-form__button" tabindex="1000">Отпарвить анкету</button></div></form>';
}
return __p;
}