document.addEventListener('DOMContentLoaded', () => {
  const tasksEl = document.getElementById('tasks')
  const loadingEl = document.getElementById('loading')
  const refreshBtn = document.getElementById('refresh')
  const form = document.getElementById('taskForm')
  const addBtn = document.getElementById('addBtn')
  const nameInput = document.getElementById('name')
  const descInput = document.getElementById('description')
  const toast = document.getElementById('toast')

  function showToast(text, timeout = 2200) {
    toast.textContent = text
    toast.classList.add('show')
    clearTimeout(toast._t)
    toast._t = setTimeout(() => toast.classList.remove('show'), timeout)
  }

  function clearTasksPlaceholder() {
    // remove only 'loading' placeholders
    tasksEl.querySelectorAll('.loading').forEach(n => n.remove())
  }

  async function renderTasks() {
    clearTasksPlaceholder()
    loadingEl.style.display = 'flex'
    tasksEl.querySelectorAll('.card').forEach(n => n.remove())
    try {
      const res = await fetch('/tasks')
      const data = await res.json()
      const tasks = data.tasks || []
      if (tasks.length === 0) {
        const empty = document.createElement('div')
        empty.className = 'loading'
        empty.innerHTML = '<div style="color:var(--muted)">Нет задач</div>'
        tasksEl.appendChild(empty)
      } else {
        for (const t of tasks) {
          const card = document.createElement('article')
          card.className = 'card'
          const title = document.createElement('h3')
          title.textContent = t.name || 'Без названия'
          const desc = document.createElement('p')
          desc.textContent = t.description || '—'
          card.appendChild(title)
          card.appendChild(desc)
          // fade/slide in
          card.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 350, easing: 'cubic-bezier(.2,.9,.3,1)' })
          tasksEl.appendChild(card)
        }
      }
    } catch (err) {
      const errEl = document.createElement('div')
      errEl.className = 'loading'
      errEl.innerHTML = '<div style="color:#ffb4b4">Ошибка загрузки</div>'
      tasksEl.appendChild(errEl)
      console.error(err)
      showToast('Ошибка загрузки задач', 3000)
    } finally {
      loadingEl.style.display = 'none'
    }
  }

  refreshBtn.addEventListener('click', () => {
    renderTasks()
  })

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = nameInput.value.trim()
    const description = descInput.value.trim()
    if (!name) {
      showToast('Введите название задачи')
      return
    }
    addBtn.disabled = true
    addBtn.textContent = 'Добавляем...'
    try {
      const res = await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description: description || null }),
      })
      if (!res.ok) throw new Error('Network')
      const data = await res.json()
      if (data.ok) {
        showToast('Задача добавлена')
        nameInput.value = ''
        descInput.value = ''
        // animate add button
        addBtn.animate([{ transform: 'scale(1)' }, { transform: 'scale(.96)' }, { transform: 'scale(1)' }], { duration: 340 })
        // refresh list
        await renderTasks()
      } else {
        showToast('Не удалось добавить')
      }
    } catch (err) {
      console.error(err)
      showToast('Ошибка при добавлении')
    } finally {
      addBtn.disabled = false
      addBtn.textContent = 'Добавить'
    }
  })

  renderTasks()
})
