document.getElementById('url-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const longUrl = document.getElementById('long-url').value;
    const shortUrl = generateShortUrl(longUrl); // Simulating a short URL generation

    document.getElementById('short-url').value = shortUrl;
    document.getElementById('short-url-container').classList.remove('hidden');
});

document.getElementById('copy-btn').addEventListener('click', function () {
    const shortUrlInput = document.getElementById('short-url');
    shortUrlInput.select();
    document.execCommand('copy');
    alert('Copied to clipboard!');
});

function generateShortUrl(url) {
    // Simulate a shortened URL (In reality, you'd replace this with actual logic)
    return 'http://short.url/' + btoa(url).substring(0, 6);
}
