import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { action, companyName, urn } = req.body;

  const rapidApiKey = b13fcb51c1msh5d74c8d142567a3p1711c6jsn9e0df340f456
  const rapidApiHost = 'linkedin-data-scraper.p.rapidapi.com'

  try {
    let response;
    if (action === 'search') {
      response = await axios.request({
        method: 'GET',
        url: 'https://linkedin-data-scraper.p.rapidapi.com/suggestion_company',
        params: { query: companyName },
        headers: {
          'x-rapidapi-key': rapidApiKey,
          'x-rapidapi-host': rapidApiHost
        }
      });
    } else if (action === 'details') {
      response = await axios.request({
        method: 'POST',
        url: 'https://linkedin-data-scraper.p.rapidapi.com/company',
        headers: {
          'x-rapidapi-key': rapidApiKey,
          'x-rapidapi-host': rapidApiHost,
          'Content-Type': 'application/json'
        },
        data: {
          link: `http://www.linkedin.com/company/${urn}`
        }
      });
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching data.' });
  }
}
