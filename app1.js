app.post('/api/oo', (req, res) => {
  const { 会議 , 人間ぶっ殺しゾーン } = req.body;
  const newItem = { 会議, 人間ぶっ殺しゾーン };
  console.log(newItem);   
  res.json(newItem);
});