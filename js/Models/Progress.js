define(['Backbone'], function (Backbone) {

	var Progress = Backbone.Model.extend({

		defaults: {
			progress: 0,
			startAngle: 90,
			endAngle: 360,
			spaceAngle: 2
		},			

		initialize: function (data, options) {
			this.set()

			this.questionCollection = options.questionCollection;
			this.questionCollection.on('change:answers', this.calculateProgress, this);
			this.questionCollection.on('invalid', this.calculateProgress, this);
		},

		calculateProgress: function (model) {
			var validCount = 0;

			this.questionCollection.each(function (model, index, collection) {
				if (model.valid === true) validCount++;
			}, this);

			this.set('progress', (100*validCount/this.questionCollection.length).toFixed(0));
		}

	});

	return Progress;

});