angular.module('areas', [])
.service('areaService', function ($http, $q, urlBase) {
	$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  this.getAreas = function(){ 
   var deferred = $q.defer();
     //$http.get(urlBase+'data/users.json').then(
   $http.get(urlBase + 'api/tblAreas').then(
       function success(data) { 
          deferred.resolve(data.data);
       }, function error(data) {
          deferred.reject(data.data);
       });
     return deferred.promise;
  };
  this.setArea = function(datos){
   var deferred = $q.defer();
      console.log('inviando datos al servidor');
      $http.post(urlBase + 'api/tblAreas', $.param(datos)).then(
       function success(data) { 
          deferred.resolve(data.data);
          console.log(data.data);
       }, function error(data) {
          deferred.reject(data.data);
          console.log(data.data);
       });
     return deferred.promise;
  };
  this.delArea = function (id) {
      var deferred = $q.defer();
      console.log('inviando datos al servidor');
      $http.delete(urlBase + 'api/tblAreas/' + id + '').then(
        function success(data) {
            deferred.resolve(data.data);
            console.log(data.data);
        }, function error(data) {
            deferred.reject(data.data);
            console.log(data.data);
        });
      return deferred.promise;
  };
  this.putArea = function (datos) {
      var deferred = $q.defer();
      $http.put(urlBase + 'api/tblAreas/' + datos.AreId + '', datos).then(
        function success(data) {
            deferred.resolve(data.data);
            console.log(data.data);
        }, function error(data) {
            deferred.reject(data.data);
            console.log(data.data);
        });
      return deferred.promise;
  };
});