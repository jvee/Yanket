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

	return QuestionModel;

});