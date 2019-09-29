<template>
  <div class="home">
     <div class="header">
         <img src="../assets/images/avatar.jpg" alt="">
     </div>
     <div class="main">
        <div class="cart"><router-link to='/gou'><img src="../assets/images/cart.png" alt=""></router-link></div><span class="num">{{total}}</span>
        <h2 class="title">爱时尚精品屋</h2>
     <p class="text">公告:欢迎光临,流行爆款库存有限请尽早下单,谢谢.</p>
     <div class="nav">
       <span v-for="(item,index) in navList" :key="index" @click="sort(index)">{{item}}</span>
     </div>
     <div class="box">
     <dl v-for="(item,index) in getList" :key="index" class="dl">
       <dt>
         <img :src="item.pic" alt="">
       </dt>
       <dd>
         <h3 class="name">{{item.name}}</h3>
         <p class="buycount">已售:{{item.buyCount}}</p>
         <p class="price">单价:<span>￥{{item.price}}</span></p>
         <span class="car" @click="addTocart(item)">加入购物车</span>
       </dd>
     </dl>
     </div>
     </div>
  </div>
</template>

<script>
import axios from 'axios';
import { log } from 'util';
export default {
  data(){
    return {
      navList:['价格升序↑','价格降序↓','销量升序↑','销量降序↓'],
      getList:[],
      gouList:[],
    }
  },
  computed:{
    total(){
      return this.gouList.reduce((pre,next)=>{
        return pre+next.count
      },0)
    }
  },
  methods:{
    addTocart(item){
      let gouList=localStorage.getItem('gouList')?JSON.parse(localStorage.getItem('gouList')):[];
      let findgou = gouList.find((val,index)=>{
        return item.id===val.id
      })
      if(!findgou){
        item.count = 1;
        gouList.push(item);
      }else{
        findgou.count++;
      }
      this.gouList = gouList;
      localStorage.setItem('gouList',JSON.stringify(gouList));
    },
    sort(index){
      if(index===0){
        this.getList.sort((a,b)=>{
          return a.price-b.price;
        })
      }else if(index===1){
        this.getList.sort((a,b)=>{
          return b.price-a.price;
        })
      }else if(index===2){
        this.getList.sort((a,b)=>{
             return a.buyCount-b.buyCount;
        })
      }else{
        this.getList.sort((a,b)=>{
             return b.buyCount-a.buyCount;
        })
      }
    }
  },
  mounted(){
    axios.get('https://yantianfeng.com/api/goodList').then(res=>{
      this.getList = res.data.goodList;
    });
    this.gouList = localStorage.getItem("gouList")?JSON.parse(localStorage.getItem('gouList')):[];
  }
}
</script>

<style lang="scss" scoped>
.home{
  height:100%;
  display:flex;
  flex-direction: column;
  .header{
    height:200px;
  }
  .main{
    flex:1;
    overflow: hidden;
    position: relative;
     .cart{
        position: absolute;
        bottom: 30px;
        right:40px;
        width:60px;
        height:60px;
        background: rgb(64, 142, 243);
        border-radius: 50%;
        overflow: hidden;
        padding: 10px;
        z-index: 1;
        img{
          width:100%;
        }
      }
        .num{
          border-radius: 50%;
          width:25px;
          height:25px;
          text-align: center;
          line-height: 25px;
          background: red;
          color:#fff;
          position: absolute;
          bottom:75px; 
          right:40px;
          z-index: 100;
        }
    .box{
      height:100%;
      overflow: auto;
    }
  }
}
  .header{
    background: url('../assets/images/banner-2.png');
    background-size: cover;
    background-position-x: center;
    position: relative;
    img{
      border-radius: 50%;
      position: absolute;
      width:80px;
      left:50%;
      bottom: -40px;
      margin-left: -40px;
    }
  }
  .main{
    padding: 10px;
  }
  .title{
    text-align: center;
    margin-top: 50px;
  }
  .text{
    text-align: center;
    margin-top: 10px;
  }
  .nav{
    height:50px;
    display: flex;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    span{
      flex:1;
      text-align: center;
      font-size: 20px;
    }
  }
  .dl{
    display: flex;
    margin: 20px 0px;
    dt{
      flex:1;
      margin-right: 10px;
      img{
        width:100%;
      }
    }
    dd{
      flex:3;
      overflow: hidden;
       position: relative;
       p{
         margin-top: 10px;
       }
         .car{
          color:#fff;
          position: absolute;
          right:10px;
          bottom: 10px;
          background: red;
          width:100px;
          height:30px;
          line-height: 30px;
          text-align: center;
        }
      .name{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .buycount{
        color:rgb(109, 107, 107);
      }
      .price{
        color:rgb(109, 107, 107);
        span{
          color:red;
          font-size: 20px;
        }
      }
    }
  }
  .car:active{
    opacity: 0.3;
  }
</style>