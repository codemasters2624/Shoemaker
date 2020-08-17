import express from 'express';
import {
	showShoes,
	showBoots,
	addShoes,
	searchItem,
} from '../controllers/controller';

const router = express.Router();

//To show Shoes
router.get('/show_shoes', showShoes);

//To show Belt
// router.get('/show_belt', showBelt);

//To add shoes to inventory
router.post('/add_shoes', addShoes);

// //To add Belt to inventory
// router.post('/add_belt', addBelt);

router.get('/search_item', searchItem);
export default router;
