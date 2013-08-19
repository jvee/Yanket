define(['Backbone', 'Views/QuestionItem', 'templates'], function (Backbone, QuestionItem, templates) {

	var Questions = Backbone.View.extend({

		template: templates['Questions'],

		events: {
			'submit form': 'submitForm'
		},

		initialize: function (options) {
			this.listSelector = options.listSelector;
		},

		render: function () {
			this.el.innerHTML = this.template(this.model.attributes);
			this.list = this.$(this.listSelector)[0];
			this.collection.each(this.renderItem, this);

			return this;
		},

		renderItem: function (model) {
			this.list.appendChild(new QuestionItem({model: model}).render().el);
		},

		submitForm: function (e) {
			/** Немного не логичено, нужно вынести событие в коллекцию */
			var result = [];

			e.preventDefault();

			this.collection.each(function (model, index, collection) {
				result.push(model.get('answers'));
			}, this);

			alert('JSON массив ответов для отправки на сервер:\n\n' + JSON.stringify(result));
		}

	});

	return Questions;

});