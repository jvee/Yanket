define(['Backbone', 'helpers', 'templates'], function (Backbone, helpers, templates) {

	var ProgressItem = Backbone.View.extend({

		template: templates['ProgressItem'],

		initialize: function() {
			this.progressModel = this.options.progressModel;
			this.index = this.model.collection.indexOf(this.model) + 1;

			this.progressModel.on('rendered', this.setPositionStyle, this);
			this.model.on('invalid', this.setError, this);
			this.model.on('change:answers', this.removeError, this);

		},

		render: function () {
			var data = $.extend(true, {index: this.index}, this.model.attributes);

			this.el.innerHTML = this.template(data);

			this.link = this.$(this.options.wrapSelector)[0];

			this.setPositionStyle(true);

			return this;
		},

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

		setError: function () {
			this.$el
				.removeClass('is-valid')
				.addClass('is-invalid');
		},

		removeError: function () {
			this.$el
				.removeClass('is-invalid')
				.addClass('is-valid');
		}

	});

	return ProgressItem;

});