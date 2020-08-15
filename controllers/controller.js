import con from '../database/db';

export const showShoes = async (req, res) => {
	try {
		let result = await con.execute(`CALL sp_show_shoes()`);
		result = result.flat();
		console.log(`result`, result[0]);
		res.json({
			msg: result[0],
		});
	} catch (error) {
		console.error(error);
		res.json({
			msg: 'Error!',
		});
	}
};

export const showBelt = async (req, res) => {
	try {
		let result = await con.execute(`CALL sp_show_shoes()`);
		result = result.flat();
		console.log(`result`, result[0]);
		res.json({
			msg: result[0],
		});
	} catch (error) {
		console.error(error);
		res.json({
			msg: 'Error!',
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
		if (bid !== null) {
			bid = bid.trim();
		}

		if (is_special === 'Y' && (bid === 'null' || bid === '' || bid === null)) {
			res.json({
				response_code: '1001',
				response_message:
					'Cannot store special shoes without corresponding belt',
			});
		} else {
			console.log(
				s_name,
				s_type,
				size,
				color,
				price,
				bid,
				is_special,
				available,
				total_quantity
			);

			let addShoes = await con.execute(
				`Call sp_add_shoes(${s_name},${s_type},${size},${color},${price},${bid},${is_special},${available},${total_quantity})`
			);
			res.json({
				msg: 'addInventory',
			});
		}
	} catch (error) {
		console.error(error);
	}
};