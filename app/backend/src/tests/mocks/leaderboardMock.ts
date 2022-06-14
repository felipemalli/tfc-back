import ILeaderboard from "../../interfaces/ILeaderboard"

const leaderboardResponse: ILeaderboard[] = [
  {
    name: 'Botafogo',
    totalPoints: 6,
    totalGames: 3,
    totalVictories: 2,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 7,
    goalsOwn: 6,
    goalsBalance: 1,
    efficiency: 66.67
  },
  {
    name: 'Bahia',
    totalPoints: 4,
    totalGames: 4,
    totalVictories: 1,
    totalDraws: 1,
    totalLosses: 2,
    goalsFavor: 9,
    goalsOwn: 9,
    goalsBalance: 0,
    efficiency: 33.33
  },
  {
    name: 'São Paulo',
    totalPoints: 4,
    totalGames: 3,
    totalVictories: 1,
    totalDraws: 1,
    totalLosses: 1,
    goalsFavor: 6,
    goalsOwn: 7,
    goalsBalance: -1,
    efficiency: 44.44
  }
]

const leaderboardHomeResponse: ILeaderboard[] = [
  {
    name: 'São Paulo',
    totalPoints: 4,
    totalGames: 2,
    totalVictories: 1,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 5,
    goalsOwn: 4,
    goalsBalance: 1,
    efficiency: 66.67
  },
  {
    name: 'Botafogo',
    totalPoints: 3,
    totalGames: 2,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 5,
    goalsOwn: 6,
    goalsBalance: -1,
    efficiency: 50
  },
  {
    name: 'Bahia',
    totalPoints: 0,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 0,
    goalsOwn: 2,
    goalsBalance: -2,
    efficiency: 0
  }
]


const leaderboardAwayResponse: ILeaderboard[] =[
  {
    name: 'Bahia',
    totalPoints: 4,
    totalGames: 3,
    totalVictories: 1,
    totalDraws: 1,
    totalLosses: 1,
    goalsFavor: 9,
    goalsOwn: 7,
    goalsBalance: 2,
    efficiency: 44.44
  },
  {
    name: 'Botafogo',
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 2,
    goalsOwn: 0,
    goalsBalance: 2,
    efficiency: 100
  },
  {
    name: 'São Paulo',
    totalPoints: 0,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 1,
    goalsOwn: 3,
    goalsBalance: -2,
    efficiency: 0
  }
]

export default { leaderboardResponse, leaderboardHomeResponse, leaderboardAwayResponse }