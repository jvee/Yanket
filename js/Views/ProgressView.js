define(['Backbone', 'Views/ProgressItemView', 'Models/ProgressModel', 'helpers', 'templates'],
function (Backbone, ProgressItemView, ProgressModel, helpers, templates) {

	/**
	 * @class Представление прогресса заполнения анкеты
	 * само представление состоит из процентного счетчика
	 * и элементов-индикаторов валидности ответов на
	 * конктретные вопросы
	 */
	var ProgressView = Backbone.View.extend(
		/** @lends ProgressView.prototype */
	{

		template: templates['Progress'],

		/**
		 * Инициализация представления прогресса
		 * @param  {Object} options Параметры инициализации
		 * @constructs
		 */
		initialize: function (options) {
			this.model = new ProgressModel(options.progressModelOptions,{questionCollection: this.collection}),
			this.model.on('change:progress', this.renderProgress, this);
			this.currentProgress = this.targetProgress = this.model.get('progress');
			this.RenderTimeOut = null;
			this.setViewType();
		},

		/**
		 * Генерация DOM представления прогресса
		 * @return {ProgressView} ссылка на экземпляр класса 
		 * @public
		 */
		render: function () {
			this.el.innerHTML = this.template(this.model.attributes);
			this.list = this.$(this.options.listSelector)[0];
			this.counter = this.$(this.options.textSelector)[0];
			this.collection.each(this.renderItem, this);

			var _this = this;

			setTimeout(function () {
				_this.model.trigger('rendered');
			}, 0);

			return this;
		},

		/**
		 * Генерация DOM представления элемента прогресса
		 * @param  {QuestionModel} Модель вопроса
		 * @public
		 */
		renderItem: function (model) {
			var data = {
				model: model,
				progressModel: this.model
			};
			_.extend(data, this.options.itemOptions);
			this.list.appendChild(new ProgressItemView(data).render().el);
		},

		/**
		 * Установка значения счетчика прогресса
		 * @public
		 */
		renderProgress: function () {
			this.targetProgress = parseInt(this.model.get('progress'), 10);

			if (this.currentProgress === this.targetProgress) return;

			this.RenderTimeOut = setInterval($.proxy(this._animateProgress, this), this.options.updateInterval);
		},

		/**
		 * Анимация обновления счетчика прогресса
		 * @protected
		 */
		_animateProgress: function () {
			if (this.currentProgress === this.targetProgress) {
				clearInterval(this.RenderTimeOut);
				return;
			}

			var direction = this.currentProgress > this.targetProgress ? -1 : 1;

			this.currentProgress = this.currentProgress + direction;
			this.counter.innerHTML = this.currentProgress;
		},

		/**
		 * Установка стиля отображения представления
		 * в зависимости от возможностей браузера
		 * @public
		 */
		setViewType: function () {
			if (helpers.getPrefix('transform') !== undefined) return;
			this.el.className += ' ' + this.options.simpleModifierClass;
		}

	});

	return ProgressView;

});