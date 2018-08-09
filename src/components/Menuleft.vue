<template>
	<div id="menu">
		<Select v-model="model1" style="width:80%;margin-top:10px;background:transparent" class="menuSelect">
      <Option v-for="item in menuList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
		<!-- <Tree :data="data1" style="width:100%;color:#0f0"></Tree> -->
		<ul class="tree">
			<li class="tree_firstlist">
				<a href="javascript:;">
					<Icon type="android-person" color="#fff"></Icon>
					<span class="tree_firstlistfont">用户1</span>
					<span class="tree_circle"></span>
				</a>
				<ul>
					<li class="tree_secondlist">
						<span class="tree_secondlistfont">表1</span>
						<span class="tree_circle"></span>
					</li>
					<li class="tree_secondlist">
						<span class="tree_secondlistfont">表2</span>
						<span class="tree_circle"></span>
					</li>
					<li class="tree_secondlist">
						<span class="tree_secondlistfont">表3</span>
						<span class="tree_circle"></span>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Menu',
	data () {
		return {
			//
			menuList: [
				{
						value: '营业厅1',
						label: '营业厅1'
				},
				{
						value: '营业厅2',
						label: '营业厅2'
				},
				{
						value: '营业厅3',
						label: '营业厅3'
				},
				{
						value: '营业厅4',
						label: '营业厅4'
				}
			],
			// model1: '',
			//树形列表
			// data1: [
			// 	{
			// 		title: '用户1',
			// 		expand: false,
			// 		children: [
			// 			{
			// 					title: '表1',
			// 					expand: false,
			// 			},
			// 			{
			// 					title: '表2',
			// 					expand: false,
			// 			},
			// 			{
			// 				title: '表3',
			// 				expand: false
			// 			}
			// 		]
			// 	},
			// 	{
			// 		title: '用户2',
			// 		expand: false,
			// 		children: [
			// 			{
			// 					title: '表1',
			// 					expand: false,
			// 			},
			// 			{
			// 					title: '表2',
			// 					expand: false,
			// 			},
			// 			{
			// 				title: '表3',
			// 				expand: false
			// 			}
			// 		]
			// 	}
			// ]
		}
	}
}
</script>

<style>
#menu{
width: 100%;
height: 100%;
background: transparent
/* background: #fff */
}
.menuSelect div{
background: transparent;
}
.menuSelect li{
color: #fff
}
.menuSelect li:hover{
color: #658eae
}
.tree{
width:100%;
margin-top: 10px;
}
.tree_firstlist{
width: 100%;
height: 16px;
line-height:16px;
}
tree_firstlistfont>a{
text-decoration: none;
color: #fff
}
.tree_firstlistfont{
font-size: 14px;
color: #fff;
margin-left: 10px;
}
.tree_firstlist:hover{
background: #8f9396
}
.tree_circle{
display: block;
float: right;
margin-top: 3px;
margin-right: 30px;
width: 10px;
height: 10px;
border-radius: 50%;
background: #a2e0af
}
.tree_secondlist{
margin-left:30px;
height: 16px;
line-height: 16px;
}
.tree_secondlistfont{
font-size: 14px;
color: #fff
}
</style>
