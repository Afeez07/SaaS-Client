import fs from 'fs';

async function getSite() {
  const SITE_ID = '73f2194b-a53a-4a6e-9b23-89df8509672c';
  const TOKEN = 'nfp_tcM8APzngZjMcNe1DQqaty44oXPJgbdN5255';
  
  const getRes = await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}`, {
    headers: {
      'Authorization': `Bearer ${TOKEN}`
    }
  });
  
  const site = await getRes.json();
  console.log('Site build_settings:', JSON.stringify(site.build_settings, null, 2));
}

getSite().catch(console.error);
