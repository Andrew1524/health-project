function timer(id, deadline) {
	//	TIMER
	//	1.	Функционал для получения даты
	//	2.	Функционал для определения разницы между временем пользователя
	//	3.	Функционал для обновления таймера


	//	ФУНКЦИЯ, которая будет определять разницу дедлайна и текущего времени
	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date());	//	определяю количество милисекунд до которого нужно будет досчитать
		let days, hours, minutes, seconds;
		if (t <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / (1000 * 60 * 60) % 24)),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);
		}

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	//	ПОСДТАВЛЯЕМ ноль к однозначным цифрам
	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else { //	если число двузначное то 0 не подставляется
			return num;
		}
	}

	//	ФУНКЦИЯ, которая будет устанавливать таймер на страничку
	function setClock(selector, endtime) {	
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000); //	запуск функции через определённый промежуток времени(в данном случае каждую секунду)

		updateClock();	//	Вызываю функцию здесь, чтобы таймер не загружался в вёрстке в течении 1 секунды(как указано в 85 стр)

		//	ФУНКЦИЯ, которая обновляет таймер каждую секунду
		function updateClock() {
			const t = getTimeRemaining(endtime); //	в этой переменной t, содержится объект с 70-74 строку

			days.innerHTML = getZero(t.days);	// обращение через t (опять же объект с 70 стр) от days
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);	//	ЕСЛИ время идёт в отрицательую сторону, то таймер больше не обновляется(Время вышло)
				alert('Время вышло жирдяйчик');
			}
		}
	} 
	setClock(id, deadline);

}

export default timer;