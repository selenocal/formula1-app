describe('FormulaService', function () {
    // define variables for the services we want to access in tests
    var FormulaService;
    var q;
    var $rootScope;

    beforeEach(function () {
        module('formulaApp');

        // inject the services we want to test
        inject(function ($controller, _FormulaService_,$q, _$rootScope_) {
            FormulaService = _FormulaService_;
            q = $q;
            $rootScope = _$rootScope_;
        });
        var deferredSuccess = q.defer();
        spyOn(FormulaService, 'getChampionsList').and.returnValue(deferredSuccess.promise);


    });

        it('should do something with the', function () {
            let champ = '';
            FormulaService.getChampionsList(2008).then(result =>{
                expect(FormulaService.getChampionsList).toHaveBeenCalledWith(2008);
                champ = result.data.MRData.RaceTable.Races[0].Results[0].Driver.driverId;

            });
            $rootScope.$apply();
            expect(champ).toBe('FIS');

        });

});


