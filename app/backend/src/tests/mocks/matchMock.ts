import IMatch from '../../interfaces/IMatch';

const matchCorrectInput: IMatch = {
  homeTeam: 1,
  awayTeam: 2,
  homeTeamGoals: 3,
  awayTeamGoals: 0,
}

const matchResponse: IMatch = {
  id: 1,
  homeTeam: 1,
  awayTeam: 2,
  homeTeamGoals: 3,
  awayTeamGoals: 0,
  inProgress: true,
}

const matchTeamResponse: IMatch[] = [
  {
    id: 1,
    homeTeam: 1,
    homeTeamGoals: 1,
    awayTeam: 3,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeam: 2,
    homeTeamGoals: 2,
    awayTeam: 1,
    awayTeamGoals: 3,
    inProgress: true,
    teamHome: {
      teamName: "Bahia"
    },
    teamAway: {
      teamName: "São Paulo"
    }
  }
]

const matchTeamInProgressResponse: IMatch[] = [
  {
    id: 1,
    homeTeam: 1,
    homeTeamGoals: 1,
    awayTeam: 3,
    awayTeamGoals: 1,
    inProgress: true,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeam: 2,
    homeTeamGoals: 2,
    awayTeam: 1,
    awayTeamGoals: 3,
    inProgress: true,
    teamHome: {
      teamName: "Bahia"
    },
    teamAway: {
      teamName: "São Paulo"
    }
  }
]


const matchTeamNotInProgressResponse: IMatch[] = [
  {
    id: 1,
    homeTeam: 1,
    homeTeamGoals: 1,
    awayTeam: 3,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeam: 2,
    homeTeamGoals: 2,
    awayTeam: 1,
    awayTeamGoals: 3,
    inProgress: false,
    teamHome: {
      teamName: "Bahia"
    },
    teamAway: {
      teamName: "São Paulo"
    }
  }
]

export default { 
  matchCorrectInput, 
  matchResponse, 
  matchTeamResponse,
  matchTeamInProgressResponse,
  matchTeamNotInProgressResponse,
}

// export default { 
//   matchCorrectInput,
//   matchCreateResponse,
//   matchResponse, 
//   matchInProgressTrueResponse, 
//   matchInProgressFalseResponse,
// }