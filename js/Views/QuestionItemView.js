define(['Backbone'], function (Backbone) {

	/**
	 * @class Представление модели вопроса анкеты
	 */
	var QuestionItemView = Backbone.View.extend(
		/** @lends QuestionItemView.prototype */
	{
		events: {
			'blur textarea': 'setText'
		},

		/** @constructs */
		initialize: function (options) {
			this.index = this.model.collection.indexOf(this.model) + 1;

			this.model.on('invalid', this.setError, this);
			this.model.on('change:answers', this.removeError, this);

			this.$el.on('click', options.showCutBtnSelector, $.proxy(this.showCut, this));
		},

		/**
		 * Генерация DOM представления вопроса
		 * @return {[type]}
		 */
		render: function () {
			var data = $.extend(true, {index: this.index}, this.model.attributes);

			this.el.id = 'question' + this.index;
			this.el.innerHTML = this.options.template(data);

			return this;
		},

		/**
		 * Отображение скрытого под кат текста вопроса
		 * @param  {Event} e
		 */
		showCut: function (e) {
			if (e) e.preventDefault();

			this.$(this.options.cutContentSelector).css({'display': 'block'});
			this.$(this.options.showCutBtnSelector).remove();
		},

		/**
		 * Сохранение введенного ответа в модель
		 * @param  {Event} e
		 */
		setText: function (e) {
			var answers = {};

			_.extend(answers, this.model.get('answers'), {'text': $.trim(this.$('textarea').val())});
			this.model.set({answers : answers}, {validate: true});

		},

		/**
		 * Установка класса, указывающего на невалидность модели вопроса,
		 * связанного с данным представлением
		 */
		setError: function () {
			this.$el
				.removeClass(this.options.validClass)
				.addClass(this.options.invalidClass);
		},

		/**
		 * Установка класса, указывающего на валидность модели вопроса,
		 * связанного с данным представлением
		 */
		removeError: function () {
			this.$el
				.removeClass(this.options.invalidClass)
				.addClass(this.options.validClass);
		}


	});

	return QuestionItemView;

});