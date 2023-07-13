const axios = require('axios');

//load env vars
require('dotenv').config();


const year = new Date().getFullYear();
let month = new Date().getMonth();
month += 1;

let season;

if (month > 7 || month === 7) {
    season = `${year}`
} else {
    season = `${year - 1}`
}

const leagueIds = ['39', '40', '41', '42'];

const url1 = 'https://api-football-v1.p.rapidapi.com/v3';

const fetchResult = async (Id, season, model) => {
    try {
        const options = {
            method: 'GET',
            url: `${url1}/${model}`,
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

// const leagueIdForV2 = [4335,4365, 4368,4369]
//5342-championship, 5295- league 2, 5267-epl



//get current round of fixtures
async function fetchCurrentRoundForPL() { 
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds',
        params: {
          league: '39',
          season: season,
          current: 'true'
        },
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          return response.data.response[0];
      } catch (error) {
          console.error(error);
      }
}//get current round of fixtures
async function fetchCurrentRoundForChamp() { 
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds',
        params: {
          league: '40',
          season: season,
          current: 'true'
        },
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          return response.data.response[0];
      } catch (error) {
          console.error(error);
      }
}//get current round of fixtures
async function fetchCurrentRoundForL1() { 
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds',
        params: {
          league: '41',
          season: season,
          current: 'true'
        },
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          return response.data.response[0];
      } catch (error) {
          console.error(error);
      }
}//get current round of fixtures
async function fetchCurrentRoundForL2() { 
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds',
        params: {
          league: '42',
          season: season,
          current: 'true'
        },
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          return response.data.response[0];
      } catch (error) {
          console.error(error);
      }
}

//get current round for premier league
async function fetchCurrentRounds() {
    let currentRound;

    let premierLeague = await fetchCurrentRoundForPL();
    let championship = await fetchCurrentRoundForChamp();
    let leagueOne = await fetchCurrentRoundForL1();
    let leagueTwo = await fetchCurrentRoundForL2();

    if (!championship.startsWith('Regular Season')) { 
        championship = 'Regular Season - 46';
    }
    if (!leagueOne.startsWith('Regular Season')) { 
        leagueOne = 'Regular Season - 46';
    }
    if (!leagueTwo.startsWith('Regular Season')) {
        leagueTwo = 'Regular Season - 46';
    }

    currentRound = [{
            league: 'premier league',
            currentRound: premierLeague
        },
        {
            league: 'championship',
            currentRound: championship
        },
        {
            league: 'league one',
            currentRound: leagueOne
        },
        {
            league: 'league two',
            currentRound: leagueTwo
        }
    ]
    return currentRound;
}





module.exports = {fetchStandings, fetchFixtures, fetchCurrentRounds};
