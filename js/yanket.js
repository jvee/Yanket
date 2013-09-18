require.config({
	baseUrl: 'js',
	paths: {
		Backbone: 'Lib/backbone',
		underscore: 'Lib/underscore',
		jQuery: 'Lib/jquery-1.10.2',
		templates: 'Templates/templates'
	},
	shim: {
		'Backbone': {
			deps: ['underscore', 'jQuery'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		},
		'templates': {
			exports: 'templates'
		}
	}
});

require(['Backbone', 'Models/QuestionModel' ,'Views/ProgressView', 'Views/FormView', 'templates'],
function (Backbobe, QuestionModel, ProgressView, FormView, templates) {

	var questionsCollection = new Backbone.Collection(Yanket.data.questions, {model: QuestionModel}),
		questionsForm = new Backbone.Model(Yanket.data.questionsForm),
		progressView = new ProgressView({
			template: templates['Progress'],
			collection: questionsCollection,
			className: 'b-progress',
			listSelector: '.b-progress__list',
			textSelector: '.b-progress__counter-text',
			simpleModifierClass: 'b-progress_simple',
			updateInterval: 15,
			itemOptions: {
				template: templates['ProgressItem'],
				tagName: 'li',
				className: 'b-progress__item',
				wrapSelector: '.b-progress__item-link',
				validClass: 'is-valid',
				invalidClass: 'is-invalid'
			},
			progressModelOptions: {
				startAngle: 105,
				endAngle: 390,
				spaceAngle: 2
			}
		}),
		formView = new FormView({
			template: templates['Form'],
			collection: questionsCollection,
			model: questionsForm,
			className: 'b-form',
			listSelector: '.b-form__form',
			btnSelector: '.b-form__button',
			itemOptions: {
				template: templates['QuestionItem'],
				className: 'b-question',
				showCutBtnSelector: '.b-question__content-show-cut',
				cutContentSelector: '.b-question__content-cut',
				validClass: 'is-valid',
				invalidClass: 'is-invalid'
			}
		});

	document.body.appendChild(progressView.render().el);
	document.body.appendChild(formView.render().el);

});