define(['Backbone', 'Views/QuestionItemView'], function (Backbone, QuestionItem) {

	/**
	 * @class Представление формы с вопросами анкеты
	 */
	var FormView = Backbone.View.extend(
		/** @lends QuestionCollectionView.prototype */
	{
		events: {
			'submit form': 'submitForm'
		},

		/** @constructs */
		initialize: function (options) {
			this.listSelector = options.listSelector;
		},

		/**
		 * Генерация DOM представления
		 * @return {QuestionCollectionView} chain-ссылка
		 */
		render: function () {
			this.el.innerHTML = this.options.template(this.model.attributes);
			this.list = this.$(this.listSelector)[0];
			this.collection.each(this.renderItem, this);

			return this;
		},

		/**
		 * Генерация DOM представления отдельного вопроса
		 * @param  {QuestionModel} model Экземпляр модели вопроса
		 */
		renderItem: function (model) {
			var data = {model: model};

			_.extend(data, this.options.itemOptions);
			this.list.appendChild(new QuestionItem(data).render().el);
		},

		/**
		 * Обработка события отправки формы
		 * @param  {Event} e
		 */
		submitForm: function (e) {
			/** Немного не логичено, нужно вынести событие в коллекцию */
			var result = [];

			if (e) e.preventDefault();

			this.collection.each(function (model, index, collection) {
				result.push(model.get('answers'));
			}, this);

			alert('JSON массив ответов для отправки на сервер:\n\n' + JSON.stringify(result));
		}

	});

	return FormView;

});