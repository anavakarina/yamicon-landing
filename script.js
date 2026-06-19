
console.log('ПРИВЕТ! Файл загрузился!');

// ============================================
// ЖДЕМ ЗАГРУЗКИ DOM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  
// ============================================
// ФИЛЬТРАЦИЯ ЭКЛЕРОВ (ПЛАВНАЯ)
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const eclairCards = document.querySelectorAll('.eclair-card');

console.log('Найдено кнопок:', filterButtons.length);
console.log('Найдено карточек:', eclairCards.length);

if (filterButtons.length > 0 && eclairCards.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      console.log('Клик по кнопке:', this.getAttribute('data-filter'));
      
      // Убираем активный класс со всех кнопок
      filterButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
      // Добавляем активный класс на нажатую кнопку
      this.classList.add('filter-btn--active');

      const filterValue = this.getAttribute('data-filter');

      // Считаем сколько карточек останется
      let visibleCount = 0;
      eclairCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          visibleCount++;
        }
      });

      // Фильтруем карточки с плавной анимацией
      eclairCards.forEach((card, index) => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          // Показываем карточку
          card.classList.remove('eclair-card--hidden');
          // Добавляем задержку для каскадного эффекта
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, index * 50); // Каждая следующая карточка появляется с небольшой задержкой
        } else {
          // Скрываем карточку
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.classList.add('eclair-card--hidden');
          }, 400); // Ждем завершения анимации
        }
      });
    });
  });
}

  // ============================================
  // ВАЛИДАЦИЯ ФОРМЫ
  // ============================================
  const form = document.getElementById('orderForm');
  const successMessage = document.getElementById('successMessage');

  if (!form) return;

  // Функция валидации поля
  function validateField(field) {
    const errorElement = field.parentElement.querySelector('.form-group__error');
    
    if (field.hasAttribute('required') && !field.value.trim()) {
      field.classList.add('error');
      if (errorElement) errorElement.classList.add('visible');
      return false;
    }
    
    field.classList.remove('error');
    if (errorElement) errorElement.classList.remove('visible');
    return true;
  }

  // Валидация чекбокса
  function validateCheckbox(checkbox) {
    const errorElement = checkbox.closest('.contact-form__checkbox').querySelector('.checkbox__error');
    
    if (!checkbox.checked) {
      if (errorElement) errorElement.classList.add('visible');
      return false;
    }
    
    if (errorElement) errorElement.classList.remove('visible');
    return true;
  }

  // Валидация при потере фокуса
  const inputs = form.querySelectorAll('.form-group__input, .form-group__select, .form-group__textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });

    input.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        validateField(this);
      }
    });
  });

  // Валидация чекбокса при изменении
  const checkbox = form.querySelector('input[name="privacy"]');
  if (checkbox) {
    checkbox.addEventListener('change', function() {
      validateCheckbox(this);
    });
  }

  // Обработка отправки формы
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;

    // Валидация всех полей
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    // Валидация чекбокса
    if (checkbox && !validateCheckbox(checkbox)) {
      isValid = false;
    }

    // Если всё валидно — показываем сообщение об успехе
    if (isValid) {
      successMessage.classList.add('visible');
      form.reset();
      
      // Скрываем сообщение через 5 секунд
      setTimeout(() => {
        successMessage.classList.remove('visible');
      }, 5000);

      // Скролл к сообщению
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  
}); // ← ЗАКРЫВАЮЩАЯ СКОБКА DOMContentLoaded




// Фиксация шапки после hero-секции
const header = document.querySelector('.header');
const heroSection = document.querySelector('.hero');

if (header && heroSection) {
  const heroHeight = heroSection.offsetHeight;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY >= heroHeight - 100) {
      header.classList.add('header--fixed');
    } else {
      header.classList.remove('header--fixed');
    }
  });
}


// Обновление счётчика корзины
function updateCartCount(count) {
  const badge = document.querySelector('.header__cart-badge');
  if (badge) {
    badge.textContent = count;
    if (count > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }
}

// Пример использования (потом заменим на реальную логику корзины)
let cartCount = 0;

// Для теста: при клике на корзину увеличиваем счётчик
const cartButton = document.querySelector('.header__cart');
if (cartButton) {
  cartButton.addEventListener('click', function() {
    cartCount++;
    updateCartCount(cartCount);
  });
}