/**
 * Created by Administrator on 2017/5/16.
 */
angular.module("myapp")
    .factory("mydata",function () {
        var tokenData = [
            {
                tokenId:1,
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
                tokenId:2,
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
                tokenId:3,
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
        var goodData  = [];
        var goodsLike = [];
        return {
            getGoods:function (arr) {
                for(var i=0;i<arr.length;i++){
                    var item = goodData[i];
                    if(item.tokenId===arr.tokenId){
                        return;
                    }
                }
                goodData.length = 0;
                goodData.push(arr);
            },
            likeGoods:function (val) {
                goodsLike.push(val);
            },
            /*返回收藏数据*/
            myGoods:function () {
              return goodsLike;
            },
            /*返回购买数据*/
            backGoods:function () {
              return goodData;
            },
            /*返回总数据*/
            getDate :function () {
                return tokenData;
            }
        }
    })