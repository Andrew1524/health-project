function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
	//	TABS
	//	создаю переменную всех табов для работы с DOM
	const tabs = document.querySelectorAll(tabsSelector), 		//	получение табов (справа)
		tabsContent = document.querySelectorAll(tabsContentSelector),		//	картинки (слева от табов)
		tabsParent = document.querySelector(tabsParentSelector);	//	получение родителя табов


	function hideTabContent() {
		//	использую метод перебора forEach, чтоб скрыть все эелементы .tabcontent(это картинки)
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});
		// 	удаляю класс активности с каждого элемента
		tabs.forEach(item => {
			item.classList.remove(activeClass);
		});
	}

	//	Через функцию 
	function showTabContent(i = 0) {	//	ES6. В аргументе можно сразу присвоить индекс 
		tabsContent[i].classList.add('show', 'fade');	//	указываю индекс картинки, чтоб показать её
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add(activeClass);	// добавляю класс активности на таб
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		//	если event.target используется часто, то можно переопределить в переменную
		const target = event.target;
		//	кликая по какому то табу нужно: 
		//	перебираю все табы которые лежат в переременной tabs(это псевдомассив)
		//	и проверяю если эл-нт который находится в этом псевд.массиве совпадает с тем эелементом
		//	в который кликнул пользователь, тогда я беру его номер и показываю на странице
		if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((item, i) => {

				//	Если таргет(тот эл-нт в который только что кликнули), будет совпадать
				//	с эл-том который сейчас перербирается в цикле forEach, то будем вызывать 2 функции
				//	hideTabContent и showTabContent
				if(target == item) {
					hideTabContent();
					showTabContent(i);
				}

			});
		}

	});
}

export default tabs;