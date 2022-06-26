ace.define("ace/ext/spellcheck",["require","exports","module","ace/lib/event","ace/editor","ace/config"],function(e,t,i){"use strict";var o=e("../lib/event");t.contextMenuHandler=function(e){var t=e.target,i=t.textInput.getElement();if(t.selection.isEmpty()){var s=t.getCursorPosition(),n=t.session.getWordRange(s.row,s.column),a=t.session.getTextRange(n);if(t.session.tokenRe.lastIndex=0,t.session.tokenRe.test(a)){var r="",c=a+" "+r;i.value=c,i.setSelectionRange(a.length,a.length+1),i.setSelectionRange(0,0),i.setSelectionRange(0,a.length);var l=!1;o.addListener(i,"keydown",function h(){o.removeListener(i,"keydown",h),l=!0}),t.textInput.setInputHandler(function(e){if(e==c)return"";if(0===e.lastIndexOf(c,0))return e.slice(c.length);if(e.substr(i.selectionEnd)==c)return e.slice(0,-c.length);if(e.slice(-2)==r){var o=e.slice(0,-2);if(" "==o.slice(-1))return l?o.substring(0,i.selectionEnd):(o=o.slice(0,-1),t.session.replace(n,o),"")}return e})}}};var s=e("../editor").Editor;e("../config").defineOptions(s.prototype,"editor",{spellcheck:{set:function(e){var i=this.textInput.getElement();i.spellcheck=!!e,e?this.on("nativecontextmenu",t.contextMenuHandler):this.removeListener("nativecontextmenu",t.contextMenuHandler)},value:!0}})}),function(){ace.require(["ace/ext/spellcheck"],function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)})}();