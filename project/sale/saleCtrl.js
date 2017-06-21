/**
 * Created by Administrator on 2017/5/15.
 */
angular.module("myapp")
    .controller("saleCtrl",function ($scope) {
        $scope.info = [
            {
                code : '10001',
                goods: '绿尾青雉',
                much:'-20(-5.86%)',
                price:22.56,
                num:'1456',
                volume:12420.58,
                first:12.46,
                past:11.32,
                maxNum:78.48,
                minNum:70.68,
                successNum:2,
                store:112045
            },
            {
                code : '25164',
                goods: '特种邮票',
                much:'12(10.56%)',
                price:45.56,
                num:'805',
                volume:7446,
                first:12.46,
                past:11.32,
                maxNum:78.48,
                minNum:70.68,
                successNum:2,
                store:112045
            },
            {
                code : '12504',
                goods: '大板邮票',
                much:'15(8.76%)',
                price:33.56,
                num:'25',
                volume:666.41,
                first:12.46,
                past:11.32,
                maxNum:78.48,
                minNum:70.68,
                successNum:2,
                store:112045
            }
        ];
        $scope.addNum = function (data) {
            if(parseInt(data)>=0){
                return true;
            }else{
                return false;
            }
        };
        $scope.showThis = false;
    });
