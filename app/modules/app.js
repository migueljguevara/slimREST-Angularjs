angular.module("app", ["ui.router", "oc.lazyLoad"])
//.constant('urlBase', "http://localhost:8081/")
.constant('urlBase', "http://localhost/webapp/public/index.php")
.config(function ($stateProvider) {

	$stateProvider
		.state("areas", {
			url: "/areas",
			controller: "areaCtrl",
			templateUrl: "templates/areas.html",
			resolve: {
				home: function($ocLazyLoad)
				{
					return $ocLazyLoad.load(
						{
							name: "appArea",
							files: ["controllers/area.js"]
						}						
					)
				}
			}
	 	})
	
});