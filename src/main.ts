import 'reflect-metadata';
import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: '订单记账系统 API' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
