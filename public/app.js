new Vue({
	el: '#app',
	data: {
		newtask: '',
		tasks: {}
	},
	mounted: async function() {
		await this.loadTasks();
	},

	methods: {
	loadTasks: async function() {
		const url = `${window.location.origin}/api`;

		try {
			let response = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			});

			if (response.status == 200) {
				await response.json().then(tasks => {
					tasks.forEach(element => {
						if (this.tasks[element.listId] == null) {
							this.tasks[element.listId] = new Array({
								text: element.text,
								status: element.status,
								listId: element.listId,
								_id: element._id
							})
						} else {
							this.tasks[element.listId].push({
								text: element.text,
								status: element.status,
								listId: element.listId,
								_id: element._id
							})
						}
					});
				})
				this.newtask = ' ';
				this.newtask = '';
			} else {
				console.log(e)
				alert('Response error: ' + response.status);
			}
		
		} catch (e) {
			alert(e);
		}
	},
	addTask: async function(listId) {
		const url = `${window.location.origin}/api`;

		try {
			let response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify({
					text: this.newtask,
					listId: listId
				}),
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			});

			if (response.status == 200) {
				await response.json().then(task => {
					if (this.tasks[listId] == null) {
						this.tasks[listId] = new Array(task)
					} else {
						this.tasks[listId].push(task);
					}
				})
				this.newtask = ' ';
				this.newtask = '';
			} else {
				alert('Response error: ' + response.status);
			}
		
		} catch (e) {
			alert(e);
		}
	},
	removeTask: async function(listId, index) {
	
		const url = `${window.location.origin}/api`;

		try {
			let response = await fetch(url, {
				method: 'DELETE',
				body: JSON.stringify({id: this.tasks[listId][index]._id}),
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			});

			if (response.status == 200) {
				this.tasks[listId].splice(index, 1);
				this.newtask = ' ';
				this.newtask = '';
			} else {
				alert('Response error: ' + response.status);
			}
		
		} catch (e) {
			alert(e);
		}		
	},
	toggleDone: async function(listId, index) {
		const url = `${window.location.origin}/api`;

		try {
			let response = await fetch(url, {
				method: 'PATCH',
				body: JSON.stringify({
					id: this.tasks[listId][index]._id,
					status: !this.tasks[listId][index].status
				}),
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			});

			if (response.status == 200) {
				this.tasks[listId][index].status = !this.tasks[listId][index].status;
				this.newtask = ' ';
				this.newtask = '';
			} else {
				alert('Response error: ' + response.status);
			}
		
		} catch (e) {
			alert(e);
		}		
	}
	}

});
