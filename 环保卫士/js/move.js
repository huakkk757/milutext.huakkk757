function keydown() {
    window.onkeydown = function(e) {
        switch (e.keyCode) {
            case 87:
            case 38: // up 
                up = true
                break
            case 83:
            case 40: //down
                down = true
                break
            case 65:
            case 37: //left
                left = true
                break
            case 68:
            case 39: //rigth
                right = true
        }
    }
}

function keyup() {
    window.onkeyup = function(e) {
        switch (e.keyCode) {
            case 87:
            case 38: // up 
                up = false
                break
            case 83:
            case 40: //down
                down = false
                break
            case 65:
            case 37: //left
                left = false
                break
            case 68:
            case 39: //rigth
                right = false
        }
    }
}

function move() {
    createBg()
    if (timer !== null) return
    timer = setInterval(() => {
		console.log("isGame:"+isGameEnd(rubbishArr),"map:"+currentMap,'isdie:'+isdie)
        if (isGameEnd(rubbishArr) && currentMap === 2 && isdie==0) {
			console.log('跳到第二关')
			gwImgObj.clear()
            currentMap = 3
			setLocalStore(currentMap)
            createGuanka(0, 0, currentMap - 1)
        }
        if (isGameEnd(rubbishArr) && currentMap === 3 && isdie==0) {
			gwImgObj.clear()
            currentMap = 4
			setLocalStore(currentMap)
            createGuanka(0, 50, currentMap - 1)
        }
		if(isGameEnd()&&isdie==1){
			gwImgObj.clear()
			currentMap=6
			ctx.clearRect(0, 0, w, h)
			img.src = "../image/游戏失败.jpg";
		}
        if (isGameEnd(rubbishArr) && currentMap === 4 && isdie==0) {
			gwImgObj.clear()
            currentMap = 5
            ctx.clearRect(0, 0, w, h)
            img.src = "../image/游戏成功.jpg";
        }
		
        if(currentMap === 6||currentMap === 5) return
		gwMove()
        if (left) {
            leaderObj.x = leaderObj.x - b
            createBg()
        }
        if (up) {
            leaderObj.y = leaderObj.y - b
            createBg()
        }
        if (right) {
            leaderObj.x = leaderObj.x + b
            createBg()
        }
        if (down) {
            leaderObj.y = leaderObj.y + b
            createBg()
        }
    }, 1000/60)
    keydown()
    keyup()
}