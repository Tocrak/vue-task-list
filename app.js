new Vue({

	el: '#app',

	data: {
		tasks: [
			{ do: 'eat', done: true },
			{ do: 'sleep', done: false }
		]
	},

	methods: {
		addTask: function(event) {
			this.tasks.push({do: 'read', done: false})
		}
	}

});
