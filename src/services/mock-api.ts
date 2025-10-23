import axios, { InternalAxiosRequestConfig } from 'axios';

// Типы данных
export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
}

interface ValidationError {
  field: string;
  message: string;
}

interface ErrorResponse {
  error: string;
  details?: ValidationError[];
}

const EMPTY_POSTS: Post[] = [];

// Ключ для localStorage
const STORAGE_KEY = 'mock_api_posts';

// Утилиты для работы с localStorage
class PostStorage {
  static getPosts(): Post[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        this.setPosts(EMPTY_POSTS);

        return EMPTY_POSTS;
      }
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return EMPTY_POSTS;
    }
  }

  static setPosts(posts: Post[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }

  static getPostById(id: string): Post | undefined {
    const posts = this.getPosts();
    return posts.find((post) => post.id === id);
  }

  static createPost(post: Omit<Post, 'id'>): Post {
    const posts = this.getPosts();
    const newPost: Post = {
      ...post,
      id: this.generateId(),
    };
    posts.push(newPost);
    this.setPosts(posts);
    return newPost;
  }

  static updatePost(id: string, updates: Partial<Omit<Post, 'id'>>): Post | null {
    const posts = this.getPosts();
    const postIndex = posts.findIndex((post) => post.id === id);

    if (postIndex === -1) {
      return null;
    }

    posts[postIndex] = {
      ...posts[postIndex],
      ...updates,
    };

    this.setPosts(posts);
    return posts[postIndex];
  }

  static deletePost(id: string): boolean {
    const posts = this.getPosts();
    const initialLength = posts.length;
    const filteredPosts = posts.filter((post) => post.id !== id);

    if (filteredPosts.length === initialLength) {
      return false; // Пост не найден
    }

    this.setPosts(filteredPosts);
    return true;
  }

  private static generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  static clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}

// Валидация данных
class PostValidator {
  static validate(data: Partial<Post>): ValidationError[] {
    const errors: ValidationError[] = [];

    if (data.title !== undefined) {
      if (typeof data.title !== 'string') {
        errors.push({
          field: 'title',
          message: 'Title must be a string',
        });
      } else if (data.title.trim().length === 0) {
        errors.push({
          field: 'title',
          message: 'Title is required and cannot be empty',
        });
      } else if (data.title.length > 200) {
        errors.push({
          field: 'title',
          message: 'Title cannot exceed 200 characters',
        });
      }
    }

    if (data.content !== undefined) {
      if (typeof data.content !== 'string') {
        errors.push({
          field: 'content',
          message: 'Content must be a string',
        });
      } else if (data.content.trim().length === 0) {
        errors.push({
          field: 'content',
          message: 'Content is required and cannot be empty',
        });
      }
    }

    if (data.imageUrl !== undefined) {
      if (typeof data.imageUrl !== 'string') {
        errors.push({
          field: 'imageUrl',
          message: 'Image URL must be a string',
        });
      } else if (data.imageUrl.trim().length > 0 && !this.isValidUrl(data.imageUrl)) {
        errors.push({
          field: 'imageUrl',
          message: 'Image URL must be a valid URL',
        });
      }
    }

    return errors;
  }

  static validateCreate(data: any): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!data || typeof data !== 'object') {
      errors.push({
        field: 'body',
        message: 'Request body must be an object',
      });
      return errors;
    }

    // Для создания обязательны только title и content
    const requiredFields: ('title' | 'content')[] = ['title', 'content'];

    requiredFields.forEach((field) => {
      if (!(field in data)) {
        errors.push({
          field,
          message: `Field "${field}" is required`,
        });
      }
    });

    // Валидируем существующие поля
    const validationErrors = this.validate(data);
    errors.push(...validationErrors);

    return errors;
  }

  static validateUpdate(data: any): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!data || typeof data !== 'object') {
      errors.push({
        field: 'body',
        message: 'Request body must be an object',
      });
      return errors;
    }

    // Для обновления хотя бы одно поле должно быть передано
    const updateFields = ['title', 'content', 'imageUrl'];
    const hasUpdateFields = updateFields.some((field) => field in data);

    if (!hasUpdateFields) {
      errors.push({
        field: 'body',
        message: 'At least one field (title, content, imageUrl) must be provided',
      });
    }

    // Валидируем существующие поля
    const validationErrors = this.validate(data);
    errors.push(...validationErrors);

    return errors;
  }

  private static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}

// Mock API обработчики
class MockAPI {
  private static MOCK_DELAY = 300; // Задержка для имитации сетевого запроса (мс)

  static async handleRequest(config: InternalAxiosRequestConfig): Promise<any> {
    const { method, url, data } = config;

    // Проверяем, что это запрос к /posts
    if (!url || !url.includes('/posts')) {
      return config; // Пропускаем запрос дальше
    }

    console.log(`[Mock API] Intercepted ${method?.toUpperCase()} ${url}`);

    // Имитируем задержку сети
    await new Promise((resolve) => setTimeout(resolve, this.MOCK_DELAY));

    try {
      // Парсим URL для извлечения ID
      const urlParts = url.split('/');
      const postIndex = urlParts.findIndex((part) => part === 'posts');
      const id = postIndex !== -1 && urlParts[postIndex + 1] ? urlParts[postIndex + 1] : null;

      let response;

      switch (method?.toUpperCase()) {
        case 'GET':
          response = id ? this.handleGetOne(id) : this.handleGetAll();
          break;

        case 'POST':
          response = this.handleCreate(data);
          break;

        case 'PUT':
        case 'PATCH':
          response = id
            ? this.handleUpdate(id, data)
            : this.createErrorResponse(400, 'Post ID is required for update');
          break;

        case 'DELETE':
          response = id
            ? this.handleDelete(id)
            : this.createErrorResponse(400, 'Post ID is required for delete');
          break;

        default:
          response = this.createErrorResponse(405, `Method ${method} not allowed`);
      }

      // Request interceptor должен выбрасывать ошибку для всех mock-ответов
      // Response interceptor затем обработает их правильно
      return Promise.reject({
        config,
        response,
        isAxiosError: true,
        isMockResponse: true, // Маркер для определения mock-ответа
        toJSON: () => ({}),
      });
    } catch (error) {
      console.error('[Mock API] Error:', error);
      return Promise.reject({
        config,
        response: this.createErrorResponse(500, 'Internal server error'),
        isAxiosError: true,
        isMockResponse: true,
        toJSON: () => ({}),
      });
    }
  }

  // GET /posts - Получить все посты
  private static handleGetAll() {
    const posts = PostStorage.getPosts();
    return {
      status: 200,
      statusText: 'OK',
      data: posts,
      headers: {},
      config: {},
    };
  }

  // GET /posts/:id - Получить один пост
  private static handleGetOne(id: string) {
    const post = PostStorage.getPostById(id);

    if (!post) {
      return this.createErrorResponse(404, `Post with id "${id}" not found`);
    }

    return {
      status: 200,
      statusText: 'OK',
      data: post,
      headers: {},
      config: {},
    };
  }

  // POST /posts - Создать пост
  private static handleCreate(data: any) {
    const validationErrors = PostValidator.validateCreate(data);

    if (validationErrors.length > 0) {
      return this.createErrorResponse(400, 'Validation failed', validationErrors);
    }

    const newPost = PostStorage.createPost({
      title: data.title,
      content: data.content,
      imageUrl: data.imageUrl,
    });

    return {
      status: 201,
      statusText: 'Created',
      data: newPost,
      headers: {},
      config: {},
    };
  }

  // PUT/PATCH /posts/:id - Обновить пост
  private static handleUpdate(id: string, data: any) {
    const validationErrors = PostValidator.validateUpdate(data);

    if (validationErrors.length > 0) {
      return this.createErrorResponse(400, 'Validation failed', validationErrors);
    }

    const updatedPost = PostStorage.updatePost(id, data);

    if (!updatedPost) {
      return this.createErrorResponse(404, `Post with id "${id}" not found`);
    }

    return {
      status: 200,
      statusText: 'OK',
      data: updatedPost,
      headers: {},
      config: {},
    };
  }

  // DELETE /posts/:id - Удалить пост
  private static handleDelete(id: string) {
    const success = PostStorage.deletePost(id);

    if (!success) {
      return this.createErrorResponse(404, `Post with id "${id}" not found`);
    }

    return {
      status: 204,
      statusText: 'No Content',
      data: null,
      headers: {},
      config: {},
    };
  }

  private static createErrorResponse(status: number, message: string, details?: ValidationError[]) {
    const errorData: ErrorResponse = { error: message };

    if (details) {
      errorData.details = details;
    }

    return {
      status,
      statusText: this.getStatusText(status),
      data: errorData,
      headers: {},
      config: {},
    };
  }

  private static getStatusText(status: number): string {
    const statusTexts: { [key: number]: string } = {
      200: 'OK',
      201: 'Created',
      204: 'No Content',
      400: 'Bad Request',
      404: 'Not Found',
      405: 'Method Not Allowed',
      500: 'Internal Server Error',
    };
    return statusTexts[status] || 'Unknown';
  }
}

// Настройка интерсептора
export function setupMockAPI() {
  // Request interceptor
  axios.interceptors.request.use(
    (config) => MockAPI.handleRequest(config),
    (error) => Promise.reject(error),
  );

  // Response interceptor для обработки mock-ответов
  axios.interceptors.response.use(
    (response) => response,
    (error: any) => {
      // Проверяем, это наш mock-ответ?
      if (error.isMockResponse && error.response) {
        const { response } = error;

        // Если статус успешный (2xx), возвращаем как успешный ответ
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response);
        }

        // Для ошибочных статусов возвращаем ошибку
        return Promise.reject(error);
      }

      // Для обычных ошибок axios
      return Promise.reject(error);
    },
  );

  console.log('[Mock API] Interceptors configured successfully');
}
