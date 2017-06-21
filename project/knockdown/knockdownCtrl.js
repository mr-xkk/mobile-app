/**
 * Created by Administrator on 2017/5/18.
 */
angular.module("myapp")
    .controller("knockdownCtrl",function ($scope,ionicToast,mydata) {
        $scope.goods = mydata.backGoods();
        $scope.tobuy_list = ['买/卖','成交价格','成交数量','成交时间','卖出盈亏','成本价','费用','成交单号','商品代码'];
        $scope.showToast = function(){
            <!-- ionicToast.show(message, position, stick, time); -->
            ionicToast.show('记录为空', 'middle', false, 2000);
        };
        if($scope.goods==''){
            $scope.showToast();
        }
    });