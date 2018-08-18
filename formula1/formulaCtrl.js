angular.module('formulaApp', ['FormulaService'])
    .controller('FormulaController', function ($scope, FormulaService, $q) {

        let formula = this;
        formula.yearlist = {
            years: []
        };

        for(let i = 2005; i < 2016; i++){
            formula.yearlist.years.push(i);
        }

        formula.selected = formula.yearlist.years[0];


        let getFormulaInfoFunction = function() {

            formula.topScoreAndDriver = {score: '', driver: '', driverName: ''};


            //after all http returns
            $q.all([FormulaService.getTotalScore(formula.selected), FormulaService.getChampionsList(formula.selected)])
                .then(function(data){


                formula.driverStandings = data[0].data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

                let point = 0;

                formula.races = data[1].data.MRData.RaceTable.Races;

                    formula.driverStandings.forEach(function(driver){
                        if(parseInt(driver.points) > point){
                            point = parseInt(driver.points);
                            formula.topScoreAndDriver.score = point;
                            formula.topScoreAndDriver.driver = driver.Driver.driverId;
                            formula.topScoreAndDriver.driverName = driver.Driver.givenName + ' ' + driver.Driver.familyName;
                        }
                    });


                    let count = 0;

                    formula.races.forEach(function(race){

                        if(race.Results[0].Driver.driverId === formula.topScoreAndDriver.driver ){
                            race.Results[0].Driver.color = true;

                        }else{
                            race.Results[0].Driver.color = false;
                            count++;
                        }

                    });

                    //if the winner is not included list that has all winners
                    if(count === formula.races.length){
                        formula.listShow = true;
                    }


                });
        }


        formula.initFunction = function(){
            getFormulaInfoFunction();
        }


        formula.hasChanged = function(){
            getFormulaInfoFunction();
        }
    }).config(function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}).directive('changeColor',

    //directive for change background color of winner of the selected year
    function() {

        return {
            restrict: 'A',
            scope: {
                myValue: '&changeColor'
            },
            link: function(scope,elem)
            {
                console.log('hello' , scope.myValue());
                if(scope.myValue()){

                    elem.css('background-color',  '#bfa7c7');

                }

            }

        };

    });

