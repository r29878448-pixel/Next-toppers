async function test() {
  const url = 'https://nt-spidyuniverse.onrender.com/api/batches/53';
  console.log(`Testing ${url}...`);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    console.log(`Status: ${res.status}`);
    const text = await res.text();
    console.log(`Response: ${text.substring(0, 200)}`);
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
}
test();
