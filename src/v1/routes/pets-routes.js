import express from 'express';
const router = express.Router();

router
	.get('/', (req, res) => {
		res.send('Get all pets');
	})
	.get('/:petId', (req, res) => {
		res.send('Get a pet');
	})
	.post('/', (req, res) => {
		res.send('Create a new pet');
	})
	.patch('/:petId', (req, res) => {
		res.send('Update a pet');
	})
	.delete('/:petId', (req, res) => {
		res.send('Delete a pet');
	});

export { router };