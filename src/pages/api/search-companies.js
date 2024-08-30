

import axios from 'axios';

const API_KEY = process.env.RAPIDAPI_KEY;
const API_HOST = 'linkedin-data-scraper.p.rapidapi.com';
const API_BASE_URL = 'https://linkedin-data-scraper.p.rapidapi.com';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { query } = req.query;

    try {
      const response = await axios.get(`${API_BASE_URL}/suggestion_company`, {
        params: { query },
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': API_HOST,
        },
      });

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}