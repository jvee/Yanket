define([], function () {

	helpers = {
		/**
		 * @name getPrefix
		 * @param  {String} prop
		 * @return {String}
		 */
		getPrefix: function(prop) {

			var prefixes = ['Moz', 'Webkit', 'O', 'ms'],
                vendorProp, i,
                div = document.createElement('div'),
                prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

			if (prop in div.style) {
				return prop;
			}

			for (i = 0; i < prefixes.length; ++i) {

				vendorProp = prefixes[i] + prop_;

				if (vendorProp in div.style) {
					return vendorProp;
				}
			}

			// Avoid memory leak in IE.
			this.div = null;
		}

	};

	return helpers;

});