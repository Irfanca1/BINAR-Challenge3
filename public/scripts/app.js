const filterForm = document.getElementById('filter-form')
const result = document.getElementById('result')

filterForm.addEventListener('submit', async e => {
  e.preventDefault()
  const formData = new FormData(filterForm)
  const available = formData.get('available')
  const date = formData.get('date')
  const time = formData.get('time')
  const penumpang = formData.get('penumpang')

  const res = await fetch(`/filterAvailable?available=${available}&&date=${date}&&time=${time}&&penumpang=${penumpang}`)
  const data = await res.text()

  result.innerHTML = data
})