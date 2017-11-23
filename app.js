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

			this.tasks.push({do: 'read', done: false});

		},
		toggleDone: function(event) {

		  event.preventDefault();
		  event.target.style.color = '#F00';

		},
	}

});
