import Inputmask from "inputmask/dist/inputmask/inputmask.numeric.extensions";

jQuery(document).ready(function($) {
	const formMarkup =
		`<form class="white-popup callback" method="post" action=" wp-content/themes/<%= _.kebabCase(name) %>/inc/callback.php">
			<input name="Name" type="text" placeholder="Ваше имя" required>
			<input name="Phone" type="tel" placeholder="Ваш телефон" required>
			<input name="Email" type="email" placeholder="Ваш email" required>
			<div class="callback__no-spam">
				<label class="verify">
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
		</div>`;

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
		let verify = $(form).find('.verify');

		let block = function () {
			verify.find('span').text('Пожалуйста пройдите проверку!');
			verify.addClass('red');
		}
		let pass = function () {
			verify.find('span').text('Я не робот');
			verify.removeClass('red');
			form.reset();
		}

		if (killer.prop('checked')) {
			sendEmail($(form));
			pass();
		} else {
			block();
		}
	}

	function sendEmail(mailForm) {
		$.ajax({
		type: 'POST',
		beforeSend: function (argument) {
			$('.callback button').addClass('proccess');
		},
		data: mailForm.serialize(),
		url: mailForm.attr('action'),
		dataType: 'html',
		success: function(data) {
			$('.callback button').removeClass('proccess');
			$.magnificPopup.open({
				items: {
					src: successMarkup
				}
			}, 0);
		}
		});
	}

	$(document).on('submit', '.callback', function (e) {
		fromValidate(this, e);
	});

	var im = new Inputmask("8(999) 999-9999");

	$(document).on('focus', '.callback input[type="tel"]', function(event) {
		im.mask($('input[type="tel"]'));
	});

});