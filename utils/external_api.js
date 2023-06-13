// const axios = require('axios');

// const options = {
//     method: 'GET',
//     url: 'https://flashlive-sports.p.rapidapi.com/v1/tournaments/standings',
//     params: {
//         locale: 'en_INT',
//         tournament_stage_id: '6kJqdMr2',
//         standing_type: 'overall',
//         tournament_season_id: 'nmP0jyrt'
//     },
//     headers: {
//         'X-RapidAPI-Key': '2d1ad640e2msh3fbd65472051ab5p16e975jsnfd393ea1d038',
//         'X-RapidAPI-Host': 'flashlive-sports.p.rapidapi.com'
//       }
// }

// exports.fetchData = async () => {
//     try {
//         const response = await axios.request(options);
//         console.log(response.data.DATA[0].ROWS);
//     } catch (error) {
//         console.error(error);
//     }
// }

const axios = require('axios');

// const apiUrl = 'https://apiv2.allsportsapi.com/football';
// const apiKey = '85afdffeff133a6d09f791ea1f84009c18d8346c296b34a56d8a4c0f6f6b1b40';

async function fetchData() {
  try {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
        params: {
          season: '2022',
          league: '40'
        },
        headers: {
          'X-RapidAPI-Key': '2d1ad640e2msh3fbd65472051ab5p16e975jsnfd393ea1d038',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

      const response = await axios.request(options);
      console.log(response.data.response[0].league.standings[0]);

    
  } catch (error) {
    // Handle the error
    console.error(error);
  }
}

module.exports = {fetchData};
