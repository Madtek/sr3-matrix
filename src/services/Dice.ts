
export class Dice {

	/**
	 * @return Sum of roll
	 * @param dice dice value
	 * @param count how many dice
	 */
	public static roll(dice:number, count:number = 1):number {
		let res = 0;

		for(let i = 1; i <= count; i++) {
		    res = res + Math.ceil(Math.random() * dice);
		}

		// console.log("Roll:" + count + "W" + dice + "=" + res);
		return res;
	}

	/**
	 *
	 * @return Success count (compund / exploding dice)
	 * @param count How many dice
	 * @param tn Whats the targetNumber (compund / exploding dice)
	 */
	public static d6(count:number = 1, tn:number = 1):number {
		let successCount = 0;

		for(let i = 1; i <= count; i++) {
			let res: number = 6;
			let resSum: number = 0;

			while(res === 6) {
				res = Math.ceil(Math.random() * 6);
				resSum = resSum + res;
			}

			if(resSum >= tn) {
				successCount++;
			}
		}

		// console.log("Roll:" + count + "W" + dice + "=" + res);
		return successCount;
	}

	/**
	 * @return one D6 result compunded
	 */
	public static d6Result():number {
		let res: number;
		let resSum: number = 0;

		do {
			res = Math.ceil(Math.random() * 6);
			resSum = resSum + res;
		} while(res === 6);

		return resSum;
	}
}
