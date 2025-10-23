# Posts API Documentation

Базовый URL: `/posts`

## Endpoints

### 📄 GET /posts
Получить все посты

**Response:** `200 OK`
```json
[
  {
    "id": "1730000000000-abc123def",
    "title": "Заголовок поста",
    "content": "Содержимое поста",
    "imageUrl": "https://example.com/image.jpg"
  }
]
```

---

### 📄 GET /posts/:id
Получить пост по ID

**Response:** `200 OK`
```json
{
  "id": "1",
  "title": "Заголовок поста",
  "content": "Содержимое поста",
  "imageUrl": "https://example.com/image.jpg"
}
```

**Error:** `404 Not Found`
```json
{
  "error": "Post with id \"123\" not found"
}
```

---

### ✏️ POST /posts
Создать новый пост

**Request Body:**
```json
{
  "title": "Заголовок поста",
  "content": "Содержимое поста",
  "imageUrl": "https://example.com/image.jpg"  // опционально
}
```

**Response:** `201 Created`
```json
{
  "id": "1730000000000-abc123def",
  "title": "Заголовок поста",
  "content": "Содержимое поста",
  "imageUrl": "https://example.com/image.jpg"
}
```

**Error:** `400 Bad Request`
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "title",
      "message": "Title is required and cannot be empty"
    }
  ]
}
```

---

### 🔄 PUT /posts/:id
Полное обновление поста (все поля обязательны)

**Request Body:**
```json
{
  "title": "Новый заголовок",
  "content": "Новое содержимое",
  "imageUrl": "https://example.com/new-image.jpg"
}
```

**Response:** `200 OK`
```json
{
  "id": "1",
  "title": "Новый заголовок",
  "content": "Новое содержимое",
  "imageUrl": "https://example.com/new-image.jpg"
}
```

---

### 🔄 PATCH /posts/:id
Частичное обновление поста (необязательные поля)

**Request Body:**
```json
{
  "title": "Только новый заголовок"
}
```

**Response:** `200 OK`
```json
{
  "id": "1",
  "title": "Только новый заголовок",
  "content": "Старое содержимое",
  "imageUrl": "https://example.com/old-image.jpg"
}
```

---

### 🗑️ DELETE /posts/:id
Удалить пост

**Response:** `204 No Content`

**Error:** `404 Not Found`
```json
{
  "error": "Post with id \"123\" not found"
}
```

---

## Валидация

### Поля

| Поле | Тип | Обязательно | Описание |
|------|-----|-------------|----------|
| `title` | string | ✅ Да (CREATE) | Заголовок (макс. 200 символов) |
| `content` | string | ✅ Да (CREATE) | Содержимое |
| `imageUrl` | string | ⚪ Опционально | Валидный URL изображения |

### Коды ошибок

| Код | Описание |
|-----|----------|
| `200` | OK - успешный запрос |
| `201` | Created - ресурс создан |
| `204` | No Content - успешно удалено |
| `400` | Bad Request - ошибка валидации |
| `404` | Not Found - ресурс не найден |
| `500` | Internal Server Error - ошибка сервера |

---

**Mock API:** Данные хранятся в localStorage. Все запросы имитируют задержку 300ms.

