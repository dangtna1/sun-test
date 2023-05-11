function pickUpSticks(n) {
	if (n === 1) return 1;
	if (n === 2) return 2;
	if (n === 3) return 4;
	return pickUpSticks(n-1) + pickUpSticks(n-2) + pickUpSticks(n-3);
}

console.log(pickUpSticks(6))