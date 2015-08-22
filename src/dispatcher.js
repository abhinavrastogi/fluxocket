import {Dispatcher as _Dispatcher} from 'flux';

var Dispatcher = new _Dispatcher();

var _dispatch = Dispatcher.dispatch.bind(Dispatcher);

Dispatcher.setSocket = function(_socket) {
	Dispatcher._socket = _socket;

	_socket.on('flux_action', payload => {
		Dispatcher.dispatch(payload, false);
});
};

Dispatcher.dispatch = function(payload, broadcast = true) {
	if(broadcast) {
		if(Dispatcher._socket) {
			Dispatcher._socket.emit('flux_action', payload);
		}
	}

	return _dispatch(payload);
};

export default Dispatcher;
