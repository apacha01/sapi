const notFound = (req, res) => {
	res.status(404).json({ error: 404, message: 'Not Found' });
};

export { notFound };
export default { notFound };