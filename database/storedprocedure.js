import con from './db';

export const getShoes = async () => {
	try {
		const shoes = await con.execute('CALL sp_show_shoes()');
		const result = shoes.flat();

		return result[0];
	} catch (error) {
		console.error(error);
	}
};

export const addshoes = async (values) => {
	try {
        
		return values;
	} catch (error) {
		console.error(error);
	}
};
