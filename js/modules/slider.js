function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
	let slideIndex = 1;
	let offset = 0;

	//	Slider
	const slides = document.querySelectorAll(slide),
		slider = document.querySelector(container),
		prev = document.querySelector(prevArrow),
		next = document.querySelector(nextArrow),
		total = document.querySelector(totalCounter),
		current = document.querySelector(currentCounter),
		slidesWrapper = document.querySelector(wrapper),
		slidesField = document.querySelector(field),
		width = window.getComputedStyle(slidesWrapper).width;



	if (slides.length < 10) {
		total.textContent = `0${slides.length}`; //	общ кол-во слайдов
		current.textContent = `0${slideIndex}`; // текущий слайд
	} else {
		total.textContent = slides.length; // если >= 10, то без 0
		current.textContent = slideIndex; // текущий слайд
	}

	slidesField.style.width = 100 * slides.length + '%'; // 100% * кол-во слайдов = 1600px
	slidesField.style.display = 'flex'; // выстраиваю в ряд а не в колону
	slidesField.style.transition = '0.5s all';

	// slidesWrapper.style.overflow = 'hidden'; // скрываю ленту картинок чтоб не было скролла

	slides.forEach(slide => {
		slide.style.width = width; // каждый слайд равен его ширине
	});

	slider.style.position = 'relative';

	const indicators = document.createElement('ol'),
		dots = [];

	indicators.classList.add('carousel-indicators');
	indicators.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`;
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .6s ease;
		`;
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	function deleteNotDigits(str) {
		return +str.replace(/\D/g, '');
	}

	next.addEventListener('click', () => {
		if (offset == deleteNotDigits(width) * (slides.length - 1)) { //	условие если я на последнем слайде
			offset = 0; // возвращаю на 1й лайд
		}	else {
			offset += deleteNotDigits(width); // если не последний слайд, то происходит смещение на след слайд
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = 1;
	});


	prev.addEventListener('click', () => {
		if (offset == 0) { // условие если я на 1м слайде и тыкаю назад
			offset = deleteNotDigits(width) * (slides.length - 1); // перемещаюсь на последний слайд

		}else {
			offset -= deleteNotDigits(width); // если не 1й слайд то происходит смещение на пред. слайд. Отнимается ширина слайда, на который происходит смещение
		}

		slidesField.style.transform = `translateX(-${offset}px)`;


		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = 1;

	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = deleteNotDigits(width) * (slideTo - 1);

			slidesField.style.transform = `translateX(-${offset}px)`;

			if (slides.length < 10) {
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = slideIndex;
			}

			dots.forEach(dot => dot.style.opacity = '.5');
			dots[slideIndex - 1].style.opacity = 1;

		});

	});
}

export default slider;