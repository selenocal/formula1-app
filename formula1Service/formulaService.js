
let FormulaService = angular.module('FormulaService',[])
    .factory('FormulaService', ['$http',function($http) {
        let service = {};

         let url = '';
            service.getChampionsList = function(year) {

                 url = "http://ergast.com/api/f1/" + year + '/results/1.json';
                return $http.get(url);
            }

            service.getTotalScore = function(year){
                 url = "http://ergast.com/api/f1/" + year + "/driverStandings.json";
                 return $http.get(url);
            }

        return service;
    }]);


