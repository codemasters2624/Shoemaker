import mysql from 'mysql2/promise';

let con = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'shoemaker',
});

module.exports = con;
