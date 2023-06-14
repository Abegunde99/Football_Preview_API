const axios = require('axios');

//load env vars
require('dotenv').config({ path: './config/.env' });


const year = new Date().getFullYear();
const month = new Date().getMonth();

let season;

if (month > 7) {
    season = `${year}`
} else {
    season = `${year - 1}`
}

const leagueIds = ['39', '40', '41', '42'];

const url = 'https://api-football-v1.p.rapidapi.com/v3';

const fetchResult = async (Id, season, model) => {
    try {
        const options = {
            method: 'GET',
            url: `${url}/${model}`,
            params: {
                season: season,
                league: Id
            },
            headers: {
              'X-RapidAPI-Key': process.env.API_KEY,
              'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        };
    
        const response = await axios.request(options);
        return response.data.response;
    } catch (error) {
        console.error(error);
    }
};

async function fetchStandings() {
    const standings = [];
    for (const Id of leagueIds) { 
        const data = await fetchResult(Id, season, 'standings');
        const newData = data[0].league.standings[0];
        standings.push(...newData);
    }
    return standings;
}

async function fetchFixtures() { 
    const fixtures = [];
    for (const Id of leagueIds) { 
        const data = await fetchResult(Id, season, 'fixtures');
        fixtures.push(...data);
    }
    return fixtures;
}

module.exports = {fetchStandings, fetchFixtures};
