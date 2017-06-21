/**
 * Created by Administrator on 2017/5/20.
 */
angular.module("myapp")
    .controller("containerCtrl",function ($scope,ionicToast,mydata) {
        $scope.goods = mydata.backGoods();
        $scope.con_list = ['持有量','成本价','贷款','商品代码'];
        $scope.showToast = function(){
            <!-- ionicToast.show(message, position, stick, time); -->
            ionicToast.show('记录为空', 'middle', false, 2000);
        };
        if($scope.goods==''){
            $scope.showToast();
        }
    });