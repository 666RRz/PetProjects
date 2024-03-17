function addNewStudent() {
	const ul = document.querySelector('.list__ul')
	const button = document.querySelector('.form__button-save')

	// button.disabled = true
	// button.classList.add('hidden')

	let inputName,
		inputSurName,
		inputlastname,
		inputDate,
		inputGender,
		inputStart,
		inputEnd,
		inputFaculty,
		inputAbout

	inputName = document.getElementById('input-name')
	inputSurName = document.getElementById('input-surname')
	inputlastname = document.getElementById('input-lastname')
	inputDate = document.getElementById('input-date')
	inputGender = document.getElementById('input-gender')
	inputStart = document.getElementById('input-start')
	inputEnd = document.getElementById('input-end')
	inputFaculty = document.getElementById('input-faculty')
	inputAbout = document.getElementById('input-about')

	inputStart.setAttribute('max', new Date().getFullYear())
	inputEnd.setAttribute('max', new Date().getFullYear() + 4)

	const inputs = document.querySelectorAll('.form__input')

	let inputsArray = Array.from(inputs)
	let validAll
	let validOne

	setInterval(() => {
		validAll = inputsArray.every(input => {
			return input.checkValidity()
		})

		if (validAll && !ul.classList.contains('vision')) {
			button.classList.remove('hidden')
			button.disabled = false
		} else {
			button.classList.add('hidden')
			button.disabled = true
		}

		for (const one of inputsArray) {
			if (one.checkValidity()) {
				one.classList.remove('red')
				one.classList.add('green')
			} else if (!one.checkValidity()) {
				one.classList.remove('green')
				one.classList.add('red')
			}
		}

		inputName = document.getElementById('input-name').value.trim()
		inputSurName = document.getElementById('input-surname').value.trim()
		inputlastname = document.getElementById('input-lastname').value.trim()
		inputDate = document.getElementById('input-date').value.trim()
		inputGender = document.getElementById('input-gender').value.trim()
		inputStart = document.getElementById('input-start').value.trim()
		inputEnd = document.getElementById('input-end').value.trim()
		inputFaculty = document.getElementById('input-faculty').value.trim()
		inputAbout = document.getElementById('input-about').value.trim()

		// console.log(
		// 	inputName,
		// 	inputSurName,
		// 	inputlastname,
		// 	inputDate,
		// 	inputGender,
		// 	inputStart,
		// 	inputEnd,
		// 	inputFaculty
		// )

		// if (
		// 	inputName !== '' &&
		// 	inputSurName !== '' &&
		// 	inputlastname !== '' &&
		// 	inputDate !== '' &&
		// 	inputGender !== '' &&
		// 	inputStart !== '' &&
		// 	inputEnd !== '' &&
		// 	inputFaculty !== '' &&
		// 	!ul.classList.contains('vision')
		// ) {
		// 	button.classList.remove('hidden')
		// 	button.disabled = false
		// } else {
		// 	button.classList.add('hidden')
		// 	button.disabled = true
		// }
	}, 1)

	const li = document.createElement('li')
	const createUpperDiv = document.createElement('div')
	const createBottomDiv = document.createElement('div')
	const createPName = document.createElement('p')
	const createPBirth = document.createElement('p')
	const createPStudyStart = document.createElement('p')
	const createPFaculty = document.createElement('p')
	const createPGender = document.createElement('p')
	const createPNumber = document.createElement('p')
	const buttonsDiv = document.createElement('div')
	const buttonAdd = document.createElement('button')
	const buttonDel = document.createElement('button')
	const link = document.createElement('a')

	button.addEventListener('click', touchButton)

	let student = ''

	function touchButton(e) {
		e.preventDefault()

		function Student(
			name,
			surname,
			lastname,
			birthday,
			gender,
			studyStart,
			endStudy,
			faculty,
			about
		) {
			this.name = name
			this.surname = surname
			this.lastname = lastname
			this.birthday = new Date(`'${inputDate}'`)
			this.gender = gender
			this.studyStart = Number(studyStart)
			this.endStudy = Number(endStudy)
			this.faculty = faculty
			this.about = about
		}

		student = new Student(
			inputName,
			inputSurName,
			inputlastname,
			inputDate,
			inputGender,
			inputStart,
			inputEnd,
			inputFaculty,
			inputAbout
		)

		ul.classList.remove('hidden')
		ul.classList.add('vision')

		li.classList.add('list', 'flex')
		createBottomDiv.classList.add('list__bottom', 'flex')
		createPName.classList.add('p__name')
		createPBirth.classList.add('p__birth')
		createPStudyStart.classList.add('p__studyStart')
		createPFaculty.classList.add('p__faculty')
		createPGender.classList.add('p__gender')
		createPNumber.classList.add('p__number')
		buttonsDiv.classList.add('ul__buttons-div', 'flex')
		link.classList.add('ul__buttons-link')
		buttonAdd.classList.add('ul__button-add')
		buttonDel.classList.add('ul__button-del')

		if (inputGender === 'Мужской') {
			createUpperDiv.classList.add('list__photo-man')
		} else {
			createUpperDiv.classList.add('list__photo-wom')
		}

		createPName.textContent = `ФИО: ${student.surname} ${student.name}  ${student.lastname}`
		const birthday = new Date(`${student.birthday}`)
		student.birthday = new Date(`${student.birthday}`)

		createPBirth.textContent = `Дата рождения: ${birthday.getDate()}.${
			birthday.getMonth() + 1
		}.${birthday.getFullYear()}`
		createPStudyStart.textContent = `Начало обучения: ${student.studyStart}-${student.endStudy}`
		createPFaculty.textContent = `Факультет: ${student.faculty}`
		createPGender.textContent = `Пол: ${student.gender}`
		createPNumber.textContent = `Номер студента: отобразится после добавления`
		buttonAdd.textContent = 'Добавить'
		buttonDel.textContent = 'Удалить'

		gender = student.gender

		createBottomDiv.append(
			createPName,
			createPFaculty,
			createPBirth,
			createPStudyStart,
			createPGender,
			createPNumber
		)

		link.append(buttonAdd)
		link.setAttribute('href', 'main.html')

		buttonsDiv.append(link, buttonDel)
		li.append(createUpperDiv, createBottomDiv, buttonsDiv)

		ul.appendChild(li)

		inputName = document.getElementById('input-name').value = ''
		inputSurName = document.getElementById('input-surname').value = ''
		inputlastname = document.getElementById('input-lastname').value = ''
		inputDate = document.getElementById('input-date').value = ''
		inputGender = document.getElementById('input-gender').value = ''
		inputStart = document.getElementById('input-start').value = ''
		inputEnd = document.getElementById('input-end').value = ''
		inputFaculty = document.getElementById('input-faculty').value = ''
		inputAbout = document.getElementById('input-about').value = ''

		buttonDel.addEventListener('click', () => {
			window.location.reload()
		})

		async function addStudentToServer(student) {
			const response = await fetch('http://localhost:3000/api/students', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(student),
			})
			const data = response.json()
			console.log(data)
		}

		let numberStudent

		buttonAdd.addEventListener('click', () => {
			if (numberStudent === undefined) {
				numberStudent = 1
			} else if (numberStudent == parseInt(localStorage.getItem('number'))) {
				numberStudent++
			}
			localStorage.setItem('number', numberStudent)
			addStudentToServer(student)
		})
	}
}
addNewStudent()
