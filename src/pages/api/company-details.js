
import axios from 'axios';

const API_KEY = process.env.RAPIDAPI_KEY;
const API_HOST = 'linkedin-data-scraper.p.rapidapi.com';
const API_BASE_URL = 'https://linkedin-data-scraper.p.rapidapi.com';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { urn } = req.body;

    try {
      const response = await axios.post(`${API_BASE_URL}/company`, {
        link: `http://www.linkedin.com/company/${urn}`,
      }, {
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': API_HOST,
          'Content-Type': 'application/json',
        },
      });

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching company details' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}