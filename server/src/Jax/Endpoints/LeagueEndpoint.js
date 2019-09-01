import JaxRequest from '../JaxRequest'

class LeagueEndpoint {
  constructor(limiter, region) {
    this.limiter = limiter
    this.region = region
  }

  summonerID(summonerID) {
    return new JaxRequest(
      `league/v4/entries/by-summoner/${summonerID}`,
      this.limiter,
      this.region
    ).execute()
  }
}

export default LeagueEndpoint
