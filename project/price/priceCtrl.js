angular.module("myapp")
    .controller("priceCtrl",function ($scope,$stateParams,mydata,$ionicPopup,$timeout,ionicToast) {
        /*----解析url--------*/
        $scope.buysId = $stateParams.buyId;
        console.log($scope.buysId);
        $scope.goods = mydata.backGoods();
        console.log($scope.goods);

        /*列表*/
        $scope.buyList = ['委托','撤单','持仓','查询'];
        $scope.selected = 0;

        $scope.ent = true;
        $scope.getb = false;
        $scope.pos = false;
        $scope.que = false;
        $scope.changeList=function(row){
            $scope.selected=row;
            switch(row)
                {
                    case 0:
                        row=0;
                    $scope.ent = true;
                    $scope.getb = false;
                    $scope.pos = false;
                    $scope.que = false;
                    break;
                    case 1:
                        row=1;
                    $scope.ent = false;
                    $scope.getb = true;
                    $scope.pos = false;
                    $scope.que = false;
                    break;
                    case 2:
                            row=2;
                    $scope.ent = false;
                    $scope.getb = false;
                    $scope.pos = true;
                    $scope.que = false;
                    break;
                    case 3:
                            row=3;
                    $scope.ent = false;
                    $scope.getb = false;
                    $scope.pos = false;
                    $scope.que = true;
                }
        };
        /*资产*/
        $scope.assetVal = ['31.42','34.78','32.25','62.30'];
        $scope.asset = ['可用资金','持有市值','可取资金','总资金'];
        /*购买提交按钮*/
        $scope.toBuy = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: '订单信息',
                template: 'Are you sure you want to buy?',
                okText: '确定',
                cancelText: '取消'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    console.log('确定');
                } else {
                    console.log('取消');
                }
            });
        };
        /*撤单区*/
        $scope.getb_list = ['买/卖','委托价格','委托数量','委托日期','委托时间'];
        /*持仓区*/
        $scope.pos_list =['总持有量','可用数量','持有均价','贷款','盈亏比例','持有盈亏','市值','商品代码'];
        $scope.goods_name = [
            {
                name:'凤翔',
                nums:2,
                price:2,
                jun:25.43,
                dai:25.43,
                yin:'-68.86%',
                chi:'-17.51',
                shi:'7.92',
                code:201001
            }
        ];
        /*数据加减*/
        $scope.addNum = null;
        $scope.addPrice = null;
        $scope.add = function () {
            $scope.addNum++;
        };
        $scope.cut= function () {
            if($scope.addNum<=0){
                return;
            }
            $scope.addNum--;
        };
        $scope.addP = function () {
            $scope.addPrice++;
        };
        $scope.cutP = function () {
            if($scope.addPrice<=0){
                return;
            }
            $scope.addPrice--;
        };

    });