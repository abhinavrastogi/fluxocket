import { EventEmitter } from 'events';
import assign from 'object-assign';

let _store = [];

let Store = assign({}, EventEmitter.prototype, {
	get: function(id) {
		return id ? _store[id] : _store;
	},
	add: function(newItem) {
		let existsInStore = false;

		_store = _store.map(function(item) {
			if(item.id == newItem.id) {
				existsInStore = true;
				return newItem;
			}

			return item;
		});

		if(!existsInStore) {
			_store.push(newItem);
		}
	},
	remove: function(id) {
		let foundPosition = -1;

		_store.map(function(item, i) {
			if(item.id == id) {
				foundPosition = i;
			}
		});

		_store.splice(foundPosition, 1);
	},
	emitChange: function() {
		this.emit('change');
	},
	subscribe: function(callback) {
		this.on('change', callback);
	},
	unsubscribe: function(callback) {
		this.removeListener('change', callback);
	}
});

export default Store;
