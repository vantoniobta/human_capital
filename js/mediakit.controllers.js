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
    this.uploadFileToUrl = function(file, uploadUrl){
         var fd = new FormData();
         fd.append('file', file);
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




//.................................................................................

.controller('homeCtrl', function($scope, $location, $window, $http) {
	$scope.go = function(_path) {
		$location.path(_path);
		$window.scrollTo(0, 0);
	};
        //table
    $http.get("http://localhost/angularjs/includes/json.php")
   .then(function (response) {$scope.names = response.data.records;});
})


//.................................................................................

.controller('iaCtrl', ['$scope', 'fileUpload', function($scope, fileUpload, $http){


	  $scope.insertData = function(){
        var file = $scope.myFile;
        console.dir(file);
        var uploadUrl = "includes/test.php";    
        fileUpload.uploadFileToUrl(file, uploadUrl);
   };


     $scope.users = [

            { id: 1, name: 'Bob' },
            { id: 2, name: 'Alice' },
            { id: 3, name: 'Steve' },
            { id: 4, name: 'ana' },
            { id: 5, name: 'jose' },
            { id: 6, name: 'pedro' },
            { id: 7, name: 'gabi' },
            { id: 8, name: 'karla' },
            { id: 9, name: 'joaquin' }
          ];

     $scope.selectedUser = { id: 1, name: 'Bob' };





    // $scope.sizes = [
    //     {size:48,padding:10},
    //     {size:36,padding:6},
    //     {size:24,padding:2},
    //     {size:12,padding:0}
    // ];


}])
//.................................................................................



