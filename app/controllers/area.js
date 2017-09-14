angular.module('appArea', [
	{
		name: "areas",
		files: ["services/areas.js"]
	}
	/*
	//POR CADA SERVICE QUE DESEEMOS INCLUIR EN EL CONTROLADOR LO UNICO QUE HACEMOS ES AGREGARLO 
	A LOS MODULOS QUE QUEREMOS QUE SE CARGUEN
	{
		name: "areaModule",
		files: ["services/areas.js"]
	},
	{
		name: "products",
		files: ["services/products.js"]
	},
	....
	*/
])
.controller('areaCtrl', ['$scope', 'areaService', '$http', function ($scope, areaService, $http) 
{
    function loadAreas() {
        areaService.getAreas().then(function (data) { $scope.usuarios = data; });
    }
    loadAreas();
    var datos="";
    $scope.edit = false;
    $scope.cargar = function () {
        var datos = {
            nombre: $scope.nombre,
            id: $scope.id
        };
        $scope.nombre = "";
        $scope.id = "";
        areaService.setArea(datos).then(function (data) { loadAreas(); });
    };
    $scope.delete = function (id) {
        areaService.delArea(id).then(function (data) { loadAreas(); });
        $scope.edit = false;
    };
    $scope.editar = function (area) {
        $scope.nombre = area.nombre;
        $scope.id = area.id;
        $scope.edit = true;
        datos = area;
    };
    $scope.actualizar = function () {
        datos.nombre = $scope.nombre;
        datos.id = $scope.id;
        areaService.putArea(datos).then(function (data) { loadAreas(); });
        $scope.nombre = "";
        $scope.id = "";
        $scope.edit = false;
    }
}]);