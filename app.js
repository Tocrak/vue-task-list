new Vue({

	el: '#app',

	data: {
		newtask: '',
		tasks: []
	},

	mounted: function() {
		var savedTasks = JSON.parse(localStorage.getItem('tasks'));
		if(savedTasks !== null) {
			this.tasks = savedTasks;
		}
	},

	methods: {
		addTask: function(event) {
			this.tasks.push({do: this.newtask, done: false});
			localStorage.setItem('tasks', JSON.stringify(this.tasks));
			this.newtask = '';
		},
		removeTask: function(index) {
			this.tasks.splice(index, 1);
			window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
		},
		toggleDone: function(index) {
		  	this.tasks[index].done = !this.tasks[index].done;
			window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
		}
	}

});
