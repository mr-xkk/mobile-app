angular.module("myapp")
    .controller("homeCtrl",function ($scope,mydata,$state,$ionicLoading) {
        $scope.list = ['我的商品','我的自选'];
        $scope.info = mydata.getDate();
        /*------------------*/
        console.log($scope.info);
        $scope.like = mydata.myGoods();
        console.log($scope.like);

        $scope.addNum = function (data) {
            if(parseInt(data)>=0){
                return true;
            }else{
                return false;
            }
        };
        $scope.showThis = false;
        $scope.selected=0;
        $scope.changeList=function(row){
            $scope.selected=row;
            $scope.tabOne = !$scope.tabOne;
            $scope.tabTwo = !$scope.tabTwo;
        };
        $scope.tabOne = true;
        $scope.tabTwo = false;


        $scope.toPrice = function (tokenId,data) {
            mydata.getGoods(data);
            $state.go('tabs.city', {priceId: tokenId});
        };
        $scope.toBuy = function (tokenId,data) {
            console.log(data);
            mydata.getGoods(data);
            $state.go('tabs.price', {buyId: tokenId});
        };
        /*loading*/
        $scope.again = function () {
            $state.reload();
        };
        $scope.show = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="dots" class="spinner-calm"></ion-spinner>',
                duration:number=1000
            });
        };
        $scope.hide = function(){
            $ionicLoading.hide();
        };
    });
