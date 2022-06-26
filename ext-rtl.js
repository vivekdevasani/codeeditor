ace.define("ace/ext/rtl",["require","exports","module","ace/editor","ace/config"],function(e,t,a){"use strict";function o(e,t){var a=t.getSelection().lead;t.session.$bidiHandler.isRtlLine(a.row)&&0===a.column&&(t.session.$bidiHandler.isMoveLeftOperation&&a.row>0?t.getSelection().moveCursorTo(a.row-1,t.session.getLine(a.row-1).length):t.getSelection().isEmpty()?a.column+=1:a.setPosition(a.row,a.column+1))}function i(e){e.editor.session.$bidiHandler.isMoveLeftOperation=/gotoleft|selectleft|backspace|removewordleft/.test(e.command.name)}function r(e,t){var a=t.session;if(a.$bidiHandler.currentRow=null,a.$bidiHandler.isRtlLine(e.start.row)&&"insert"===e.action&&e.lines.length>1)for(var o=e.start.row;o<e.end.row;o++)a.getLine(o+1).charAt(0)!==a.$bidiHandler.RLE&&(a.doc.$lines[o+1]=a.$bidiHandler.RLE+a.getLine(o+1))}function s(e,t){var a=t.session,o=a.$bidiHandler,i=t.$textLayer.$lines.cells,r=t.layerConfig.width-t.layerConfig.padding+"px";i.forEach(function(e){var t=e.element.style;o&&o.isRtlLine(e.row)?(t.direction="rtl",t.textAlign="right",t.width=r):(t.direction="",t.textAlign="",t.width="")})}function n(e){function t(e){var t=e.element.style;t.direction=t.textAlign=t.width=""}var a=e.$textLayer.$lines;a.cells.forEach(t),a.cellCache.forEach(t)}var l=[{name:"leftToRight",bindKey:{win:"Ctrl-Alt-Shift-L",mac:"Command-Alt-Shift-L"},exec:function(e){e.session.$bidiHandler.setRtlDirection(e,!1)},readOnly:!0},{name:"rightToLeft",bindKey:{win:"Ctrl-Alt-Shift-R",mac:"Command-Alt-Shift-R"},exec:function(e){e.session.$bidiHandler.setRtlDirection(e,!0)},readOnly:!0}],c=e("../editor").Editor;e("../config").defineOptions(c.prototype,"editor",{rtlText:{set:function(e){e?(this.on("change",r),this.on("changeSelection",o),this.renderer.on("afterRender",s),this.commands.on("exec",i),this.commands.addCommands(l)):(this.off("change",r),this.off("changeSelection",o),this.renderer.off("afterRender",s),this.commands.off("exec",i),this.commands.removeCommands(l),n(this.renderer)),this.renderer.updateFull()}},rtl:{set:function(e){this.session.$bidiHandler.$isRtl=e,e?(this.setOption("rtlText",!1),this.renderer.on("afterRender",s),this.session.$bidiHandler.seenBidi=!0):(this.renderer.off("afterRender",s),n(this.renderer)),this.renderer.updateFull()}}})}),function(){ace.require(["ace/ext/rtl"],function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)})}();