define(['Backbone', 'templates'], function (Backbone, templates) {

	var QuestionItem = Backbone.View.extend({

		template: templates['QuestionItem'],

		events: {
			'blur textarea': 'setText'
		},

		initialize: function (options) {
			this.index = this.model.collection.indexOf(this.model) + 1;
			this.model.on('invalid', this.setError, this);
			this.model.on('change:answers', this.removeError, this);

			this.$el.on('click', options.showCutBtnSelector, $.proxy(this.showCut, this));
		},

		render: function () {
			var data = $.extend(true, {index: this.index}, this.model.attributes);
			this.el.id = 'question' + this.index;

			this.el.innerHTML = this.template(data);

			return this;
		},

		showCut: function (e) {
			e.preventDefault();

			this.$(this.options.cutContentSelector).css({'display': 'block'});
			this.$(this.options.showCutBtnSelector).remove();
		},

		setText: function (e) {

			var answers = {};

			_.extend(answers, this.model.get('answers'), {'text': $.trim(this.$('textarea').val())});
			this.model.set({answers : answers}, {validate: true});

		},

		setError: function () {
			this.$el
				.removeClass(this.options.validClass)
				.addClass(this.options.invalidClass);
		},

		removeError: function () {
			this.$el
				.removeClass(this.options.invalidClass)
				.addClass(this.options.validClass);
		}


	});

	return QuestionItem;

});