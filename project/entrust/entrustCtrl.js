/**
 * Created by Administrator on 2017/5/20.
 */
angular.module("myapp")
    .controller("entrustCtrl",function ($scope,ionicToast,mydata) {
        $scope.goods = mydata.backGoods();
        $scope.ens_list = ['买/卖','委托价格','委托数量','委托日期','委托时间','状态','委托单号','商品代码'];
        $scope.showToast = function(){
            <!-- ionicToast.show(message, position, stick, time); -->
            ionicToast.show('记录为空', 'middle', false, 2000);
        };
        if($scope.goods==''){
            $scope.showToast();
        }
    });