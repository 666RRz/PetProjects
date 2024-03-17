async function getStudentFromServer(id) {
	const res = await fetch('http://localhost:3000/api/students/' + id)
	return await res.json()
}

async function deleteStudentFromServer(id) {
	const res = await fetch('http://localhost:3000/api/students/' + id, {
		method: 'DELETE',
		body: JSON.stringify(id),
	})
	return await res.json()
}

let URLData = new URLSearchParams(window.location.search)
let id = URLData.get('student_id')

let student = await getStudentFromServer(id)

function createStudentProfile(student) {
	const createDivPhoto = document.createElement('div')
	const createDivDesc = document.createElement('div')
	const createDivInfo = document.createElement('div')
	const createStudentDiv = document.createElement('div')

	const createHiddenDiv = document.createElement('div')
	const createHiddenH2 = document.createElement('h2')
	const createButtonsDiv = document.createElement('div')
	const createDeleteYes = document.createElement('button')
	const createDeleteNo = document.createElement('button')
	const createYesLink = document.createElement('a')

	const createAbout = document.createElement('p')
	const createPName = document.createElement('p')
	const createPBirth = document.createElement('p')
	const createPStudyStart = document.createElement('p')
	const createPFaculty = document.createElement('p')
	const createDeleteBtn = document.createElement('button')
	createDeleteYes.classList.add('delete-yes', 'btn-reset', 'delete-button')
	createDeleteNo.classList.add('delete-no', 'btn-reset', 'delete-button')
	createYesLink.classList.add('yes-link', 'a-reset')

	createYesLink.setAttribute('href', 'main.html')

	createStudentDiv.classList.add('student__div')
	createDeleteBtn.classList.add('student__delete', 'btn-reset')
	createHiddenDiv.classList.add('hidden-div', 'hidden')
	createHiddenH2.classList.add('hidden-h2')
	createButtonsDiv.classList.add('hidden-button')

	createDivPhoto.classList.add('student__photo')
	createDivDesc.classList.add('student__desc')
	createDivInfo.classList.add('student__info')

	createPName.classList.add('p__name')
	createPBirth.classList.add('p__birth')
	createPStudyStart.classList.add('p__studyStart')
	createPFaculty.classList.add('p__faculty')

	if (student.gender === 'Мужской') {
		createDivPhoto.classList.add('list__photo-man')
	} else {
		createDivPhoto.classList.add('list__photo-wom')
	}

	let formattedBirthday

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

	createHiddenH2.textContent = 'Удалить студента?'
	createDeleteNo.textContent = 'Нет, не удалять'
	createDeleteYes.textContent = 'Да, удалить'
	createPName.textContent = `${student.surname}  ${student.name} ${student.lastname} `
	createPBirth.textContent = `Год рождения: ${parseInt(student.birthday)} г`
	// console.log(student.birthday)
	createPStudyStart.textContent = `Период обучения: ${student.studyStart}-${student.endStudy}  (${courseSum})`
	createPFaculty.textContent = `Учебное заведение/Факультет: ${student.faculty}`

	if (student.about === '') {
		createAbout.textContent = `О себе:
      не указано`
	} else {
		createAbout.textContent = `О себе:
			${student.about}`
	}

	const container = document.querySelector('.student__container')

	createYesLink.append(createDeleteYes)

	createButtonsDiv.append(createYesLink, createDeleteNo)
	createHiddenDiv.append(createHiddenH2, createButtonsDiv)

	document.body.prepend(createHiddenDiv)

	createDivDesc.append(createPName)
	createDivInfo.append(
		createPBirth,
		createPStudyStart,
		createPFaculty,
		createAbout
	)
	createStudentDiv.append(
		createDivPhoto,
		createDivDesc,
		createDivInfo,
		createDeleteBtn
	)

	container.append(createStudentDiv)

	createDeleteBtn.addEventListener('click', e => {
		e.preventDefault()
		createHiddenDiv.classList.remove('hidden')
	})

	createDeleteNo.addEventListener('click', () => {
		document.querySelector('.hidden-div').classList.add('hidden')
	})
	createDeleteYes.addEventListener('click', e => {
		deleteStudentFromServer(student.id)
	})
}

createStudentProfile(student)
