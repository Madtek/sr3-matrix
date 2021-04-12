
export class Core {

	public static rollDice(dice:number, count:number = 1):number {
		let res = 0;

		for(let i = 1; i <= count; i++) {
		    res += Math.ceil(Math.random() * dice);
		}

		// console.log("Roll:" + count + "W" + dice + "=" + res);
		return res;
	}

	/**
	 *
	 * @return Success count
	 * @param count How many dice
	 * @param tn Whats the targetNumber (compund / exploding dice)
	 */
	public static d6(count:number = 1, tn:number = 1):number {
		let successCount = 0;

		for(let i = 1; i <= count; i++) {
			let res: number = 6;
			let resSum: number = 0;

			while(res == 6) {
				res = Math.ceil(Math.random() * 6);
				resSum =+ res;
			}

			if(resSum >= tn) {
				successCount++;
			}
		}

		// console.log("Roll:" + count + "W" + dice + "=" + res);
		return successCount;
	}
}
