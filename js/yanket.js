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

require(['Backbone', 'Models/Question' ,'Views/Progress', 'Views/Questions', 'helpers'],
	function (Backbobe, QuestionModel, ProgressView, QuestionsView, helpers) {

	var questionsCollection = new Backbone.Collection(Yanket.data.questions, {model: QuestionModel}),
		questionsForm = new Backbone.Model(Yanket.data.questionsForm),
		progressView = new ProgressView({
			collection: questionsCollection,
			className: 'b-progress',
			listSelector: '.b-progress__list',
			textSelector: '.b-progress__counter-text',
			simpleModifierClass: 'b-progress_simple',
			itemOptions: {
				tagName: 'li',
				className: 'b-progress__item',
				wrapSelector: '.b-progress__item-link',
			}
		}),
		questionsView = new QuestionsView({
			collection: questionsCollection,
			model: questionsForm,
			className: 'b-questions',
			listSelector: '.b-questions__form',
			btnSelector: '.b-questions__button'
		});

	document.body.appendChild(progressView.render().el);
	document.body.appendChild(questionsView.render().el);

});