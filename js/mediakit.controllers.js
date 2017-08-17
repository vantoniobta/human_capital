angular.module('mediakit.controllers', ['ngMaterial', '720kb.socialshare'])

.directive('fileModel', ['$parse', function ($parse) {
    return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });
      }
   };
}])
.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl, name,email, celular, puesto){
         var fd = new FormData();
         fd.append('file', file);
         fd.append('name', name);
         fd.append('email', email);
         fd.append('celular', celular);
         fd.append('searchText', puesto);
         $http.post(uploadUrl, fd, {
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined,'Process-Data': false}
         })
         .success(function(){
            console.log("ok");
         })
         .error(function(){
            console.log("error");
         });
     }
 }])
//Default controller
.controller('mediakitCtrl', function($scope, $location, $anchorScroll, $window) {
	$scope.sidenavIsOpen = false;
	$scope.sidenavToggle = function() {
		$scope.sidenavIsOpen = !$scope.sidenavIsOpen;
	};
	$scope.go = function(_path) {
		$location.path(_path);
		$window.scrollTo(0, 0);
	};
	$scope.open = function(url) {
		window.open(url, '_blank');
	};
})



//home html
.controller('homeCtrl', function($scope, $location, $window, $http) {
	$scope.go = function(_path) {
		$location.path(_path);
		$window.scrollTo(0, 0);
	};
    // get info table
    $http.get("http://localhost/angularjs/includes/json.php")
   .then(function (response) {$scope.names = response.data.records;});
})





//user html
.controller('cvCtrl', ['$scope', 'fileUpload', function($scope, fileUpload, $http){

	$scope.insertData = function(){
        var file = $scope.myFile;
        var uploadUrl = "includes/test.php";
        var text      = $scope.name;
        var puesto    = $scope.searchText;
        var email     = $scope.email;
        var celular = $scope.celular;
        fileUpload.uploadFileToUrl(file, uploadUrl,text, email, celular,puesto,);
    };


        $scope.searchText = "";
        $scope.selectedItem = [];
        $scope.Vacancies = [
            {"id":1,"name":"Vendedor"}, 
            {"id":2,"name":"Desarrollo web"},
            {"id":3,"name":"Capturista"}, 
            {"id":4,"name":"Operador de consola"}, 
            {"id":5,"name":"Diseñador web"}
        ];

         $scope.searchTextChange = function (str) {
            var tempData = [];
            angular.forEach($scope.Vacancies, function(item){
                if (item.name.toLowerCase().indexOf($scope.searchText.toLowerCase()) >=0)
                {
                    tempData.push(item);
                }
            });
            return tempData;
        }

}])




