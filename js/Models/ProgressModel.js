define(['Backbone'], function (Backbone) {

	/**
	 * @class Модель прогресса
	 */
	var ProgressModel = Backbone.Model.extend(
		/** @lends ProgressModel.prototype */
	{
		defaults: {
			progress: 0,
			startAngle: 90,
			endAngle: 360,
			spaceAngle: 2
		},

		/** @constructs */
		initialize: function (data, options) {
			this.set();

			this.questionCollection = options.questionCollection;
			this.questionCollection.on('change:answers', this.calculateProgress, this);
			this.questionCollection.on('invalid', this.calculateProgress, this);
		},

		/**
		 * Расчитывает текущий прогресс заполненности анкеты
		 * @param  {QuestionModel} model Модель вопроса
		 */
		calculateProgress: function (model) {
			var validCount = 0;

			this.questionCollection.each(function (model, index, collection) {
				if (model.isValid({silent:true})) validCount++;
			}, this);

			this.set('progress', (100*validCount/this.questionCollection.length).toFixed(0));
		}

	});

	return ProgressModel;

});