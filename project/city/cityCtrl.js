angular.module("myapp")
    .controller("cityCtrl",function($scope,$ionicPopup,$ionicLoading,$http,$stateParams,mydata){
        /*----解析url--------*/
        $scope.goodsId = $stateParams.priceId;
        console.log($scope.goodsId);
        /*列表切换*/
        var oUl = document.getElementById('kXian');
        var oLi = oUl.getElementsByTagName('li');
        console.log(oLi.length);
        for(var i=0;i<oLi.length;i++){
            oLi[i].onclick  = function () {
                for(var j=0;j<oLi.length;j++) {
                    oLi[j].className = '';
                }
                this.className = 'k_active'
            }
        }
        /*滑动事件*/
        $scope.onSwipeLeft = function(){
            console.log("向左滑动了一下");
        };
        $scope.onSwipeRight = function(){
            console.log("向右滑动了一下");
        };
        /*----------------------*/
        $scope.goodsInfo = mydata.backGoods();

        $scope.addAlert = function(id,val) {
           $ionicPopup.alert({
                title: '添加自选成功',
                okText:'确定'
            });
            mydata.likeGoods(val);

            $scope.addSuc = !$scope.addSuc;
            $scope.removeSuc = !$scope.removeSuc;
        };

        $scope.removeAlert = function() {
            $ionicPopup.alert({
                title: '删除自选成功',
                okText:'确定'
            });
            $scope.addSuc = !$scope.addSuc;
            $scope.removeSuc = !$scope.removeSuc
        };
        /*获取极值*/
        Array.prototype.max = function(){
            return Math.max.apply({},this)
        };
        Array.prototype.min = function(){
            return Math.min.apply({},this)
        };
        /*loading*/
        /*基于准备好的dom,初始化echarts实例*/
        var myChart = echarts.init(document.getElementById('main'));
        var flag = true;
        /*切换列表*/
        $scope.selected=0;
        $scope.page1 = true;
        $scope.elist = ['分时','k线','成交明细'];
        /*一进入加载日K*/
        $scope.load = function () {
            $scope.getMes('kline_1d');
        };
        $scope.cut=function(row){
            $scope.selected=row;
            if(row==0){
                $scope.page1 = true;
                $scope.page2 = false;
                $scope.page3 = false;
            }else if(row==1){
                $scope.page1 = false;
                $scope.page2 = true;
                $scope.page3 = false;
                if(flag){
                    flag=false;
                    $scope.load();
                }
            }else if(row==2){
                $scope.page1 = false;
                $scope.page2 = false;
                $scope.page3 = true;
            }
        };
        $scope.addSuc = true;
        $scope.removeSuc = false;
        /*成交明细列表信息*/
        $scope.deals = ['时','价','时','价'];
        /*----------*/
        /*请求数据*/
        $scope.getMes = function (mes) {
            myChart.showLoading();
            var url = 'http://api.hzrongruan.com/api/order/getOrdersKline';
            var req = {
                method: 'GET',
                url: url,
                params:{time:mes},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Accept': '*/*'
                }
            };
            $http(req).success(function(res){
                $scope.res = res[mes].data;
                console.log($scope.res);
                myChart.hideLoading();
                // 基于准备好的dom，初始化echarts实例
                    var colorList = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
                    var labelFont = 'bold 12px Sans-serif';
                    function calculateMA(dayCount, data) {
                        var result = [];
                        for (var i = 0, len = data.length; i < len; i++) {
                            if (i < dayCount) {
                                result.push('-');
                                continue;
                            }
                            var sum = 0;
                            for (var j = 0; j < dayCount; j++) {
                                sum += data[i - j][1];
                            }
                            result.push((sum / dayCount).toFixed(2));
                        }
                        return result;
                    }

                    var dates = res[mes].date;
                    var volumns = res[mes].volumn;
                    var dataMA5 = calculateMA(5, $scope.res);
                    var dataMA10 = calculateMA(10,$scope.res);
                    var dataMA20 = calculateMA(20, $scope.res);

                    option = {
                        animation: false,
                        color: colorList,
                        title: {
                            left: 'center',
                            text: '大板股票'
                        },
                        tooltip: {
                            triggerOn: 'none',
                            transitionDuration: 0,
                            confine: true,
                            bordeRadius: 4,
                            borderWidth: 1,
                            borderColor: '#333',
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            textStyle: {
                                fontSize: 12,
                                color: '#333'
                            },
                            position: function (pos, params, el, elRect, size) {
                                var obj = {
                                    top: 60
                                };
                                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                                return obj;
                            }
                        },
                        axisPointer: {
                            link: [{
                                xAxisIndex: [0, 1]
                            }]
                        },
                        dataZoom: [{
                            type: 'slider',
                            xAxisIndex: [0, 1],
                            realtime: false,
                            start: 20,
                            end: 70,
                            top: 65,
                            height: 20,
                            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                            handleSize: '120%'
                        }, {
                            type: 'inside',
                            xAxisIndex: [0, 1],
                            start: 40,
                            end: 70,
                            top: 30,
                            height: 20
                        }],
                        xAxis: [{
                            type: 'category',
                            data: dates,
                            boundaryGap : false,
                            axisLine: { lineStyle: { color: '#777' } },
                            axisLabel: {
                                formatter: function (value) {
                                    return echarts.format.formatTime('MM-dd', value);
                                }
                            },
                            min: 'dataMin',
                            max: 'dataMax',
                            axisPointer: {
                                show: true
                            }
                        }, {
                            type: 'category',
                            gridIndex: 1,
                            data: dates,
                            scale: true,
                            boundaryGap : false,
                            splitLine: {show: false},
                            axisLabel: {show: false},
                            axisTick: {show: false},
                            axisLine: { lineStyle: { color: '#777' } },
                            splitNumber: 20,
                            min: 'dataMin',
                            max: 'dataMax',
                            axisPointer: {
                                type: 'shadow',
                                label: {show: false},
                                triggerTooltip: true,
                                handle: {
                                    show: true,
                                    margin: 30,
                                    color: '#B80C00'
                                }
                            }
                        }],
                        yAxis: [{
                            scale: true,
                            splitNumber: 2,
                            axisLine: { lineStyle: { color: '#777' } },
                            splitLine: { show: true },
                            axisTick: { show: false },
                            axisLabel: {
                                inside: true,
                                formatter: '{value}\n'
                            }
                        }, {
                            scale: true,
                            gridIndex: 1,
                            splitNumber: 2,
                            axisLabel: {show: false},
                            axisLine: {show: false},
                            axisTick: {show: false},
                            splitLine: {show: false}
                        }],
                        grid: [{
                            left: 20,
                            right: 20,
                            top: 110,
                            height: 120
                        }, {
                            left: 20,
                            right: 20,
                            height: 40,
                            top: 260
                        }],
                        graphic: [{
                            type: 'group',
                            left: 'center',
                            top: 70,
                            width: 300,
                            bounding: 'raw',
                            children: [{
                                id: 'MA5',
                                type: 'text',
                                style: {fill: colorList[1], font: labelFont},
                                left: 0
                            }, {
                                id: 'MA10',
                                type: 'text',
                                style: {fill: colorList[2], font: labelFont},
                                left: 'center'
                            }, {
                                id: 'MA20',
                                type: 'text',
                                style: {fill: colorList[3], font: labelFont},
                                right: 0
                            }]
                        }],
                        series: [{
                            name: '成交量',
                            type: 'bar',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            itemStyle: {
                                normal: {
                                    color: '#7fbe9e'
                                },
                                emphasis: {
                                    color: '#140'
                                }
                            },
                            data: volumns
                        }, {
                            type: 'candlestick',
                            data: $scope.res,
                            itemStyle: {
                                normal: {
                                    color: '#ef232a',
                                    color0: '#14b143',
                                    borderColor: '#ef232a',
                                    borderColor0: '#14b143'
                                },
                                emphasis: {
                                    color: 'black',
                                    color0: '#444',
                                    borderColor: 'black',
                                    borderColor0: '#444'
                                }
                            }
                        }, {
                            name: 'MA5',
                            type: 'line',
                            data: dataMA5,
                            smooth: true,
                            showSymbol: false,
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            }
                        }, {
                            name: 'MA10',
                            type: 'line',
                            data: dataMA10,
                            smooth: true,
                            showSymbol: false,
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            }
                        }, {
                            name: 'MA20',
                            type: 'line',
                            data: dataMA20,
                            smooth: true,
                            showSymbol: false,
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            }
                        }]
                    };


                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);

                /!*---------------------------------------*/
            }).error(function(){});
        }

        /*---------------------------------------------------------*/
        var charts = echarts.init(document.getElementById('contain'));
        var newData = [96.3,96.4,97.5,95.6,98.1,94.8,89.6,94.1,80.1,52.4,75.8,94.7];
        /*获取极值*/
        $scope.maxNum = newData.max();
        $scope.minNum = newData.min();
        $scope.newNum = newData[newData.length-1];
        $scope.ups = $scope.maxNum- $scope.newNum;
        $scope.comNum = function () {
            if($scope.ups>=0){
                return true
            }else{
                return false;
            }
        };

        option = {
            title: {
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 16,
                    color: '#F1F1F3'
                },
                left: '6%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            },
            legend: {
                icon: 'rect',
                itemWidth: 14,
                itemHeight: 5,
                itemGap: 13,
                data: ['大板股票'],
                right: '4%',
                textStyle: {
                    fontSize: 12,
                    color: '#F1F1F3'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                data: ['9:50', '9:51', '9:52', '9:53', '9:54', '9:55', '9:56', '9:57', '9:58', '9:59', '10:00', '10:01']
            }],
            yAxis: [{
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 14
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            }],
            series: [{
                name: '大板股票',
                type: 'line',
                smooth: true,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(137, 189, 27, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(137, 189, 27, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(137,189,27)'
                    }
                },
                data: newData
            }
            ]
        };

        charts.setOption(option);
    })

;