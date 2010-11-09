/**
 * Ajax.org Code Editor (ACE)
 *
 * @copyright 2010, Ajax.org Services B.V.
 * @license LGPLv3 <http://www.gnu.org/licenses/lgpl-3.0.txt>
 * @author Fabian Jakobs <fabian AT ajax DOT org>
 */

define(function(require, exports, module) {
    
var oop = require("ace/lib/oop");
var lang = require("ace/lib/lang");
var MEventEmitter = require("ace/event_emitter");

var WSChromeDebugMessageStream = function(socket) {
    this.$socket = socket;
    this.$attached = false;
};

(function() {

    oop.implement(this, MEventEmitter);

    this.$received = "";

    this.connect = function() {
        if (this.$attached)
            return;

        var self = this;

        this.$socket.on("message", function(e) {
            var message;
            try {
                message = JSON.parse(data);
            } catch(e) {
                return _self.$onerror();
            }
            if (message.type == "chrome-debug-ready")
                self.$dispatchEvent("connect");
            else {
                var response = new DevToolsMessage.fromString(e.body);
                self.$dispatchEvent("message", {data: response});
            }
        });
    };

    this.sendRequest = function(message) {
//        console.log("> Sent to Chrome:\n", message.stringify());
        var command = {
            command: "debugChrome",
            message: message.stringify()
        };
        this.$socket.send(JSON.stringify(message));
    };

    this.$onerror = function() {
        this.$dispatchEvent("error");
    };

}).call(WSChromeDebugMessageStream.prototype);

return WSChromeDebugMessageStream;

});