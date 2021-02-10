
export class Core {

	public static rollDice(dice:number, count:number = 1):number {
		let res = 0;

		for(let i = 1; i <= count; i++) {
		    res += Math.ceil(Math.random() * dice);
		}

		// console.log("Roll:" + count + "W" + dice + "=" + res);
		return res;
	}

}
