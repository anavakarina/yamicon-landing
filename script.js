


console.log('ПРИВЕТ! Файл загрузился!');

// ЗАГРУЗКА DOM

document.addEventListener('DOMContentLoaded', function() {
  

// ФИЛЬТРАЦИЯ ЭКЛЕРОВ 

const filterButtons = document.querySelectorAll('.filter-btn');
const eclairCards = document.querySelectorAll('.eclair-card');

console.log('Найдено кнопок:', filterButtons.length);
console.log('Найдено карточек:', eclairCards.length);

if (filterButtons.length > 0 && eclairCards.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      console.log('Клик по кнопке:', this.getAttribute('data-filter'));
      

      filterButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
   
      this.classList.add('filter-btn--active');

      const filterValue = this.getAttribute('data-filter');

    
      let visibleCount = 0;
      eclairCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          visibleCount++;
        }
      });

     
      eclairCards.forEach((card, index) => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
       
          card.classList.remove('eclair-card--hidden');
         
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, index * 50); 
        } else {
          // Скрываем карточку
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.classList.add('eclair-card--hidden');
          }, 400); 
        }
      });
    });
  });
}


  // ВАЛИДАЦИЯ ФОРМЫ

  const form = document.getElementById('orderForm');
  const successMessage = document.getElementById('successMessage');

  if (!form) return;

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

 
  function validateCheckbox(checkbox) {
    const errorElement = checkbox.closest('.contact-form__checkbox').querySelector('.checkbox__error');
    
    if (!checkbox.checked) {
      if (errorElement) errorElement.classList.add('visible');
      return false;
    }
    
    if (errorElement) errorElement.classList.remove('visible');
    return true;
  }

 
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

  const checkbox = form.querySelector('input[name="privacy"]');
  if (checkbox) {
    checkbox.addEventListener('change', function() {
      validateCheckbox(this);
    });
  }


  form.addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;


    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

   
    if (checkbox && !validateCheckbox(checkbox)) {
      isValid = false;
    }

    if (isValid) {
      successMessage.classList.add('visible');
      form.reset();
 
      setTimeout(() => {
        successMessage.classList.remove('visible');
      }, 5000);


      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });



  // МАСКА ДЛЯ ТЕЛЕФОНА ДЛЯ ФОРМЫ

  const phoneInput = document.getElementById('phone');
  
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      // Получаем только цифры из ввода
      let value = e.target.value.replace(/\D/g, '');
      
    
      if (value.startsWith('8')) {
        value = '7' + value.slice(1);
      }
      
    
      if (!value.startsWith('7')) {
        value = '7' + value;
      }
      
      
      let formatted = '+7';
      
      if (value.length > 1) {
        formatted += ' ' + value.slice(1, 4);
      }
      if (value.length >= 5) {
        formatted += ' ' + value.slice(4, 7);
      }
      if (value.length >= 8) {
        formatted += ' ' + value.slice(7, 9);
      }
      if (value.length >= 10) {
        formatted += ' ' + value.slice(9, 11);
      }
      
      e.target.value = formatted;
    });

  
    phoneInput.addEventListener('focus', function() {
      if (!this.value) {
        this.value = '+7 ';
      }
    });

    phoneInput.addEventListener('blur', function() {
      if (this.value === '+7 ' || this.value === '+7') {
        this.value = '';
      }
    });
  }


  
   
  // МАСКА ДЛЯ ДАТЫ ДЛЯ ФОРМЫ

  const dateInput = document.getElementById('date');
  
  if (dateInput) {
    dateInput.addEventListener('input', function(e) {
      // Получаем только цифры
      let value = e.target.value.replace(/\D/g, '');
      
     
      if (value.length > 8) {
        value = value.slice(0, 8);
      }
      
    
      let formatted = '';
      
      if (value.length > 0) {
        formatted = value.slice(0, 2); // День
      }
      if (value.length >= 3) {
        formatted += '.' + value.slice(2, 4); // Месяц
      }
      if (value.length >= 5) {
        formatted += '.' + value.slice(4, 8); // Год
      }
      
      e.target.value = formatted;
    });

    
    dateInput.addEventListener('focus', function() {
      if (!this.value) {
        this.placeholder = 'дд.мм.гггг';
      }
    });

  
    dateInput.addEventListener('blur', function() {
      const value = this.value.replace(/\D/g, '');
      
    
      if (value.length === 8) {
        const day = parseInt(value.slice(0, 2));
        const month = parseInt(value.slice(2, 4));
        const year = parseInt(value.slice(4, 8));
        
      
        if (day < 1 || day > 31 || month < 1 || month > 12 || year < 2024 || year > 2030) {
          this.classList.add('error');
        } else {
          this.classList.remove('error');
        }
      } else if (value.length > 0) {
   
        this.classList.add('error');
      } else {
        this.classList.remove('error');
      }
    });
  }


// ОТЗЫВЫ

  const sliderTrack = document.getElementById('sliderTrack');
  const slides = document.querySelectorAll('.review-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.reviews__btn--prev');
  const nextBtn = document.querySelector('.reviews__btn--next');

  let currentSlide = 0;
  const totalSlides = slides.length;

  function goToSlide(index) {
    // Циклическая прокрутка
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentSlide = index;

    // Сдвигаем трек
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Обновляем точки
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  // Кнопки вперед/назад
  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
  }

  // Клик по точкам
  dots.forEach(dot => {
    dot.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-index'));
      goToSlide(index);
    });
  });


   
  // BURGER MENU

  const burgerBtn = document.getElementById('burgerBtn');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__link');

  if (burgerBtn && nav) {

    burgerBtn.addEventListener('click', function() {
      this.classList.toggle('burger--active');
      nav.classList.toggle('nav--open');
      
 
      if (nav.classList.contains('nav--open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      const isExpanded = this.getAttribute('aria-expanded') === 'true';
this.setAttribute('aria-expanded', !isExpanded);
    });

    

    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        burgerBtn.classList.remove('burger--active');
        nav.classList.remove('nav--open');
        document.body.style.overflow = '';
      });
    });


    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !burgerBtn.contains(e.target)) {
        burgerBtn.classList.remove('burger--active');
        nav.classList.remove('nav--open');
        document.body.style.overflow = '';
      }
    });
  }
  
}); 



