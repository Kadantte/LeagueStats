'use strict'

const Jax = use('Jax')
const MatchHelper = use('App/Helpers/MatchHelper')

class SummonerController {
  /**
   *  POST Endpoint : get summoner data
   */
  async api({ request, response }) {
    console.time('all')
    const summoner = request.input('summoner')
    const region = request.input('region')
    console.log(summoner, region)

    const regexSummonerName = new RegExp('^[0-9\\p{L} _\\.]+$', 'u')
    if (!regexSummonerName.exec(summoner)) {
      return response.json(null)
    }

    const finalJSON = {}
    Jax.regionName = region

    try {
      const account = await Jax.Summoner.summonerName(summoner)
      // Check if the summoner is found
      if (!account) return response.json(null)
      finalJSON.account = account

      // RANKED STATS
      const ranked = await Jax.League.summonerID(account.id)
      const soloQ = ranked.filter(e => e.queueType === 'RANKED_SOLO_5x5')
      finalJSON.soloQ = soloQ.length ? soloQ[0] : null;

      // MATCH LIST
      const matchList = await MatchHelper.getFullMatchList(account)
      finalJSON.allMatches = matchList

      // MATCHES DETAILS
      const gameIds = matchList.slice(0, 10).map(({ gameId }) => gameId)
      finalJSON.matchesDetails = await MatchHelper.getMatches(account, gameIds)
    } catch (error) {
      console.log('username not found')
      console.log(error)
      return response.json(null)
    }

    console.timeEnd('all')
    return response.json(finalJSON)
  }
}

module.exports = SummonerController
