

# 🎨 Custom Dropdown - React Блог с кастомизацией

<img width="995" height="635" alt="image" src="https://github.com/user-attachments/assets/8c47dd18-9743-4466-af39-9389e42e244c" />

**Интерактивный инструмент** для персонализации стилей блога через боковую панель

## ✨ Возможности

- 🔧 Изменение стилей статей в реальном времени
- 💾 Сохранение/сброс настроек
- 🎛 Управление через CSS-переменные
- 🖱 Интуитивное взаимодействие

## 🛠 Технологии

![React](https://img.shields.io/badge/React-18.2-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-✓-green)
![Storybook](https://img.shields.io/badge/Storybook-7.0-FF4785?logo=storybook)

## 🎯 Реализованный функционал

### 🖱 Боковая панель
```diff

+ При нажатии на «стрелку» открывается сайдбар с настройками, при повторном нажатии или клике вне сайдбар закрывается.
+ При изменении настроек в сайдбаре они не применяются сразу.
+ После нажатия на «применить» стили применяются к статье.
+ При нажатии «сбросить» настройки в форме сбрасываются на начальные, которые были при открытии страницы, и стили применяются к статье.
+ Настройки устанавливаются через CSS-переменные, которые уже есть в стилях и установлены в коде в дефолтные значения.
+ Анимация плавного появления
⚙ Механика настроек
Сохранение только после подтверждения (Apply)

Мгновенный сброс (Reset)

Управление через глобальные CSS-переменные:

css
:root {
  --font-size: 16px;
  --font-family: 'Arial';
  /* ... */
}
📝 Форма редактирования
Компонент ArticleParamsForm:

Динамическое обновление предпросмотра

Валидация параметров

Двустороннее связывание данных

🏗 Архитектура
text
src/
├── components/
│   ├── ArticleParamsForm/  # Форма настройки
│   ├── Sidebar/            # Боковая панель
│   └── ...                 # Другие компоненты
├── styles/
│   ├── variables.css       # CSS-переменные
│   └── ...                 # Глобальные стили
└── stories/                # Документация компонентов
📌 Особенности реализации
Управление состоянием:

tsx
const [params, setParams] = useState<ArticleParams>(defaultParams);
Обработка изменений:

tsx
const handleChange = (param: keyof ArticleParams, value: string) => {
  setParams(prev => ({...prev, [param]: value}));
};
Применение стилей:

tsx
useEffect(() => {
  Object.entries(params).forEach(([key, value]) => {
    document.documentElement.style.setProperty(
      `--${key}`,
      value
    );
  });
}, [params]);

[Макет проекта](https://www.figma.com/file/FEeiiGLOsE7ktXbPpBxYoD/Custom-dropdown?type=design&node-id=0%3A1&mode=design&t=eXRJnWC6Xsuw0qR4-1)

🚀 Запуск проекта
Установка зависимостей
npm install

Для запуска Storybook выполните:

```
npm run storybook
```

Для запуска линтера для стилей выполните:

```
npm run stylelint
```

Для запуска линтера выполните:

```
npm run lint
```

Для запуска форматтера выполните:

```
npm run format
```


