document.getElementById('btn').addEventListener('click', async () => {
    const response = await fetch('/api/data');
    const data = await response.json();
    document.getElementById('output').innerText = data.message;
});

