import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {

	const forms = document.querySelectorAll(formSelector);
	const message = {
		loading: 'img/form/spinner.svg',	//	добавление спиннера
		success: 'Спасибо,скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	forms.forEach(item => {
		bindPostData(item);
	});


	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			//	 новый блок статуса на страничку в форму
			const statusMessage = document.createElement('img'); // создаю img для спиннера
			statusMessage.src = message.loading;
			//	Устанавливаю css текст для отобрадение спиннера
			statusMessage.style.cssText = `	
					display: block;
					margin: 0 auto;
				`;
			form.insertAdjacentElement('afterend', statusMessage);	//	Установка спиннера снизу блока,чтоб не ехала вёрстка

			const formData = new FormData(form);


			const json = JSON.stringify(Object.fromEntries(formData.entries()));


			postData('http://localhost:3000/requests', json)
				.then(data => {
					console.log(data);
					showThanksModal(message.success); 
						
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();
				});
		});
	}


	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal('.modal', modalTimerId);

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div data-close class="modal__close">×</div>
				<div class="modal__title">${message}</div>
			</div>
			`;

		document.querySelector('.modal').append(thanksModal);

		//	Убираю окно благодарности через 4 секунды
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show'); // возвращаю модальному окну первичный класс show
			prevModalDialog.classList.remove('hide');	//	убираю класс скрытости
			closeModal('.modal');
		}, 4000);
	}
	// fetch('http://localhost:3000/menu')
	// 	.then(data => data.json())
	// 	.then(res => console.log(res));

}

export default forms;