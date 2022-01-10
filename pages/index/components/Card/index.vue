<template>
	<view class="card">
		<swiper class="cardSwiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(banner,index) in currentCategory.bannerUrlList" :key="index">
				<view class="swiper-item">
					<image class="swiperImg" :src="banner"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="cardTitle">{{currentCategory.name}}</view>
		<view class="cardTitle">{{currentCategory.frontName}}</view>
		<view class="goodsList">
			<view @click="toDetail(goods)" class="goodsItem" v-for="(goods,index) in currentCard.itemList" :key="goods.id">
				<image class="goodsImg" :src="goods.primaryPicUrl"></image>
				<view class="goodsName">{{goods.name}}</view>
				<view class="goodsPrice">{{goods.counterPrice}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		name:'Card',
		props:['currentId'],
		mounted(){
			this.getCardList()
		},
		methods:{
			getCardList(){
				this.$store.dispatch('getCardList')
			},
			// 点击去到详情页
			toDetail(goods){
				// 第一种做法：路由传参，小程序路径长度限制比浏览器要长
				// wx.navigateTo({
				// 	url:'/pages/detail/detail?goodsInfo=' + JSON.stringify(goods)
				// })
				
				// 第二种做法，存储方案
				wx.setStorageSync('goodsInfo_key',goods)
				wx.navigateTo({
					url:'/pages/detail/detail',
				})
			}
		},
		computed:{
			// 1、如果没有用到模块化和命名空间
			// 所有的数据都存在总的store当中的state里面
			// 所有的方法也都是直接存储在actions mutations getters中
			// 他们在映射的时候都可以直接写数组（只要保证组件当中和vuex当中名字相同即可数组写法映射）
			
			
			// 2、如果开启了模块化
			// 模块化只能会影响state state内部就不是直接放的数据，而是state里面就多了模块对象，模块对象当中存储各个模块的数据
			// 此时，就不能使用mapState直接写数组去映射了。因为影响到了state的结构，state里面必须直接放的数据才能使用数组
			// 但是模块化并不影响其它三个，所以其它三个仍然可以使用数组去映射
			
			
			// 3、如果开启了命名空间（模块化必然也已经开启）
			// 开启命名空间本质是为了处理除了state其它三个可以重复的问题，如果没有开启命名空间，各个模块当中对应的
			// getters mutations actions不能重复，如果开启了，就可以重复，只是在使用的时候，需要加上命名空间的名字
			// 命名空间也会影响到state的写法，开启了命名空间，state用到了模块化也可以用数据，只是在mapState的时候
			// 第一个参数要加命名空间的名字
			
			
			// cardList(){
			// 	return this.$store.state.home.cardList
			// }
			
			...mapState({
				cardList:state => state.home.cardList
			}),
			// mapState返回的值是下面这个对象
			// {
			// 	cardList(){
			// 		return this.$store.state.home.cardList
			// 	}
			// }
			
			// 计算点击的这一个nav对应的内容，
			// 根据点击的nav的L1id和cardlist当中每一项的parentId进行对比
			currentCard(){
				return this.cardList.find(item => item.category.parentId === this.currentId) || {}
			},
			currentCategory(){
				return this.currentCard.category || {}
			}
			
		}
	}
</script>

<style lang="stylus">
	.card
		.cardSwiper
			.swiperImg
				width 100%
				height 300rpx
		.cardTitle
			text-align center
		.goodsList
			display flex
			flex-wrap wrap
			justify-content space-around
			&::after
				display block
				content ''
				width 344rpx
			.goodsItem
				width 344rpx
				.goodsImg
					width 344rpx
					height 344rpx	
					
</style>
