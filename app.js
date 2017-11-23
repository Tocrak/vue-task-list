new Vue({

	el: '#app',

	data: {
		newtask: '',
		tasks: [
			{ do: 'eat', done: true },
			{ do: 'sleep', done: false }
		]
	},

	methods: {
		addTask: function(event) {
			this.tasks.push({do: this.newtask, done: false});
			this.newtask = '';
		},
		removeTask: function(index) {
			this.tasks.splice(index, 1);
			return false;
		},
		toggleDone: function(index) {
		  this.tasks[index].done = !this.tasks[index].done;
		}
	}

});
