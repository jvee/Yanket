define(['Backbone'], function (Backbone) {

	var Question = Backbone.Model.extend({

		initialize: function (data, options) {},

		defaults: {
			content: 'Вопрос',
			cutContent: '',
			controls: [{
				type: 'textarea'
			}],
			answers: {}
		},

		validate: function (attrs, options) {

			var text = attrs.answers.text,
				result = [];

			if (!text || text === '') {
				// resettting attribute
				this.attributes.answers.text = '';
				result.push({type: 'text', valid: false, message: 'Required text'});
			}

			if (result.length > 0) {
				this.valid = false;
				return result;
			}

			this.valid = true;

		}

	});

	return Question;

});