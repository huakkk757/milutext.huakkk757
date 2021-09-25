var canvas = document.getElementById('loadPage'); // 获取canvas dom元素
var ctx = canvas.getContext('2d'); // 获取画笔
var img = new Image(); // 创建图片对象
var progress = 0 // 进度条初始值
var timer_progress = null // 进度条的定时器
var timer = null // 控制上下左右移动定时器
var w = canvas.width; //画板宽度
var h = canvas.height; // 画板高度
var eatRubbishNum = [] // 每关当前吃的垃圾数组
var currentRubbishNum = [] // 当前关卡所有垃圾
// 主角对象
var leaderObj = {
	img: '../image/可回收物.png',
	x: 0,
	y: 0,
	w: 30,
	h: 30,
	state: 0
}
// 控制方向键
var left = right = up = down = false
// 移动速度
var b = 4
//  当前地图
var currentMap = 0
// 当前缩放比例
var current = 1
// 设置背景图片地址
img.src = "../image/吃豆人.png"
var isdie=0

var gwImgObj = new Map()
// 方块初始数据
var gameLeave = [
	["183,0,31,83", "410,0,149,70", "742,0,38,134", "624,134,156,35",
		"961,0,191,70", "856,118,168,34", "1242,0,27,56", "1230,156,80,154", "1077,156,60,210",
		"1077,366,177,29", "1079,511,164,29", "207,182,157,35", "183,259,32,173", "56,401,127,31",
		"281,334,138,138", "507,191,31,273", "638,227,282,158", "56,588,104,34", "160,588,31,180",
		"274,572,169,35", "247,708,39,60", "427,658,219,32", "427,690,27,78", "649,460,261,36",
		"787,577,26,173", "910,460,31,274", "1084,667,163,23"
	],
	["70,0,200,70",
		"375,0,210,70", "640,0,35,110", "774,0,200,70", "1080,0,200,70", "0,130,276,33",
		"276,130,31,170", "0,265,276,33",
		"0,434,276,33", "270,434,31,170", "0,571,276,33", "0,658,93,87", "1010,130,31,170", "1041,130,276,33",
		"1041,265,276,33", "1010,434,31,170", "1041,434,276,33", "1041,571,276,33", "376,480,32,273",
		"168,741,325,27", "920,462,32,272", "830,733,320,33", "465,124,32,270", "497,187,114,32",
		"741,187,102,32", "497,336,114,32", "741,336,102,32", "843,117.6,30.8,267.4", "465,460.2,32,169.8",
		"833,458,30.8,168.9", "582,574,175.7,31", "656,605,28,163"
	],
	["0,0,909,20", "909,0,25,123", "996,0,26,128", "1022,107,161,21",
		"1097,52,86,20", "1183,52,27,76", "55.8,20,27.1,109.6", "55.8,110.6,735.1,19",
		"0,187.5,702.8,20", "675,207.5,27.8,126.8", "162.8,334.3,540,21", "162.8,280.4,29,54.9",
		"162.8,259.4,424,22", "824,187,219,21", "1156,184,310,21", "84,262,27,163", "111,404,211,21",
		"0,474,208,21", "73,586,239,20", "73,606,27,142", "73,748,786,20", "187,606,27,66",
		"154,672,104,21", "1005,343,104,21", "1082,243,27,120", "1216,278,150,21",
		"1220,363,146,21", "1220,384,27,94", "1118,554,248,21", "1341,575,25,155", "1060,645,201,22",
		"1060,667,28,101", "766,264,152,21", "766,285,27,125", "891,285,27,71", "386,410,564,20",
		"386,430,29,84", "270,514,177,21", "420,535,27,128", "582,525,464,20", "1016,429,91,19",
		"1016,448,30,77", "420,663,405,21", "799,545,26,118", "522,600,26,63", "709,545,26,118",
		"609,597,100,20"
	]
]
// 初始化垃圾数据
var rubbishArr = [{
		img: '../image/苹果.png',
		x: 56,
		y: 490,
		w: 80,
		h: 90,
		isEat: false,
		class: 1,
		map: [1]
	},
	{
		img: '../image/香蕉皮.png',
		x: 500,
		y: 580,
		w: 70,
		h: 70,
		isEat: false,
		class: 1,
		map: [1]
	},
	{
		img: '../image/鸡蛋.png',
		x: 290,
		y: 270,
		w: 80,
		h: 60,
		isEat: false,
		class: 1,
		map: [1]
	},
	{
		img: '../image/易拉罐.png',
		x: 858,
		y: 50,
		w: 90,
		h: 60,
		isEat: false,
		class: 2,
		map: [1]
	},
	{
		img: '../image/水杯.png',
		x: 1089,
		y: 440,
		w: 90,
		h: 60,
		isEat: false,
		class: 2,
		map: [1]
	},
	{
		img: '../image/纸团.png',
		x: 650,
		y: 74,
		w: 60,
		h: 60,
		isEat: false,
		class: 2,
		map: [1]
	},
	{
		img: '../image/废电池.png',
		x: 180,
		y: 680,
		w: 50,
		h: 50,
		isEat: false,
		class: 3,
		map: [2]
	},
	{
		img: '../image/废灯管2.png',
		x: 1016,
		y: 62,
		w: 40,
		h: 70,
		isEat: false,
		class: 3,
		map: [2]
	},
	{
		img: '../image/废药品.png',
		x: 157,
		y: 358,
		w: 50,
		h: 80,
		isEat: false,
		class: 3,
		map: [2]
	},
	{
		img: '../image/易拉罐.png',
		x: 718,
		y: 710,
		w: 90,
		h: 60,
		isEat: false,
		class: 2,
		map: [2]
	},
	{
		img: '../image/水杯.png',
		x: 1034,
		y: 362,
		w: 120,
		h: 70,
		isEat: false,
		class: 2,
		map: [2]
	},
	{
		img: '../image/纸团.png',
		x: 630,
		y: 170,
		w: 70,
		h: 70,
		isEat: false,
		class: 2,
		map: [2]
	},
	{
		img: '../image/废油漆桶.png',
		x: 609,
		y: 506,
		w: 70,
		h: 70,
		isEat: false,
		class: 3,
		map: [2]
	},
	{
		img: '../image/苹果.png',
		x: 180,
		y: 695,
		w: 50,
		h: 50,
		isEat: false,
		class: 1,
		map: [3]
	},
	{
		img: '../image/废灯管2.png',
		x: 337,
		y: 430,
		w: 30,
		h: 50,
		isEat: false,
		class: 3,
		map: [3]
	},
	{
		img: '../image/废药品.png',
		x: 157,
		y: 355,
		w: 30,
		h: 48,
		isEat: false,
		class: 3,
		map: [3]
	},
	{
		img: '../image/罐头盒.png',
		x: 812,
		y: 78,
		w: 90,
		h: 50,
		isEat: false,
		class: 2,
		map: [3]
	},
	{
		img: '../image/水杯.png',
		x: 1034,
		y: 368,
		w: 90,
		h: 50,
		isEat: false,
		class: 2,
		map: [3]
	},
	{
		img: '../image/纸团.png',
		x: 630,
		y: 145,
		w: 40,
		h: 40,
		isEat: false,
		class: 2,
		map: [3]
	},
	{
		img: '../image/鸡蛋.png',
		x: 804,
		y: 488,
		w: 60,
		h: 40,
		isEat: false,
		class: 1,
		map: [3]
	},
	{
		img: '../image/旧毛巾.png',
		x: 1200,
		y: 125,
		w: 60,
		h: 60,
		isEat: false,
		class: 4,
		map: [3]
	},
	{
		img: '../image/创可贴.png',
		x: 1100,
		y: 700,
		w: 40,
		h: 40,
		isEat: false,
		class: 4,
		map: [3]
	}
]
// 初始化星星数据
var starArr = [{
		img: '../image/蓝星星.png',
		x: 666,
		y: 570,
		w: 30,
		h: 30,
		num: 1,
		isEat: false,
		map: [1]
	},
	{
		img: '../image/蓝星星.png',
		x: 261,
		y: 90,
		w: 40,
		h: 40,
		num: 1,
		isEat: false,
		map: [2]
	},
	{
		img: '../image/蓝星星.png',
		x: 498,
		y: 290,
		w: 40,
		h: 40,
		num: 1,
		isEat: false,
		map: [2]
	},
	{
		img: '../image/蓝星星.png',
		x: 261,
		y: 150,
		w: 30,
		h: 30,
		num: 1,
		isEat: false,
		map: [3]
	},
	{
		img: '../image/红星星.png',
		x: 30,
		y: 435,
		w: 30,
		h: 30,
		num: 2,
		isEat: false,
		map: [3]
	},
	{
		img: '../image/红星星.png',
		x: 367,
		y: 435,
		w: 40,
		h: 40,
		num: 2,
		isEat: false,
		map: [2]
	},
	{
		img: '../image/绿星星.png',
		x: 500,
		y: 710,
		w: 30,
		h: 30,
		num: 3,
		isEat: false,
		map: [3]
	},
	{
		img: '../image/绿星星.png',
		x: 261,
		y: 130,
		w: 30,
		h: 30,
		num: 3,
		isEat: false,
		map: [1]
	},
	{
		img: '../image/红星星.png',
		x: 450,
		y: 377,
		w: 30,
		h: 30,
		num: 2,
		isEat: false,
		map: [3]
	},
	{
		img: '../image/灰星星.png',
		x: 870,
		y: 570,
		w: 30,
		h: 30,
		num: 4,
		isEat: false,
		map: [3]
	},
	{
		img: '../image/灰星星.png',
		x: 850,
		y: 320,
		w: 30,
		h: 30,
		num: 4,
		isEat: false,
		map: [3]
	},
	{
		img: '../image/蓝星星.png',
		x: 1060,
		y: 200,
		w: 30,
		h: 30,
		num: 1,
		isEat: false,
		map: [3]
	}
]
let guaiwu = [
	{
		img: '../image/蓝星星.png',
		x: 0,
		y: 50,
		w: 30,
		h: 30,
		map: [1]
	},
	{
		img: '../image/蓝星星.png',
		x: 965,
		y: 210,
		w: 30,
		h: 30,
		map: [1]
	},
	
]
var gwObj = [{
	img: '../image/怪物.png',
	x: 0,
	y: 50,
	w: 30,
	h: 30,
	map: [1],
	direct:1,
	rang:[50,350],
	dz: false
},
{
	img: '../image/怪物.png',
	x: 965,
	y: 210,
	w: 30,
	h: 30,
	map: [1],
	direct:1,
	rang:[210,510],
	dz: false
},
{
	
	img: '../image/怪物.png',
	x: 332,
	y: 164,
	w: 30,
	h: 30,
	map: [2],
	direct:1,
	rang:[164,514],
	dz: false
	
},
{
	img: '../image/怪物.png',
	x: 410,
	y: 645,
	w: 20,
	h: 20,
	map: [2],
	direct:1,
	rang:[350,650],
	dz: false
	
},
{
	img: '../image/怪物.png',
	x: 510,
	y: 230,
	w: 20,
	h: 20,
	map: [3],
	direct:2,
	rang:[210,510],
	dz: false
},

{
	img: '../image/怪物.png',
	x: 453,
	y: 452,
	w: 20,
	h: 20,
	map: [3],
	direct:2,
	rang:[453,703],
	dz: false
},
{
	img: '../image/怪物.png',
	x: 1144,
	y: 250,
	w: 20,
	h: 20,
	map: [3],
	direct:2,
	rang:[1144,1344],
	dz: false
}]
