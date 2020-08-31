import {
	getShoes,
	getbelt,
	addshoes,
	addbelt,
	findshoes,
	findbelt,
	purchaseshoes,
	purchasebelt,
	updateshoes,
	updatebelt,
	deleteshoes,
	deletebelt,
} from '../database/storedprocedure';

import axios from 'axios';

export const showShoes = async (req, res) => {
	try {
		const { id } = req.query;
		let result = await getShoes({
			id: id ? id : null,
		});
		res.json({
			response_code: '0000',
			response_message: result,
		});
	} catch (error) {
		console.error(error);
		res.json({
			response_code: '9999',
			response_message: 'Error!',
		});
	}
};

export const showBelt = async (req, res) => {
	try {
		const { id } = req.query;
		let result = await getbelt({
			id: id ? id : null,
		});
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
				response_message: 'Shoes added Successfully',
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

		res.json({
			response_code: '0000',
			response_message: 'Belt Added Successfully',
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
		if (id === null || id === undefined || id === '') {
			res.json({
				response_code: '1020',
				response_message: 'Id cannot be null',
			});
		} else if (quantity === null || quantity === undefined || quantity === '') {
			res.json({
				response_code: '1020',
				response_message: 'Quantity cannot be null',
			});
		}

		console.log(`id`, id, `quantity`, quantity);
		const check = await getShoes({ id: id });
		console.log(`check`, check);
		if (check == '' || check == undefined || check == null) {
			res.json({
				response_code: '1003',
				response_message: 'Item not found!',
			});
		} else {
			if (quantity > check[0].available) {
				res.json({
					response_code: '1002',
					response_message: 'Required Amount exceeds avaiable stock.',
				});
			} else {
				let remains = check[0].available - quantity;
				if (check[0].is_special === 'Y') {
					let bid = check[0].bid;
					console.log(`remains`, remains, `bid`, bid);
					console.log(
						`http://localhost:5000/purchase_belt?bid=${bid}&quantity=${quantity}`
					);
					const { data: data } = await axios.get(
						`http://localhost:5000/purchase_belt?id=${bid}&quantity=${quantity}`
					);

					console.log(`response_message`, data);
					await purchaseshoes({ id, quantity });
					await res.json({
						response_code: '0000',
						response_message: 'Purchase Successful',
					});
				} else {
					console.log(`quantity`, quantity);
					await purchaseshoes({ id, quantity });
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
		if (id === null || id === undefined || id === '') {
			res.json({
				response_code: '1234',
				response_message: 'ID cannot be null',
			});
		} else if (id === null || id === undefined || id === '') {
			res.json({
				response_code: '1320',
				response_message: 'Quantity cannot be null',
			});
		}
		const check = await getbelt({ id });
		console.log(`id`, id, `quantity`, quantity);
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
				console.log(`Remaining Belts`, remains);
				await purchasebelt({ id, quantity });
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

export const updateBelt = async (req, res) => {
	try {
		let {
			b_name,
			b_type,
			size,
			color,
			price,
			buckle_type,
			available,
			total_quantity,
		} = req.body;

		let id = req.params.id;

		let shoes = await getbelt({ id });
		if (shoes == '' || shoes == undefined || shoes == null) {
			res.json({
				response_code: '1004',
				response_message: 'Item not found!',
			});
		} else {
			await updatebelt({
				id: id ? id : null,
				b_name: b_name ? b_name : null,
				b_type: b_type ? b_type : null,
				size: size ? size : null,
				color: color ? color : null,
				price: price ? price : null,
				buckle_type: buckle_type ? buckle_type : null,
				available: available ? available : null,
				total_quantity: total_quantity ? total_quantity : null,
			});
			res.json({
				response_code: '0000',
				response_message: 'Successfully Updated',
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

export const updateShoes = async (req, res) => {
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

		let id = req.params.id;
		console.log(`id`, id);
		let shoes = await getShoes({ id });
		if (shoes == '' || shoes == undefined || shoes == null) {
			res.json({
				response_code: '1004',
				response_message: 'Item not found!',
			});
		} else {
			await updateshoes({
				id: id ? id : null,
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
				response_message: 'Successfully Updated',
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

export const deleteShoes = async (req, res) => {
	try {
		let id = req.params.id;

		let shoes = await getShoes({ id });
		if (shoes == '' || shoes == undefined || shoes == null) {
			res.json({
				response_code: '1004',
				response_message: 'Item not found!',
			});
		} else {
			await deleteshoes({
				id: id ? id : null,
			});
			res.json({
				response_code: '0000',
				response_message: 'Successfully Deleted',
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

export const deleteBelt = async (req, res) => {
	try {
		let id = req.params.id;

		let shoes = await getbelt({ id });
		if (shoes == '' || shoes == undefined || shoes == null) {
			res.json({
				response_code: '1004',
				response_message: 'Item not found!',
			});
		} else {
			await deletebelt({
				id: id ? id : null,
			});
			res.json({
				response_code: '0000',
				response_message: 'Successfully Deleted',
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
