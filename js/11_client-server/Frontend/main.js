;(async () => {
	const ul = document.querySelector('.main-ul')
	const form = document.querySelector('.form__wrapper')
	const div = document.createElement('div')
	const menuDiv = document.querySelector('.form__settings-div')
	const fioBtn = document.querySelector('.button-fio')
	const facultyBtn = document.querySelector('.button-faculty')
	const birthBtn = document.querySelector('.button-born')
	const yearBtn = document.querySelector('.button-start')
	const numberBnt = document.querySelector('.button-number')
	const finder = document.querySelector('.finder')
	const mainInput = document.querySelector('.form__input-name')

	const buttonSortNum = document.querySelector('.form__button-sort')
	const buttonSortFio = document.querySelector('.form__button-abc')

	const menuButton = document.querySelector('.form__settings-button')
	menuButton.addEventListener('click', () => {
		menuDiv.style.zIndex = '2'
		menuDiv.classList.toggle('hidden')
		wallpaper()
	})

	fioBtn.disabled = false
	facultyBtn.disabled = false
	birthBtn.disabled = false
	yearBtn.disabled = false
	numberBnt.disabled = false

	// server
	let studentList = await getStudentList()

	// const requestURL = fetch('http://localhost:3000/api/students')
	async function getStudentList() {
		const response = await fetch('http://localhost:3000/api/students')
		return await response.json()
	}

	console.log(studentList)

	//server

	function wallpaper() {
		div.style.width = '100%'
		div.style.height = '100%'
		div.style.zIndex = '1'
		div.style.position = 'absolute'

		document.body.prepend(div)

		div.addEventListener('click', () => {
			menuDiv.classList.add('hidden')
			div.remove()
		})
		return div
	}

	function createList(student) {
		student.birthday = new Date(student.birthday)
		let year = ''

		const yearSum = new Date().getFullYear() - student.birthday.getFullYear()

		if (
			yearSum > 20 &&
			(yearSum % 10 === 1 ||
				yearSum % 10 === 2 ||
				yearSum % 10 === 3 ||
				yearSum % 10 === 4)
		) {
			year = 'года'
		} else {
			year = 'лет'
		}

		let formattedBirthday
		switch (true) {
			case student.birthday.getMonth() < 9:
				formattedBirthday = `Дата рождения: ${
					student.birthday.getDate() < 10
						? '0' + student.birthday.getDate()
						: student.birthday.getDate()
				}.0${
					student.birthday.getMonth() + 1
				}.${student.birthday.getFullYear()} (${yearSum} ${year})`
				break
			case student.birthday.getMonth() === 9 &&
				student.birthday.getDate() === 9:
				formattedBirthday = `Дата рождения: 0${student.birthday.getDate()}.0${
					student.birthday.getMonth() + 1
				}.${student.birthday.getFullYear()} (${yearSum} ${year})`
				break
			case student.birthday.getMonth() >= 9 && student.birthday.getDate() < 10:
				formattedBirthday = `Дата рождения: 0${student.birthday.getDate()}.${
					student.birthday.getMonth() + 1 < 10
						? '0' + (student.birthday.getMonth() + 1)
						: student.birthday.getMonth() + 1
				}.${student.birthday.getFullYear()} (${yearSum} ${year})`
				break
			case student.birthday.getDate() < 10:
				formattedBirthday = `Дата рождения: 0${student.birthday.getDate()}.${
					student.birthday.getMonth() + 1
				}.${student.birthday.getFullYear()} (${yearSum} ${year})`
				break
			default:
				formattedBirthday = `Дата рождения: ${
					student.birthday.getDate() < 10
						? '0' + student.birthday.getDate()
						: student.birthday.getDate()
				}.${
					student.birthday.getMonth() + 1
				}.${student.birthday.getFullYear()} (${yearSum} ${year})`
		}

		let courseSum = Math.abs(new Date().getFullYear() - student.studyStart)

		let oldDate = new Date(`${student.endStudy}-09-01`)
		let newDate = new Date()

		if (
			(courseSum > 4 && newDate > oldDate) ||
			(courseSum > 4 && newDate < oldDate)
		) {
			courseSum = `Закончил учёбу`
		} else {
			courseSum = `${new Date().getFullYear() - student.studyStart} курс`
		}

		const createLi = document.createElement('li')
		const createUpperDiv = document.createElement('div')
		const createBottomDiv = document.createElement('div')
		const createPName = document.createElement('p')
		const createPBirth = document.createElement('p')
		const createPStudyStart = document.createElement('p')
		const createPFaculty = document.createElement('p')
		const createPNumber = document.createElement('p')
		const createListLink = document.createElement('a')

		ul.classList.add('flex', 'ul')
		createLi.classList.add('list', 'flex')
		if (student.gender === 'Мужской') {
			createUpperDiv.classList.add('list__photo-man')
		} else {
			createUpperDiv.classList.add('list__photo-wom')
		}
		createBottomDiv.classList.add('list__bottom', 'flex')
		createPName.classList.add('p__name')
		createPBirth.classList.add('p__birth')
		createPStudyStart.classList.add('p__studyStart')
		createPFaculty.classList.add('p__faculty')
		createPNumber.classList.add('p__number')
		createListLink.classList.add('list__link', 'a-reset')

		createListLink.setAttribute('href', 'student.html?student_id=' + student.id)

		createPName.textContent = `ФИО: ${student.surname}  ${student.name} ${student.lastname}  `
		createPBirth.textContent = formattedBirthday
		createPStudyStart.textContent = `Начало обучения: ${student.studyStart}-${student.endStudy} (${courseSum}) `
		createPFaculty.textContent = `Факультет: ${student.faculty}`
		createPNumber.textContent = `Номер студента: ${student.number}`

		createBottomDiv.append(
			createPName,
			createPFaculty,
			createPBirth,
			createPStudyStart,
			createPNumber
		)

		createListLink.append(createUpperDiv, createBottomDiv)
		createLi.append(createListLink)
		ul.append(createLi)
	}

	function createStudentList() {
		ul.innerHTML = ''
		for (let i = 0; i < studentList.length; i++) {
			student = studentList[i]
			studentList.forEach((element, i) => {
				let student = element
				let index = i
				student.number = index + 1
			})
			createList(student)
		}
	}

	fioBtn.addEventListener('click', e => {
		e.preventDefault()

		wallpaper().click()

		form.style.marginBottom = '20px'

		fioBtn.disabled = true

		const inputGroups = document.querySelector('.input__groups')
		const createInputNameSurname = document.createElement('input')
		const createInputLastname = document.createElement('input')

		createInputNameSurname.classList.add('button__inputs', 'button__surname')
		createInputLastname.classList.add(
			'button__inputs',
			'button__inputs-lastname'
		)

		createInputNameSurname.setAttribute('placeholder', 'Введите фамилию')
		createInputNameSurname.setAttribute('pattern', '[А-Яа-яЁё ]+')
		createInputNameSurname.setAttribute('required', '')
		createInputNameSurname.setAttribute('title', 'Только кириллица')
		createInputNameSurname.setAttribute('type', 'text')
		createInputNameSurname.setAttribute(
			'oninput',
			'capitalizeFirstLetter(this)'
		)

		createInputLastname.setAttribute('placeholder', 'Введите отчество')
		createInputLastname.setAttribute('pattern', '[А-Яа-яЁё ]+')
		createInputLastname.setAttribute('required', '')
		createInputLastname.setAttribute('title', 'Только кириллица')
		createInputLastname.setAttribute('type', 'text')
		createInputLastname.setAttribute('oninput', 'capitalizeFirstLetter(this)')

		finder.classList.remove('hidden')
		inputGroups.append(createInputNameSurname, createInputLastname)

		const inputSurname = document.querySelector('.button__surname')
		const inputLastname = document.querySelector('.button__inputs-lastname')

		inputSurname.addEventListener('input', () => {
			let value = inputSurname.value.trim()

			if (value !== '') {
				const results = studentList.filter(student => {
					return student.surname.toLowerCase().includes(value.toLowerCase())
				})

				ul.innerHTML = ''

				for (let i = 0; i < results.length; i++) {
					const student = results[i]
					createList(student)
				}
			} else {
				createStudentList()
			}
		})

		inputLastname.addEventListener('input', () => {
			let value = inputLastname.value.trim()

			if (value !== '') {
				const results = studentList.filter(student => {
					return student.lastname.toLowerCase().includes(value.toLowerCase())
				})

				ul.innerHTML = ''

				for (let i = 0; i < results.length; i++) {
					const student = results[i]
					createList(student)
				}
			} else {
				createStudentList()
			}
		})
	})

	facultyBtn.addEventListener('click', e => {
		e.preventDefault()

		wallpaper().click()

		form.style.marginBottom = '20px'

		facultyBtn.disabled = true

		const div = document.querySelector('.input__groups')
		const createInputFaculty = document.createElement('input')

		createInputFaculty.classList.add('button__inputs', 'button__inputs-faculty')

		createInputFaculty.setAttribute(
			'placeholder',
			'Введите название факультета'
		)
		createInputFaculty.setAttribute('oninput', 'capitalizeFirstLetter(this)')

		finder.classList.remove('hidden')
		div.append(createInputFaculty)

		const inputFaculty = document.querySelector('.button__inputs-faculty')

		inputFaculty.addEventListener('input', () => {
			let value = inputFaculty.value.trim()

			if (value !== '') {
				const results = studentList.filter(student => {
					return student.faculty.toLowerCase().includes(value.toLowerCase())
				})

				ul.innerHTML = ''

				for (let i = 0; i < results.length; i++) {
					const student = results[i]
					createList(student)
				}
			} else {
				createStudentList()
			}
		})
	})

	birthBtn.addEventListener('click', e => {
		e.preventDefault()

		wallpaper().click()

		form.style.marginBottom = '20px'

		birthBtn.disabled = true

		const div = document.querySelector('.input__groups-faculty')
		const createInputBirth = document.createElement('input')

		createInputBirth.classList.add('button__inputs', 'button__inputs-birth')

		createInputBirth.setAttribute('type', 'date')

		finder.classList.remove('hidden')
		div.append(createInputBirth)

		const inputBirth = document.querySelector('.button__inputs-birth')

		inputBirth.addEventListener('input', () => {
			let value = inputBirth.value.trim()
			value = new Date(value)

			if (value !== '') {
				const results = studentList.filter(student => {
					return (
						student.birthday.getFullYear() === value.getFullYear() &&
						student.birthday.getMonth() === value.getMonth() &&
						student.birthday.getDate() === value.getDate()
					)
				})

				ul.innerHTML = ''

				for (let i = 0; i < results.length; i++) {
					const student = results[i]
					createList(student)
				}
			} else {
				createStudentList()
			}
		})
	})

	yearBtn.addEventListener('click', e => {
		e.preventDefault()

		wallpaper().click()

		form.style.marginBottom = '20px'

		yearBtn.disabled = true

		const div = document.querySelector('.input__groups-faculty')
		const createInputYear = document.createElement('input')

		createInputYear.classList.add(
			'button__inputs',
			'button__inputs-faculty',
			'year-input'
		)

		createInputYear.setAttribute('placeholder', 'Введите год начала обучения')
		createInputYear.setAttribute('type', 'number')
		createInputYear.setAttribute('min', '2000')
		createInputYear.setAttribute('max', new Date().getFullYear())
		createInputYear.setAttribute('maxlength', '4')

		finder.classList.remove('hidden')
		div.append(createInputYear)

		createInputYear.addEventListener('input', () => {
			if (createInputYear.value.length > 4) {
				let digits = createInputYear.value
					.split('')
					.filter(char => !isNaN(char))
				if (digits.length > 4) {
					let newDigits = digits.slice(0, 4)
					createInputYear.value = newDigits.join('')
				}
			}

			let value = createInputYear.value.trim()

			if (value !== '') {
				const results = studentList.filter(student => {
					return student.studyStart === Number(value)
				})

				ul.innerHTML = ''

				for (let i = 0; i < results.length; i++) {
					const student = results[i]
					createList(student)
				}
			} else {
				createStudentList()
			}
		})
	})

	numberBnt.addEventListener('click', e => {
		e.preventDefault()

		wallpaper().click()

		form.style.marginBottom = '20px'

		numberBnt.disabled = true

		const div = document.querySelector('.input__groups-number')
		const createInputNumber = document.createElement('input')

		createInputNumber.classList.add('button__inputs', 'button__inputs-faculty')

		createInputNumber.setAttribute('placeholder', 'Введите номер ученика')
		createInputNumber.setAttribute('type', 'number')
		createInputNumber.setAttribute('min', '0')

		finder.classList.remove('hidden')
		div.append(createInputNumber)

		createInputNumber.addEventListener('input', () => {
			let value = createInputNumber.value.trim()

			if (value !== '') {
				const results = studentList.filter(student => {
					return student.number === Number(value)
				})

				ul.innerHTML = ''

				for (let i = 0; i < results.length; i++) {
					const student = results[i]
					createList(student)
				}
			} else {
				createStudentList()
			}
		})
	})

	mainInput.addEventListener('input', () => {
		let value = mainInput.value.trim()

		if (value !== '') {
			const results = studentList.filter(student => {
				return student.name.toLowerCase().includes(value.toLowerCase())
			})

			ul.innerHTML = ''

			for (let i = 0; i < results.length; i++) {
				const student = results[i]
				createList(student)
			}
		} else {
			createStudentList()
		}
	})

	buttonSortNum.addEventListener('click', e => {
		e.preventDefault()

		ul.innerHTML = ''

		if (studentList[0].number === 1) {
			const results = studentList.sort((a, b) => b.number - a.number)
			for (let i = 0; i < results.length; i++) {
				const student = results[i]
				createList(student)
			}
		} else {
			const results = studentList.sort((a, b) => a.number - b.number)
			for (let i = 0; i < results.length; i++) {
				const student = results[i]
				createList(student)
			}
		}
	})

	buttonSortFio.addEventListener('click', e => {
		e.preventDefault()

		ul.innerHTML = ''

		if (!buttonSortFio.classList.contains('check')) {
			const results = studentList.sort((a, b) => {
				return b.surname.charAt(0).localeCompare(a.surname.charAt(0))
			})
			buttonSortFio.classList.add('check')
			results.forEach(student => {
				createList(student)
			})
		} else {
			const results = studentList.sort((a, b) => {
				return a.surname.charAt(0).localeCompare(b.surname.charAt(0))
			})
			buttonSortFio.classList.remove('check')
			results.forEach(student => {
				createList(student)
			})
		}
	})

	createStudentList()
})()
