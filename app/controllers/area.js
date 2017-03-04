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
        areaService.getAreas().then(function (data) { $scope.areas = data; });
    }
    loadAreas();
    var areaData="";
    $scope.edit = false;
    $scope.cargaArea = function () {
        var datos = {
            AreNombre: $scope.nombre,
            AreAbrev: $scope.abreviatura,
            AreComentarios: $scope.comentario
        };
        areaService.setArea(datos).then(function (data) { loadAreas(); });
    };
    $scope.delArea = function (id) {
        areaService.delArea(id).then(function (data) { loadAreas(); });
    };
    $scope.editArea = function (area) {
        $scope.nombre = area.AreNombre;
        $scope.abreviatura = area.AreAbrev;
        $scope.comentario = area.AreComentarios;
        $scope.edit = true;
        areaData = area;
    };
    $scope.actualizar = function () {
        areaData.AreNombre = $scope.nombre;
        areaData.AreAbrev = $scope.abreviatura;
        areaData.AreComentarios = $scope.comentario;
        areaService.putArea(areaData).then(function (data) { loadAreas(); });
        $scope.nombre = "";
        $scope.abreviatura = "";
        $scope.comentario = "";
        $scope.edit = false;
    }
}]);