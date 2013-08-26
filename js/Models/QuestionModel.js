define(['Backbone'], function (Backbone) {
	/**
	 * @class Модель вопроса анкеты
	 */
	var QuestionModel = Backbone.Model.extend(
		/** @lends QuestionModel.prototype */
	{

		defaults: {
			content: 'Вопрос',
			cutContent: '',
			controls: [{
				type: 'textarea'
			}],
			answers: {}
		},

		/** @constructs */
		initialize: function () {
			this.on('invalid', this.resetAnswers);
		},

		/**
		 * Сброс всех аттрибутов, которые были переданы с ошибкой
		 * @param  {QuestionModel} model
		 * @param  {Object}[] errors
		 */
		resetAnswers: function (model, errors) {
			for (var index = 0; index < errors.length; index++) {
				delete this.attributes.answers[errors[index].type];
			}
		},

		/**
		 * Валидация корректности ответа на вопрос
		 * @param  {Object} attrs Данные модели
		 * @param  {Object} options
		 * @return {Array} Массив с описанием ошибок, 
		 * если ошибок нет, то ничего
		 */
		validate: function (attrs, options) {

			var text = attrs.answers.text,
				result = [];

			if (!text || text === '') {
				result.push({
					type: 'text',
					valid: false,
					message: 'Required text'
				});
			}

			if (result.length > 0) {
				this.valid = false;
				return result;
			}

			this.valid = true;
			this.trigger('valid');

		}

	});

	return QuestionModel;

});