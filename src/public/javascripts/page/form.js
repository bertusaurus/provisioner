var Form = function(element) {
	return (function() {
		var _element = element;

		return {
			element: _element,
			show: function() {
				_element.show();
			},
			hide: function() {
				_element.hide();
			},
			showFields: function(title, fields, submit) {
				_element.empty();
				_element.append($('<h4>').append(title));
				$.each(fields, function(pos, field) {
					var container = $('<div>')
						.addClass('entry-field');
					var label = $('<label>')
						.append(field.label)
						.appendTo(container);
					if (field.required) {
						label.append(' *')
					}
					var inputContainer = $('<div>')
						.addClass('entry-field-input')
						.appendTo(container);
					switch (field.type) {
						case 'text':
						case 'number':
							var input = $('<input>')
								.attr('name', field.name)
								.appendTo(inputContainer);
							break;
						case 'select':
							var select = $('<select>')
								.attr('name', field.name)
								.appendTo(inputContainer);

							for (var i = 0; i < field.options.length; i++) {
								select.append($('<option>')
									.append(field.options[i].text)
									.val(field.options[i].value));
							}
							break;
						case 'date':
							var input = $('<input>')
								.attr('name', field.name)
								.appendTo(inputContainer)
								.datepicker({
									format: 'mm/dd/yyyy',
									autoclose: true,
									orientation: 'top',
									startDate: new Date()
								});
							break;
						case 'time':
							var weeks = $('<div>')
								.addClass('time-input')
								.append($('<label>').append('Weeks'))
								.append($('<div>')
									.append($('<input>')
										.attr('name', 'durWeeks')
										.addClass('time-input')))
								.appendTo(inputContainer);

							var days = $('<div>')
								.addClass('time-input')
								.append($('<label>').append('Days'))
								.append($('<div>')
									.append($('<input>')
										.attr('name', 'durDays')
										.addClass('time-input')))
								.appendTo(inputContainer);

							var hours = $('<div>')
								.addClass('time-input')
								.append($('<label>').append('Hours'))
								.append($('<div>')
									.append($('<input>')
										.attr('name', 'durHours')
										.addClass('time-input')))
								.appendTo(inputContainer);
							break;
						case 'check':
							var checked = false;
							var checkbox = $('<div>')
								.addClass('checkbox-input')
								.appendTo(inputContainer)
								.click(function() {
									checked = !checked;
									if (checked) {
										checkbox.addClass('checked');
									} else {
										checkbox.removeClass('checked');
									}
								});
					}
					_element.append(container);
				});
				var btnDone = $('<div>')
					.addClass('entry-form-submit')
					.append($('<p>')
						.append('Submit'))
					.click(submit)
					.appendTo(_element);
			}
		};
	}());
}