angular.module('mediakit', [
	'mediakit.controllers',
	'mediakit.directives',
	'mediakit.services',
	'ngRoute'
])

.config(function($routeProvider, $compileProvider, $mdThemingProvider) {
	$routeProvider
	.when("/", { templateUrl: "html/home.html", controller: "homeCtrl" })
	.when("/ia", { templateUrl: "html/users.html", controller: "iaCtrl" })
	.otherwise({ redirectTo: '/' });
	
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(whatsapp):/);

	$mdThemingProvider.theme('default')
		.primaryPalette('blue-grey', {
			default: '500',
			'hue-1': '800',
			'hue-2': '200',
			'hue-3': '100'
		})
		.accentPalette('blue', {})
		.warnPalette('pink', {});
});