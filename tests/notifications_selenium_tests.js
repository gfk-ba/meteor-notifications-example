var URL = 'http://notifications-example.meteor.com';

module.exports = {
	"Check vanilla notification" : function (client) {
		client
				.url(URL)
				.setValue('.js-title', ['nightwatch', client.Keys.ENTER])
				.setValue('.js-msg', ['testMessage', client.Keys.ENTER])
				.click('.js-btn-client.button')
				.assert.containsText('.notification .title', 'nightwatch')
				.assert.containsText('.notification .message', 'testMessage')
				.click('.notification')
				.pause(500)
				.assert.elementNotPresent('.notification')
				.end();
	},
	"Check not user-closeable actually not closeable" : function (client) {
		client
				.url(URL)
				.assert.elementNotPresent('.notification')
				.click('.js-closeable')
				.click('.js-btn-client.button')
				.assert.elementPresent('.notification')
				.click('.notification')
				.pause(500)
				.assert.elementPresent('.notification')
				.end();
	},
	"User-closeable Notification with timeout gets removed after timeout" : function (client) {
		client
				.url(URL)
				.assert.elementNotPresent('.notification')
				.setValue('.js-timeout', '500')
				.click('.js-btn-client.button')
				.assert.elementPresent('.notification')
				.pause(1000)
				.assert.elementNotPresent('.notification')
				.end();
	},
	"NOT User-closeable Notification with timeout gets removed after timeout" : function (client) {
		client
				.url(URL)
				.assert.elementNotPresent('.notification')
				.setValue('.js-timeout', '500')
				.click('.js-closeable')
				.click('.js-btn-client.button')
				.assert.elementPresent('.notification')
				.pause(1000)
				.assert.elementNotPresent('.notification')
				.end();
	}
};