angular.module('areas', [])
.service('areaService', function ($http, $q, urlBase) {
	$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  this.getAreas = function(){ 
   var deferred = $q.defer();
   $http.get(urlBase + 'user/').then(
       function success(data) { 
          deferred.resolve(data.data);
       }, function error(data) {
          deferred.reject(data.data);
       });
     return deferred.promise;
  };
  this.setArea = function(datos){
   var deferred = $q.defer();
      $http.post(urlBase + 'user/', $.param(datos)).then(
       function success(data) { 
          deferred.resolve(data.data);
       }, function error(data) {
          deferred.reject(data.data);
       });
     return deferred.promise;
  };
  this.delArea = function (id) {
      var deferred = $q.defer();
      $http.delete(urlBase + 'user/' + id + '').then(
        function success(data) {
            deferred.resolve(data.data);
        }, function error(data) {
            deferred.reject(data.data);
        });
      return deferred.promise;
  };
  this.putArea = function (datos) {
      var deferred = $q.defer();
      $http.put(urlBase + 'user/', datos).then(
        function success(data) {
            deferred.resolve(data.data);
        }, function error(data) {
            deferred.reject(data.data);
        });
      return deferred.promise;
  };
});