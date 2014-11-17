var waitTime = 2000;
module.exports = {
	"Check vanilla notification" : function (client) {
		client
				.url(client.launch_url)
				.setValue('.js-title', ['nightwatch', client.Keys.ENTER])
				.setValue('.js-msg', ['testMessage', client.Keys.ENTER])
				.click('.js-btn-client.button')
				.assert.containsText('.notification .title', 'nightwatch')
				.assert.containsText('.notification .message', 'testMessage')
				.click('.notification')
				.waitForElementNotPresent('.notification', waitTime)
				.end();
	},
	"Check not user-closeable actually not closeable" : function (client) {
		client
				.url(client.launch_url)
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
				.url(client.launch_url)
				.assert.elementNotPresent('.notification')
				.setValue('.js-timeout', '500')
				.click('.js-btn-client.button')
				.assert.elementPresent('.notification')
				.waitForElementNotPresent('.notification', waitTime)
				.end();
	},
	"NOT User-closeable Notification with timeout gets removed after timeout" : function (client) {
		client
				.url(client.launch_url)
				.assert.elementNotPresent('.notification')
				.setValue('.js-timeout', '500')
				.click('.js-closeable')
				.click('.js-btn-client.button')
				.assert.elementPresent('.notification')
				.waitForElementNotPresent('.notification', waitTime)
				.end();
	},
	"Should call closed function when notification is closed": function (client) {
		client
				.url(client.launch_url)
				.assert.elementNotPresent('.notification');

		//We manually add a notification with a closed handler
		client.execute(function () {
			Notifications.error('test','test123', {closed: function () {  $('div#header > h1').text('Test Success!'); ;}});
		});

		client
				.waitForElementPresent('.notification', waitTime)
				.click('.notification')
				.waitForElementNotPresent('.notification', waitTime)
				.assert.containsText('div#header > h1', 'Test Success!')
				.end();
	}
};
