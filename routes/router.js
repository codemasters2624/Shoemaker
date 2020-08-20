import express from 'express';
import {
	showShoes,
	showBelt,
	addShoes,
	addBelt,
	searchShoes,
	searchBelt,
	purchaseShoes,
	purchaseBelt,
} from '../controllers/controller';

const router = express.Router();

//To show Shoes
router.get('/show_shoes', showShoes);

//To show Belt
router.get('/show_belt', showBelt);

//To add shoes to inventory
router.post('/add_shoes', addShoes);

//To add Belt to inventory
router.post('/add_belt', addBelt);

router.get('/search_shoes', searchShoes);

router.get('/search_belt', searchBelt);

router.get('/purchase_shoes', purchaseShoes);

router.get('/purchase_belt', purchaseBelt);

// router.get('/search_belt', searchBelt);
export default router;
