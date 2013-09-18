Yanket
======

Форма-анкета для кандидата на поступлинеия в Школу Pазработки Интерфейсов 2013, разработанная в качестве тестового задания для поступления в эту же школу. [Демо](http://jvee.github.io/Yanket/)

##О проделанной работе##

- Интерфейс писался по модульному принципу. В качестве загрузчика использовался **require.js**
- Использовалась библиотека **Backbone** как костяк интерфейса и ее зависимости **underscore** и **jquery**
- Впервые использовал **css**-препроцессор **Stylus** (раньше пользовался **Sass**, но **Stylus** удобнее в плане написания классов по методологии **БЭМ**)
- В качестве шаблонизатора был использован **underscore**, не уверен насколько он "классический", как требовалось в задании, но немного похож на **handlebars**
- Все шаблоны прекомпилированны, их исходники расположены в папке **js/Templates** с расширением __*._tpl__
- В качестве js-интерактива была реализована индикация прогресса заполнения анкеты, простейшая валидация (на предмет наличия хотябы одного символа в `textarea`) как небольшое дополнение к основному интерактиву


##ToDo##

- Добавить адаптивности дизайну
- XSLT версия
