jQuery(document).ready(function($) {

	const formMarkup =
		`<form class="white-popup callback" method="post" action="callback.php">
			<input name="Name" type="text" placeholder="Ваше имя" required>
			<input name="Phone" type="tel" placeholder="Ваш телефон" required>
			<input name="Email" type="email" placeholder="Ваш email" required>
			<div class="callback__no-spam">
				<label class="verfy">
					<input class="killer" id="killer" name="killer" type="checkbox">
					<span>Я не робот</span>
				</label>
			</div>
			<button class="btn callback__submit">send</button>
			<p class="callback__fz">Нажимая "Отправить", Вы принимаете условия Соглашения на обработку персональных данных.</p>
		</form>`;
	const successMarkup =
		`<div id="success-popup" class="white-popup mfp-hide">
		  <h5>Ваше сообщение отправлено</h5>
		</div>`
	$('.open-popup-link').magnificPopup({
		items: {
			type: 'inline',
			src: formMarkup
		}
	});

	function fromValidate (form, e) {
		e.preventDefault();

		// валидация на спам
		let killer = $(form).find('.killer');
		let verify = $(form).find('.verfy');

		this.block = function () {
			verify.find('span').text('Пожалуйста пройдите проверку!');
			verify.addClass('red');
		}
		this.pass = function () {
			verify.find('span').text('Я не робот');
			verify.removeClass('red');
			form.reset();
		}

		if (killer.prop('checked')) {
			sendEmail($(form));
			this.pass();
		} else {
			this.block();
		}
	}

	function sendEmail(mailForm) {
		$.ajax({
		type: 'POST',
		beforeSend: function (argument) {
			$('.callback button').addClass('process');
		},
		data: mailForm.serialize(),
		url: mailForm.attr('action'),
		dataType: 'html',
		success: function(data) {
			// $('.callback button').removeClass('process');
			// $.magnificPopup.open({
			// 	items: {
			// 		src: '#success-popup'
			// 	}
			// }, 0);
			alert(data);
		}
		});
	}

	$('.callback').on('submit', function (e) {
		fromValidate(this, e);
	});

});