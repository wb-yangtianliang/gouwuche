<template>
  <div class="gou">
    <div class="top">
         <h2>购物车</h2>
    </div>
    <div class="main">
      <div class="list" v-if="cartList.length>0">
         <dl v-for="(item,index) in cartList" :key="index" class="dl">
       <dt>
         <img :src="item.pic" alt="">
       </dt>
       <dd>
         <h3 class="name">{{item.name}}</h3>
         <p class="price">单价:<span>￥{{item.price}}</span></p>
         <div class="jj">
            <span class="sub" @click="sub(item.id)">-</span>
            {{item.count}}
            <span class="add" @click="add(item.id)">+</span>
         </div>
       </dd>
     </dl>
      </div>
      <div class="kong" v-else>
          <img src="../assets/images/没有更多.png" alt="">
          <p>您的购物车还是空的哦!</p>
     </div>
    </div>
     <div class="footer">
       <div class="left">
         <span>总数:</span>
         <span>{{total}}</span>
         <span>总价:</span>
          <span>{{zong}}</span>
       </div>
       <div class="right">
         去结算
       </div>
     </div>
  </div>
</template>

<script>
export default {
  computed:{
    total(){
      return this.cartList.reduce((pre,next)=>{
        return pre+next.count
      },0)
    },
    zong(){
        return this.cartList.reduce((pre,next)=>{
          return pre+next.count*next.price
        },0)
      }
  },
  data(){
    return {
      cartList:[]
    }
  },
  mounted(){
    this.cartList = localStorage.getItem('gouList')?JSON.parse(localStorage.getItem('gouList')):[]
  },
  methods:{
    sub(id){
        let findcart = this.cartList.find((item,index)=>{
          return item.id==id
        })
        if(findcart.count>0){
          findcart.count--;
        }
        localStorage.setItem('gouList',JSON.stringify(this.cartList));
    },
    add(id){
      let findcart = this.cartList.find((item,index)=>{
        return item.id==id;
      })
     findcart.count++;
     localStorage.setItem("gouList",JSON.stringify(this.cartList));
    }
  }
}
</script>

<style lang='scss' scoped>
.jj{
  position: absolute;
  bottom: 10px;
  right:30px;
  span{
    display: inline-block;
    width:20px;
    height:20px;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
  }
}
.sub{
  border: 1px solid skyblue;
  color:skyblue;
}
.add{
  background: skyblue;
  color:#fff;
}
 .price{
        color:rgb(109, 107, 107);
        span{
          color:red;
          font-size: 20px;
        }
      }
 .name{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 30px;
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
    }
}
.gou{
  display:flex;
  height:100%;
  flex-direction: column;
}
.top{
  height:50px;
  line-height: 50px;
  padding: 0 20px;
}
.main{
  flex:1;
     padding:0 15px;
     overflow: hidden;
  .kong{
    display: flex;
    flex-direction: column;
     justify-content: center;
    align-items: center;
    margin-top:50px;
  }
}
.footer{
  height:50px;
  line-height: 50px;
  display: flex;

  .left{
    flex:2;
    display: flex;
    span{
      flex:1;
      text-align: center;
    }
  }
  .right{
    flex:1;
    background: lightgreen;
    text-align: center;
    color:#fff;
    font-size: 20px;
  }
}
.list{
  overflow: auto;
  height:100%;
}
</style>
