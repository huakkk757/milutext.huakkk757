//生成画布上的垃圾图片
function createGarbag(address, x, y, w, h) {
	let key = address+x
	let key2 = address+y
	let img = new Image()
	img.src = address
	gwImgObj.set(key, img)
	gwImgObj.set(key2, img)
	img.onload = function() {
		ctx.drawImage(img, x, y, w, h)
	}
}

//绘制关卡图形
function createStage(array, color, size) {
	ctx.fillStyle = color;
	for (let i = 0; i < array.length; i++) {
		var Array = array[i].split(",");
		ctx.fillRect(Array[0] * size, Array[1] * size, Array[2] * size, Array[3] * size);
	}
}

function createBg() {
	panduan()
	ctx.clearRect(leaderObj.x - 3.9, leaderObj.y - 3.8, leaderObj.w + 8, leaderObj.h + 7.5)
	ctx.drawImage(leader, leaderObj.x, leaderObj.y, leaderObj.w, leaderObj.h)
	createStage(gameLeave[currentMap - 2], '#01a29c', current)
}

function panduan() {
	if (currentMap == 6 || currentMap == 5) {
		return
	}
	//判断与地图边界碰撞
	if (leaderObj.x > 1366 - leaderObj.w) {
		leaderObj.x = 1366 - leaderObj.w
	}
	if (leaderObj.x < 0) {
		leaderObj.x = 0
	}
	if (leaderObj.y > 768 - leaderObj.h) {
		leaderObj.y = 768 - leaderObj.h
	}
	if (leaderObj.y < 0) {
		leaderObj.y = 0
	}
	//判断与垃圾碰撞 通过两次for循环找出当前关卡需要的垃圾并设置碰撞
	for (let i = 0; i < rubbishArr.length; i++) {
		for (let j = 0; j < rubbishArr[i].map.length; j++) {
			if (rubbishArr[i].map[j] === currentMap - 1 && rubbishArr[i].isEat === false) {
				if (collision(leaderObj, rubbishArr[i])) {
					if ((rubbishArr[i].class == 2 && leaderObj.state == 0) ||
						(rubbishArr[i].class == 1 && leaderObj.state == 1) ||
						(rubbishArr[i].class == 3 && leaderObj.state == 2) ||
						(rubbishArr[i].class == 4 && leaderObj.state == 4)
					) {
						rubbishArr[i].isEat = true
						ctx.clearRect(rubbishArr[i].x - 2, rubbishArr[i].y - 2, rubbishArr[i].w + 2, rubbishArr[i].h +
							2)
						return
					} else {
						back()
					}
				}
			}
		}
	}
	//判断与星星碰撞
	for (let i = 0; i < starArr.length; i++) {
		for (let j = 0; j < starArr[i].map.length; j++) {
			if (starArr[i].map[j] === currentMap - 1 && starArr[i].isEat === false) {
				if (collision(leaderObj, starArr[i])) {
					starArr[i].isEat = true
					if (starArr[i].num === 1) {
						leaderObj.img = '../image/可回收物.png'
						leaderObj.state = 0
					} else if (starArr[i].num === 2) {
						leaderObj.img = '../image/有害垃圾2.png'
						leaderObj.state = 2
					} else if (starArr[i].num === 3) {
						leaderObj.img = '../image/厨余垃圾.png'
						leaderObj.state = 1
					} else if (starArr[i].num === 4) {
						leaderObj.img = '../image/其他垃圾.png'
						leaderObj.state = 4
					}
					drawLeader()
					ctx.clearRect(starArr[i].x, starArr[i].y, starArr[i].w, starArr[i].h)
				}
			}

		}

	}


	//判断与方块的碰撞
	if (currentMap == 2 || currentMap == 3 || currentMap == 4) {
		for (var i = 0; i < gameLeave[currentMap - 2].length; i++) {
			let Array = gameLeave[currentMap - 2][i].split(",")
			let obj = {
				x: parseInt(Array[0]),
				y: parseInt(Array[1]),
				w: parseInt(Array[2]),
				h: parseInt(Array[3])
			}
			if (collision(leaderObj, obj)) {
				notify("碰撞了")
				back()
				return
			}
		}
	}


}
// 判断游戏是否结束
function isGameEnd(arr) {
	//与怪物碰撞
	for (let i = 0; i < gwObj.length; i++) {
		for (let j = 0; j < gwObj[i].map.length; j++) {
			if (gwObj[i].map[j] === currentMap - 1) {
				if (collision(leaderObj, gwObj[i])) {
					isdie=1
					return true
				}
			}

		}

	}
	if (arr) {
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0; j < arr[i].map.length; j++) {
				if (arr[i].map[j] === currentMap - 1) {
					currentRubbishNum.pushNoRepeat(arr[i])
					if (arr[i].isEat) {
						eatRubbishNum.pushNoRepeat(arr[i])
					}
					if (currentRubbishNum.length === eatRubbishNum.length) {
						return true
					}
				}

			}

		}
	}

	return false
}
//碰撞后后移
function back() {
	if (left) {
		leaderObj.x = leaderObj.x + b
	}
	if (up) {
		leaderObj.y = leaderObj.y + b
	}
	if (right) {
		leaderObj.x = leaderObj.x - b
	}
	if (down) {
		leaderObj.y = leaderObj.y - b
	}
}
// 传入两个对象，判断两个对象是否碰撞
function collision(box, box2) {
	if ((box2.x + box2.w - box.x <= box.w + box2.w) && (box2.x + box2.w - box.x >= 0) &&
		(box2.y + box2.h - box.y <= box.h + box2.h) && box2.y + box2.h - box.y >= 0) {
		return true
	}
	return false
}

//怪物移动
function gwMove() {
	for (let i = 0; i < gwObj.length; i++) {
		for (let j = 0; j < gwObj[i].map.length; j++) {
			if (currentMap - 1 === gwObj[i].map[j]) {
				let n = 2
				if (gwObj[i].direct === 1) {
					ctx.clearRect(gwObj[i].x, gwObj[i].y - 5, gwObj[i].w + 5, gwObj[i].h + 10)
					if (gwObj[i].y >= gwObj[i].rang[1]) {
						gwObj[i].dz = true
					} else if (gwObj[i].y <= gwObj[i].rang[0]) {
						gwObj[i].dz = false
					}
					if (!gwObj[i].dz) {
						gwObj[i].y = gwObj[i].y + n
					} else {
						gwObj[i].y = gwObj[i].y - n
					}
					
				}
				if (gwObj[i].direct === 2) {
					ctx.clearRect(gwObj[i].x, gwObj[i].y - 5, gwObj[i].w + 5, gwObj[i].h + 10)
					if (gwObj[i].x >= gwObj[i].rang[1]) {
						gwObj[i].dz = true
					} else if (gwObj[i].x <= gwObj[i].rang[0]) {
						gwObj[i].dz = false
					}
					if (!gwObj[i].dz) {
						gwObj[i].x = gwObj[i].x + n
					} else {
						gwObj[i].x = gwObj[i].x - n
					}
				}
				let key = gwObj[i].img+gwObj[i].x+''
				let key2 = gwObj[i].img+gwObj[i].y+''
				let obj = gwImgObj.get(key) ? gwImgObj.get(key) : gwImgObj.get(key2)
			
				ctx.drawImage(obj, gwObj[i].x, gwObj[i].y, gwObj[i].w, gwObj[i].h)
			}
		}

	}
}
