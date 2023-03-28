const filterForm = document.getElementById('filter-form')
const result = document.getElementById('result')

filterForm.addEventListener('submit', async e => {
  e.preventDefault()
  const formData = new FormData(filterForm)
  const available = formData.get('available')
  const date = formData.get('date')
  const time = formData.get('time')

  const res = await fetch(`/filterAvailable?available=${available}&&date=${date}&&time=${time}`)
  const data = await res.text()

  result.innerHTML = data
})