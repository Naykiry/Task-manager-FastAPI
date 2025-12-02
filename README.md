# FastAPI Tasks Manager

## Стек технологий

### Backend
- **FastAPI** — асинхронный веб-фреймворк
- **SQLAlchemy** — ORM для работы с БД
- **SQLite** (aiosqlite) — встроенная база данных
- **Uvicorn** — ASGI сервер

### Frontend
- **HTML5** + **Jinja2 Templates** — разметка
- **CSS3** — стилизация 
- **Vanilla JavaScript** — интерактивность без фреймворков

## Установка и запуск

### Предварительные требования
- Python 3.10+
- pip (менеджер пакетов Python)

### Шаги установки

1. **Клонируйте репозиторий**
   ```bash
   git clone https://github.com/Naykiry/Task-manager-FastAPI.git
   cd Task-manager-FastAPI
   ```

2. **Создайте виртуальное окружение**
   ```bash
   python -m venv venv
   ```

3. **Активируйте виртуальное окружение**
   - На Windows (PowerShell):
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   - На macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Установите зависимости**
   ```bash
   pip install -r requirements.txt
   ```

5. **Запустите приложение**
   ```bash
   uvicorn main:app --reload
   ```

6. **Откройте в браузере**
   ```
   http://127.0.0.1:8000/
   ```

## Структура проекта

```
Task-manager-FastAPI/
├── main.py                 # Точка входа приложения, конфигурация FastAPI
├── router.py               # API маршруты для управления задачами
├── repository.py           # Слой работы с БД 
├── database.py             # Конфигурация БД и ORM модели
├── schemas.py              # Pydantic модели для валидации данных
├── requirements.txt        # Зависимости Python
├── .gitignore              # Исключения для Git
├── README.md               # Этот файл
│
├── templates/
│   └── index.html          # HTML шаблон главной страницы
│
└── static/
    ├── css/
    │   └── style.css       # Стили 
    └── js/
        └── app.js          # JavaScript логика фронтенда
```

## API Эндпойнты

### Получить все задачи
```http
GET /tasks
```
**Ответ (200):**
```json
{
  "tasks": [
    {
      "id": 1,
      "name": "Купить продукты",
      "description": "Молоко, хлеб, масло"
    }
  ]
}
```

### Добавить новую задачу
```http
POST /tasks
Content-Type: application/json

{
  "name": "Написать отчет",
  "description": "К концу дня"
}
```
**Ответ (200):**
```json
{
  "ok": true,
  "task_id": 2
}
```

### Главная страница
```http
GET /
```
Возвращает отрендеренный HTML с фронтендом.

## Работа локально

### Режим разработки
Запуск с автоперезагрузкой при изменении кода:
```bash
uvicorn main:app --reload
```

### Очистка БД
При каждом запуске приложения таблицы пересоздаются (см. `lifespan` в `main.py`). Чтобы избежать этого, отредактируйте:
```python
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting up...")
    await create_tables()
    print("db ready")
    yield
    print("Shutting down...")
```

## Возможные улучшения

- [ ] Удаление/редактирование задач
- [ ] Отметить задачу как выполненную
- [ ] Категоризация/теги для задач
- [ ] Поиск и фильтрация задач
- [ ] Синхронизация в реальном времени (WebSocket)
- [ ] Аутентификация пользователей
- [ ] Темная тема
- [ ] Экспорт задач (PDF, CSV)


## Автор

**Naykiry** 