import IMatch from './IMatch';

interface IMatchFiltered {
  teamMatches: IMatch[],
  team: {
    teamName: string,
    id: number,
  }
}

export default IMatchFiltered;
