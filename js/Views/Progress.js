define(['Backbone', 'Views/ProgressItem', 'Models/Progress', 'helpers', 'templates'], function (Backbone, ProgressItemView, ProgressModel, helpers, templates) {

	var Progress = Backbone.View.extend({

		template: templates['Progress'],

		initialize: function (options) {
			this.model = new ProgressModel({},{questionCollection: this.collection}),
			this.model.on('change:progress', this.renderProgress, this);
			this.currentProgress = this.targetProgress = this.model.get('progress');
			this.RenderTimeOut = null;
			this.setViewType();
		},

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

		renderItem: function (model) {
			var data = { 
				model: model,
				progressModel: this.model
			};
			_.extend(data, this.options.itemOptions);
			this.list.appendChild(new ProgressItemView(data).render().el);
		},

		renderProgress: function () {
			var _this = this;

			this.targetProgress = parseInt(this.model.get('progress'));

			if (this.currentProgress === this.targetProgress) return;

			this.RenderTimeOut = setInterval(function () {

				if (_this.currentProgress === _this.targetProgress) {
					clearInterval(_this.RenderTimeOut);
					return;
				}

				var direction = _this.currentProgress > _this.targetProgress ? -1 : 1;

				_this.currentProgress = _this.currentProgress + direction;
				_this.counter.innerHTML = _this.currentProgress;

			}, 15);
		},

		setViewType: function () {
			if (helpers.getPrefix('transform') !== undefined) return;
			this.el.className += ' ' + this.options.simpleModifierClass;
		}

	});

	return Progress;

});