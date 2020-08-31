import con from './db';

export const getShoes = async (values) => {
	try {
		console.log(values.id);
		const shoes = await con.execute(`CALL sp_show_shoes(${values.id})`);
		const result = shoes.flat();

		return result[0];
	} catch (error) {
		console.error(error);
	}
};

export const getbelt = async (values) => {
	try {
		const belt = await con.execute(`CALL sp_show_belt(${values.id})`);
		const result = belt.flat();

		return result[0];
	} catch (error) {
		console.error(error);
	}
};

export const addshoes = async (values) => {
	try {
		const query =
			`CALL sp_add_shoes("${values.s_name}",` +
			`"${values.s_type}",` +
			`"${values.size}",` +
			`"${values.color}",` +
			`"${values.price}",` +
			`${values.bid},` +
			`"${values.is_special}",` +
			`"${values.available}",` +
			`"${values.total_quantity}")`;

		await con.execute(query);
		// console.log(query);
	} catch (error) {
		console.error(error);
	}
};

export const addbelt = async (values) => {
	try {
		console.log(`values`, values);
		const query =
			`CALL sp_add_belt("${values.b_name}",` +
			`"${values.b_type}",` +
			`"${values.size}",` +
			`"${values.color}",` +
			`"${values.price}",` +
			`"${values.buckle_type}",` +
			`"${values.available}",` +
			`"${values.total_quantity}")`;

		await con.execute(query);
		// console.log(query);
	} catch (error) {
		console.error(error);
	}
};

export const findshoes = async (values) => {
	try {
		const query = `CALL sp_find_shoes("${values.keyword}")`;
		let result = await con.execute(query);
		result = result.flat();
		return result[0];
	} catch (error) {
		console.error(error);
	}
};

export const findbelt = async (values) => {
	try {
		const query = `CALL sp_find_belt("${values.keyword}")`;
		let result = await con.execute(query);
		result = result.flat();
		return result[0];
	} catch (error) {
		console.error(error);
	}
};

export const purchaseshoes = async (values) => {
	try {
		const query = `CALL sp_purchase_shoes("${values.id}", "${values.quantity}")`;
		let result = await con.execute(query);

		// console.log(query);
	} catch (error) {
		console.error(error);
	}
};

export const purchasebelt = async (values) => {
	try {
		const query = `CALL sp_purchase_belt("${values.id}", "${values.quantity}")`;
		let result = await con.execute(query);

		// console.log(query);
	} catch (error) {
		console.error(error);
	}
};

export const updatebelt = async (values) => {
	try {
		const query =
			`CALL sp_update_belt(` +
			`"${values.id}",` +
			`"${values.b_name}",` +
			`"${values.b_type}",` +
			`"${values.size}",` +
			`"${values.color}",` +
			`"${values.buckle_type}",` +
			`"${values.price}",` +
			`"${values.available}",` +
			`"${values.total_quantity}")`;
		let result = await con.execute(query);
	} catch (error) {
		console.error(error);
	}
};

export const updateshoes = async (values) => {
	try {
		const query =
			`CALL sp_update_shoes(` +
			`"${values.id}",` +
			`"${values.s_name}",` +
			`"${values.s_type}",` +
			`"${values.size}",` +
			`"${values.color}",` +
			`"${values.price}",` +
			`${values.bid},` +
			`"${values.is_special}",` +
			`"${values.available}",` +
			`"${values.total_quantity}")`;
		let result = await con.execute(query);
	} catch (error) {
		console.error(error);
	}
};

export const deleteshoes = async (values) => {
	try {
		const query = `CALL sp_delete_shoes("${values.id}")`;
		let result = await con.execute(query);
	} catch (error) {
		console.error(error);
	}
};

export const deletebelt = async (values) => {
	try {
		const query = `CALL sp_delete_belt("${values.id}")`;
		let result = await con.execute(query);
	} catch (error) {
		console.error(error);
	}
};
