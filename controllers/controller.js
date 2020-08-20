import {
	getShoes,
	getbelt,
	addshoes,
	addbelt,
	findshoes,
	findbelt,
	purchaseshoes,
	purchasebelt,
} from '../database/storedprocedure';

export const showShoes = async (req, res) => {
	try {
		let result = await getShoes();
		res.json({
			response_code: '0000',
			response_message: result,
		});
	} catch (error) {
		console.error(error);
		res.json({
			response_code: '9999',
			respobse_message: 'Error!',
		});
	}
};

export const showBelt = async (req, res) => {
	try {
		let result = await getbelt();
		res.json({
			response_code: '0000',
			response_message: result,
		});
	} catch (error) {
		console.error(error);
		res.json({
			response_code: '9999',
			response_message: 'Something went wrong!',
		});
	}
};

export const addShoes = async (req, res) => {
	try {
		let {
			s_name,
			s_type,
			size,
			color,
			price,
			bid,
			is_special,
			available,
			total_quantity,
		} = req.body;
		if (bid !== undefined) {
			bid = bid.trim();
		}

		if (
			is_special === 'Y' &&
			(bid === 'null' || bid === '' || bid === undefined)
		) {
			res.json({
				response_code: '1001',
				response_message:
					'Cannot store special shoes without corresponding belt',
			});
		} else {
			let shoes = await addshoes({
				s_name: s_name ? s_name : null,
				s_type: s_type ? s_type : null,
				size: size ? size : null,
				color: color ? color : null,
				price: price ? price : null,
				bid: bid ? bid : null,
				is_special: is_special ? is_special : null,
				available: available ? available : null,
				total_quantity: total_quantity ? total_quantity : null,
			});
			res.json({
				response_code: '0000',
				response_message: shoes,
			});
		}
	} catch (error) {
		console.error(error);
		res.json({
			response_code: '9999',
			response_message: 'Something went wrong!',
		});
	}
};

export const addBelt = async (req, res) => {
	try {
		let {
			b_name,
			b_type,
			size,
			color,
			price,
			buckle_type,
			total_quantity,
			available,
		} = req.body;

		let belt = await addbelt({
			b_name: b_name ? b_name : null,
			b_type: b_type ? b_type : null,
			size: size ? size : null,
			color: color ? color : null,
			price: price ? price : null,
			buckle_type: buckle_type ? buckle_type : null,
			available: available ? available : null,
			total_quantity: total_quantity ? total_quantity : null,
		});

		let newInv = await getbelt();
		res.json({
			response_code: '0000',
			response_message: newInv,
		});
	} catch (error) {
		console.error(error);
		res.json({
			response_code: '9999',
			response_message: 'Something went wrong!',
		});
	}
};

export const searchShoes = async (req, res) => {
	try {
		const { keyword: keyword } = req.query;
		const result = await findshoes({ keyword });

		res.json({
			response_code: '0000',
			response_message: result,
		});
	} catch (error) {
		console.error(error);
		res.json({
			response_code: '9999',
			response_message: 'Something went wrong!',
		});
	}
};

export const searchBelt = async (req, res) => {
	try {
		const { keyword: keyword } = req.query;
		const result = await findbelt({ keyword });

		res.json({
			response_code: '0000',
			response_message: result,
		});
	} catch (error) {
		console.error(error);
		res.json({
			response_code: '9999',
			response_message: 'Something went wrong!',
		});
	}
};

export const purchaseShoes = async (req, res) => {
	try {
		const { id: id, quantity: quantity } = req.query;
		const check = await getShoes({ id: id ? id : null });
		console.log(check);
		if (check == '' || check == undefined || check == null) {
			res.json({
				response_code: '1003',
				response_message: 'Item not found!',
			});
		} else {
			if (quantity > check[0].available) {
				res.json({
					response_code: '1002',
					response_message: 'Required Amount is exceeds avaiable stock.',
				});
			} else {
				let remains = check[0].available - quantity;
				if (check[0].is_special === 'Y') {
					let bid = check[0].bid;
					console.log(remains);
					await purchasebelt({ bid, quantity });
					await purchaseshoes({ id, remains });
					await res.json({
						response_code: '0000',
						response_message: 'Purchase successful.',
					});
				} else {
					console.log(remains);
					await purchaseshoes({ id, remains });
					res.json({
						response_code: '0000',
						response_message: 'Purchase successful.',
					});
				}
			}
		}
	} catch (error) {
		console.error(error);
		res.json({
			response_code: '9999',
			response_message: 'Something went wrong!',
		});
	}
};

export const purchaseBelt = async (req, res) => {
	try {
		const { id: id, quantity: quantity } = req.query;
		const check = await getbelt({ id: id ? id : null });
		console.log(check);
		console.log(check[0].available);
		if (check == '' || check == undefined || check == null) {
			res.json({
				response_code: '1003',
				response_message: 'Item not found!',
			});
		} else {
			if (quantity > check[0].available) {
				res.json({
					response_code: '1002',
					response_message: 'Required Amount is exceeds avaiable stock.',
				});
			} else {
				let remains = check[0].available - quantity;
				console.log(remains);
				await purchasebelt({ id, remains });
				res.json({
					response_code: '0000',
					response_message: 'Purchase successful.',
				});
			}
		}
	} catch (error) {
		console.error(error);
		res.json({
			response_code: '9999',
			response_message: 'Something went wrong!',
		});
	}
};
