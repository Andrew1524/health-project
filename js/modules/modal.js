function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('hide');
	modal.classList.remove('show');
	document.body.style.overflow = '';	//	убираю класс hidden чтоб можно было скролить страничку после закрытия модального окна
}

function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('show');
	modal.classList.remove('hide');
	document.body.style.overflow = 'hidden';	//	убираю скролл странички при вызове модального окна
	console.log(modalTimerId);
	if (modalTimerId) {
		clearInterval(modalTimerId);	//	если user сам открыл мод. окно, то убираю интервал автоматического вызова мод. окна через время
	}
}

function modal(triggerSelector, modalSelector, modalTimerId) {

	const modalTrigger = document.querySelectorAll(triggerSelector),
		modal = document.querySelector(modalSelector);

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
	});


	// modalCloseBtn.addEventListener('click', closeModal);	// удаляю этот функционал, и перемещаю его в следующий обработчик в условие

	modal.addEventListener('click', (e) => {
		if(e.target === modal || e.target.getAttribute('data-close') == '') { //	добавляю возможность закрытия модального окна нажатием на задний фон ИЛИ на крестик
			closeModal(modalSelector);
		}
	});

	document.addEventListener('keydown', (e) => {
		if(e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal(modalSelector);
		}
	});

	//	Вызов мод.окна при скроле вконец страницы
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener('scroll', showModalByScroll);	//	удаляю объект события со скрола, чтоб он отрабатывал только 1 раз
		}
	}

	//	Вызов мод. окна, если долистал до конца страницы
	window.addEventListener('scroll', showModalByScroll);
		
}

export default modal;

export {closeModal};
export {openModal};