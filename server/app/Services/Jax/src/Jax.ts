import AccountEndpoint from './Endpoints/AccountEndpoint'
import LeagueEndpoint from './Endpoints/LeagueEndpoint'
import MatchEndpoint from './Endpoints/MatchEndpoint'
import MatchlistEndpoint from './Endpoints/MatchlistEndpoint'
import SummonerEndpoint from './Endpoints/SummonerEndpoint'
import SpectatorEndpoint from './Endpoints/SpectatorEndpoint'
import CDragonEndpoint from './Endpoints/CDragonEndpoint'
import { JaxConfig } from '../JaxConfig'
import RiotRateLimiter from 'riot-ratelimiter'
import { STRATEGY } from 'riot-ratelimiter/dist/RateLimiter'

export default class Jax {
  public key: string
  public limiter: RiotRateLimiter
  public config: JaxConfig
  public Account: AccountEndpoint
  public League: LeagueEndpoint
  public Match: MatchEndpoint
  public Matchlist: MatchlistEndpoint
  public Spectator: SpectatorEndpoint
  public Summoner: SummonerEndpoint
  public CDragon: CDragonEndpoint

  constructor(config: JaxConfig) {
    this.key = config.key
    // this.limiter = new RiotRateLimiter({
    //   debug: true,
    //   retryCount: 0,
    // })
    this.limiter = new RiotRateLimiter({
      debug: false,
      strategy: STRATEGY.SPREAD,
    })
    this.config = config

    this.Account = new AccountEndpoint(this.config, this.limiter)
    this.League = new LeagueEndpoint(this.config, this.limiter)
    this.Match = new MatchEndpoint(this.config, this.limiter)
    this.Matchlist = new MatchlistEndpoint(this.config, this.limiter)
    this.Spectator = new SpectatorEndpoint(this.config, this.limiter)
    this.Summoner = new SummonerEndpoint(this.config, this.limiter)
    this.CDragon = new CDragonEndpoint(this.config)
  }
}
