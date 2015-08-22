'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _flux = require('flux');

var Dispatcher = new _flux.Dispatcher();

var _dispatch = Dispatcher.dispatch.bind(Dispatcher);

Dispatcher.setSocket = function (_socket) {
	Dispatcher._socket = _socket;

	_socket.on('flux_action', function (payload) {
		Dispatcher.dispatch(payload, false);
	});
};

Dispatcher.dispatch = function (payload) {
	var broadcast = arguments[1] === undefined ? true : arguments[1];

	if (broadcast) {
		if (Dispatcher._socket) {
			Dispatcher._socket.emit('flux_action', payload);
		}
	}

	return _dispatch(payload);
};

exports['default'] = Dispatcher;
module.exports = exports['default'];
