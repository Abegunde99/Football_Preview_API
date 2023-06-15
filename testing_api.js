const axios = require('axios');

async function fetchData() {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
        params: {
            league: '39',
            season: '2022'
        },
        headers: {
            'X-RapidAPI-Key': '2d1ad640e2msh3fbd65472051ab5p16e975jsnfd393ea1d038',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const result = response.data

        //get first fixture
        const firstFixture = result.response[0];
        console.log(firstFixture);

        //get last fixture
        const lastFixture = result.response[result.response.length - 1];
        console.log(lastFixture);
        
    } catch (error) {
        console.error(error);
    }
}

fetchData();