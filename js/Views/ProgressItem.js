define(['Backbone', 'helpers', 'templates'], function (Backbone, helpers, templates) {

	/**
	 * @class Представление индикатора валидности отдельного вопроса анкеты
	 */
	var ProgressItemView = Backbone.View.extend(
		/** @lends ProgressItemView.prototype */
	{

		template: templates['ProgressItem'],

		/** @constructs */
		initialize: function() {
			this.progressModel = this.options.progressModel;
			this.index = this.model.collection.indexOf(this.model) + 1;

			this.progressModel.on('rendered', this.setPositionStyle, this);
			this.model.on('invalid', this.setError, this);
			this.model.on('change:answers', this.removeError, this);

		},

		/**
		 * Генерация DOM представления индикатора
		 * @return {ProgressItemView} ссылка на экземпляр представления
		 */
		render: function () {
			var data = $.extend(true, {index: this.index}, this.model.attributes);

			this.el.innerHTML = this.template(data);
			this.link = this.$(this.options.wrapSelector)[0];
			this.setPositionStyle(true);

			return this;
		},

		/**
		 * Указание параметров позиционирования представления
		 * Т.к в данном случае индикаторы располагаются по дуге,
		 * происходит расчет наклона и ширины каждого индикатора,
		 * исходя из модели прогресса, которая предает параметры для
		 * расчета целевых значений, такие как: начальный угол, 
		 * с которого начинается отрисовка индикаторов, 
		 * расстояние между индикаторами в радианах, и конечный угол,
		 * до которого должна происходить отрисовка
		 * @param {Boolean} initFlag при положительном значении
		 * все элементы отрисовывются от начального угла, но как только 
		 * представление полностю отрендерено происходит повторный расчет
		 * позиций, для анимации при помощи css transition
		 */
		setPositionStyle: function (initFlag) {
			var startAngle = this.progressModel.get('startAngle'),
				spaceAngle = this.progressModel.get('spaceAngle'),
				endAngle = this.progressModel.get('endAngle') + spaceAngle,
				itemAngle = (endAngle - startAngle) / this.model.collection.length - spaceAngle,
				initIndex = initFlag ? 0 : this.index - 1,
				rotate = startAngle + itemAngle * initIndex + spaceAngle * initIndex;
				skew = 90 - itemAngle,
				transform = helpers.getPrefix('transform');

			this.el.style[transform] = 'rotate(' + rotate + 'deg) skew(' + skew + 'deg)';
			this.link.style[transform] = 'skew(' + (0 - skew) + 'deg) rotate(' + (itemAngle / 2 - 90)  + 'deg)';

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

	return ProgressItemView;

});