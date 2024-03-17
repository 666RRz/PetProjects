;(function () {
	let massiveDeals = []
	let listName = ''
	let id = 0

	function createAppTitle(title) {
		let appTitle = document.createElement('h2')
		appTitle.innerHTML = title
		return appTitle
	}

	function createToDoItemForm() {
		let form = document.createElement('form')
		let input = document.createElement('input')
		let buttonWrapper = document.createElement('div')
		let button = document.createElement('button')
		button.classList.add('main-button')

		button.disabled = true

		input.addEventListener('input', function () {
			if (!input.value) {
				button.disabled = true
			} else {
				button.disabled = false
			}
		})

		form.classList.add('input-group', 'mb-3')
		input.classList.add('form-control')
		input.placeholder = 'Введите название нового дела'
		buttonWrapper.classList.add('input-group-append')
		button.classList.add('btn', 'btn-primary')
		button.id = 'main-button'
		button.textContent = 'Добавить дело'

		buttonWrapper.append(button)
		form.append(input)
		form.append(buttonWrapper)

		return {
			form,
			input,
			button,
		}
	}

	function createToDoList() {
		let list = document.createElement('ul')
		list.classList.add('list-group')
		return list
	}

	function createToDoItem(obj) {
		let item = document.createElement('li')
		let buttonGroup = document.createElement('div')
		let doneButton = document.createElement('button')
		let deleteButton = document.createElement('button')

		item.classList.add(
			'list-group-item',
			'd-flex',
			'justify-content-between',
			'align-items-center'
		)
		let nextId = id++
		item.id = nextId

		if (obj.done) {
			item.classList.add('list-group-item-success')
		}

		item.textContent = obj.name

		buttonGroup.classList.add('btn-group', 'btn-group-sm')
		doneButton.classList.add('btn', 'btn-success')
		doneButton.textContent = 'Готово'
		deleteButton.classList.add('btn', 'btn-danger')
		deleteButton.textContent = 'Удалить'

		buttonGroup.append(doneButton)
		buttonGroup.append(deleteButton)
		item.appendChild(buttonGroup)

		doneButton.addEventListener('click', function () {
			item.classList.toggle('list-group-item-success')
			let currentName = item.firstChild.textContent
			for (let listItem of massiveDeals) {
				if (listItem.name == currentName) {
					listItem.done = !listItem.done
				}
				saveList(massiveDeals, listName)
			}
		})

		deleteButton.addEventListener('click', function () {
			if (confirm('Вы уверены?')) {
				let currentId = item.id
				item.remove()
				for (let i = 0; i < massiveDeals.length; i++) {
					if (massiveDeals[i].id == currentId) {
						massiveDeals.splice(i, 1)
					}
				}
				saveList(massiveDeals, listName)
			}
		})

		return {
			item,
			doneButton,
			deleteButton,
		}
	}

	function saveList(arr, keyName) {
		localStorage.setItem(keyName, JSON.stringify(arr))
	}

	function createToDoApp(container, title, keyName) {
		let todoAppTitle = createAppTitle(title)
		let todoItemForm = createToDoItemForm()
		let todoList = createToDoList()

		listName = keyName

		container.append(todoAppTitle)
		container.append(todoItemForm.form)
		container.append(todoList)

		let localData = localStorage.getItem(listName)
		if (localData !== null && localData !== '')
			massiveDeals = JSON.parse(localData)

		for (let itemList of massiveDeals) {
			let todoItem = createToDoItem(itemList)
			todoList.append(todoItem.item)
		}

		//браузер будет создавать событие sumbit на форме, либо по нажатию на кнопку создать, либо по нажатию  Enter в поле ввода
		todoItemForm.form.addEventListener('submit', function (e) {
			e.preventDefault() // - если бы не было этой строчки, то при отправке формы, браузер бы просто перезагружал страницу

			if (!todoItemForm.input.value) {
				// - тут проверяем пустая ли строчка ввода, если чел ничего не ввел, то просто возвращаемся и ничего не делаем
				return
			}

			let inputValue = todoItemForm.input.value
			let todoItem = createToDoItem({
				name: inputValue,
				done: false,
			})
			todoList.append(todoItem.item)

			let newOne = {
				name: todoItemForm.input.value,
				id: todoItem.item.id,
				done: false,
			}

			massiveDeals.push(newOne)
			console.log(massiveDeals)
			todoList.append(todoItem.item)
			saveList(massiveDeals, listName)
			todoItemForm.button.disabled = true
			todoItemForm.input.value = '' // - когда пользователь отправит дело в список - эта команда обнулит поле для ввода и сделает его снова чистым
		})
	}

	window.createToDoApp = createToDoApp
})()
