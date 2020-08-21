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
	updateShoes,
	updateBelt,
	deleteShoes,
	deleteBelt,
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

router.post('/update_shoes/:id', updateShoes);

router.post('/update_belt/:id', updateBelt);

router.delete('/delete_shoes/:id', deleteShoes);

router.delete('/delete_belt/:id', deleteBelt);

export default router;
