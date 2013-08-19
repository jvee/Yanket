define(['Backbone', 'templates'], function (Backbone, templates) {

	var QuestionItem = Backbone.View.extend({

		className: 'b-question',

		template: templates['QuestionItem'],

		events: {
			'click .b-question__content-show-cut' : 'showCut',
			'blur textarea': 'setText'
		},

		initialize: function () {
			this.index = this.model.collection.indexOf(this.model) + 1;
			this.model.on('invalid', this.setError, this);
			this.model.on('change:answers', this.removeError, this);
		},

		render: function () {
			var data = $.extend(true, {index: this.index}, this.model.attributes);
			this.el.id = 'question' + this.index;

			this.el.innerHTML = this.template(data);

			return this;
		},

		showCut: function (e) {
			e.preventDefault();

			this.$('.b-question__content-cut').css({'display': 'block'});
			this.$('.b-question__content-show-cut').remove();
		},

		setText: function (e) {

			var answers = {};

			_.extend(answers, this.model.get('answers'), {'text': $.trim(this.$('textarea').val())});
			this.model.set({answers : answers}, {validate: true});

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

	return QuestionItem;

});