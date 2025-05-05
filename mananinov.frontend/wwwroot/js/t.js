fetch('http://localhost:5030/anime/getRandomAnime')
.then(response => response.json())
.then(data => {
    console.log(data)
})
.catch(err => console.log(err))