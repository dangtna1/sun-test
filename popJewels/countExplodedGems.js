/**
 * @param {number[][]} gems
 * @param {number[]} hits
 * @return {number}
 */
function countExplodedGems(gems, hits) {

	// this method takes to much time
	// let count = 0;
	// let queue = [];
	// for (let i = 0; i < hits.length; i++) {
	// 	const hit = hits[i];
	// 	for (let j = 0; j < gems.length; j++) {
	// 		const gem = gems[j];
	// 		if (hit[0] === gem[0] && hit[1] === gem[1]) {
	// 			queue.push(gem);
	// 		}
	// 	}
	// 	while (queue.length > 0) {
	// 		const [x, y, color] = queue.shift();
	// 		count++; //itself
	// 		for (let j = 0; j < gems.length; j++) {
	// 			const gem = gems[j];
	// 			if (gem[0] === x && gem[1] === y + 1 && gem[2] === color) { //top
	// 				queue.push(gem);
	// 			}
	// 			if (gem[0] === x && gem[1] === y - 1 && gem[2] === color) { //bottom
	// 				queue.push(gem);
	// 			}
	// 			if (gem[0] === x + 1 && gem[1] === y && gem[2] === color) { //right
	// 				queue.push(gem);
	// 			}
	// 			if (gem[0] === x - 1 && gem[1] === y && gem[2] === color) { //left
	// 				queue.push(gem);
	// 			}
	// 		}
	// 	}
	// }
	// return count;

	let count = 0;
	const queue = []
	const rows = 10;
	const cols = 10;
	const colorArr = new Array(rows);
	for (let i = 0; i < rows; i++) {
		colorArr[i] = new Array(cols).fill(0);
	}

	for (let j = 0; j < gems.length; j++) {
		const gem = gems[j];
		colorArr[gem[0]][gem[1]] = gem[2];
	}


	console.log(colorArr);

	for (let i = 0; i < hits.length; i++) {
		const hit = hits[i];
		let color = colorArr[hit[0]][hit[1]]
		queue.push([hit[0], hit[1]]); //push point

		while (queue.length > 0) {
			const [x, y] = queue.shift();
			//set it color to 0
			colorArr[x][y] = 0;
			// console.log(x)
			// console.log(y)
			count++; //itself
			if (colorArr[x][y+1] === color) { //right
				queue.push([x, y+1]);
			}
			else if (colorArr[x][y-1] === color) { //left
				queue.push([x, y-1]);
			}
			else if (colorArr[x+1][y] === color) { //bottom
				queue.push([x+1, y]);
			}
			else if (colorArr[x-1][y] === color) { //top
				queue.push([x-1, y]);
			}
		}
	}
	return count;
};

console.log(countExplodedGems(
	[[1, 2, 1], [1, 3, 1], [1, 4, 1], [1, 5, 1], [1, 6, 1], [1, 7, 1], [2, 2, 1], [2, 3, 2], [2, 4, 2], [2, 5, 2], [2, 6, 2], [2, 7, 1], [3, 2, 1], [3, 3, 2], [3, 4, 1], [3, 5, 1], [3, 6, 2], [3, 7, 1], [4, 2, 1], [4, 3, 2], [4, 4, 1], [4, 5, 1], [4, 6, 2], [4, 7, 1], [5, 2, 1], [5, 3, 2], [5, 4, 2], [5, 5, 2], [5, 6, 2], [5, 7, 1], [6, 2, 1], [6, 3, 1], [6, 4, 1], [6, 5, 1], [6, 6, 1], [6, 7, 1]],
	[[3, 4]])
)