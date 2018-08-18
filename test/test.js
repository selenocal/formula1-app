describe('FormulaService', function () {
    var FormulaService, httpBackend;

    beforeEach(function () {
        module('formulaApp');


        inject(function ($httpBackend, _FormulaService_) {
            FormulaService = _FormulaService_;
            httpBackend = $httpBackend;
        });
    });


    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });


    it('ServiceTestSpecs', function () {

        var returnData = {};


        httpBackend.expectGET('http://ergast.com/api/f1/2008/results/1.json').respond(returnData);


        var returnedPromise = FormulaService.getChampionsList(2008);


        var result;
        returnedPromise.then(function (response) {
            result = response.data;//.MRData.RaceTable.Races[0].Results[0].Driver.driverId;
        });


        httpBackend.flush();



        expect(result).toEqual(returnData);

    });


});


