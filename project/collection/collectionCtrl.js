angular.module("myapp")
    .controller("collectionCtrl",function ($scope,mydata){
        $scope.data=mydata.findAll();
    });
