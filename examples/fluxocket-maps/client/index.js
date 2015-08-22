import React from 'react';
import Store from './Store.js';
import Dispatcher from '../../../index.js';

Dispatcher.register(function(payload) {
	switch(payload.action) {
		case 'move_user':
			Store.add(payload.data);
			Store.emitChange();
			break;

		case 'remove_user':
			Store.remove(payload.data.id);
			Store.emitChange();
			break;
	}
});

let socket = io();
Dispatcher.setSocket(socket);

let Maps = React.createClass({
	getInitialState() {
		return {
			users: [],
			userid: ''
		}
	},
	componentWillMount() {
		Store.subscribe(this.change);

		let _userid = prompt('Enter name:');
		if(_userid.length>0) {
			this.setState({
				userid: _userid
			});
		}
	},
	componentDidMount() {
		this.getLocation();
	},
	getLocation() {
		if('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(position => {
				Dispatcher.dispatch({
					action: 'move_user',
					data: {
						lat: position.coords.latitude,
						long: position.coords.longitude,
						id: socket.id,
						name: this.state.userid
					}
				});
			});
		}
	},
	change() {
		this.setState({
			users: Store.get()
		});
		console.log(Store.get());
	},
	render() {
		var latlngbounds = new google.maps.LatLngBounds();

		this.state.users.map(user => {
			var infowindow = new google.maps.InfoWindow({
				content: user.name,
				position: { lat: user.lat, lng: user.long }
			});
			infowindow.open(map);
			latlngbounds.extend(new google.maps.LatLng(user.lat, user.long));
		});

		if(this.state.users.length > 1) {
			map.fitBounds(latlngbounds);
		} else if(this.state.users.length > 0) {
			map.panTo(new google.maps.LatLng(this.state.users[0].lat, this.state.users[0].long));
			map.setZoom(13);
		}

		return <div></div>
	}
});

React.render(<Maps />, document.getElementById('container'));
