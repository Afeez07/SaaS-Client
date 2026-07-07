import fs from 'fs';

async function updateSite() {
  const SITE_ID = '73f2194b-a53a-4a6e-9b23-89df8509672c';
  const TOKEN = 'nfp_tcM8APzngZjMcNe1DQqaty44oXPJgbdN5255';
  
  console.log('Fetching current site settings...');
  const getRes = await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}`, {
    headers: {
      'Authorization': `Bearer ${TOKEN}`
    }
  });
  
  const site = await getRes.json();
  console.log('Current build_settings:', JSON.stringify(site.build_settings, null, 2));

  console.log('\nUpdating build_settings to clear the publish directory...');
  const patchRes = await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      build_settings: {
        dir: ""
      }
    })
  });

  if (patchRes.ok) {
    const updatedSite = await patchRes.json();
    console.log('Success! Updated build_settings:', JSON.stringify(updatedSite.build_settings, null, 2));
  } else {
    console.error('Failed to update:', await patchRes.text());
  }
}

updateSite().catch(console.error);
