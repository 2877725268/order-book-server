import express, { Request, Response } from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();

app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.COZE_SUPABASE_URL || '';
const supabaseKey = process.env.COZE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: '订单记账系统 API' });
});

app.get('/api/orders', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ status: 'ok', data });
  } catch (e: any) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

app.post('/api/orders', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('orders').insert([req.body]).select();
    if (error) throw error;
    res.json({ status: 'ok', data: data?.[0] });
  } catch (e: any) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

app.delete('/api/orders/:id', async (req: Request, res: Response) => {
  try {
    const { error } = await supabase.from('orders').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ status: 'ok' });
  } catch (e: any) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
