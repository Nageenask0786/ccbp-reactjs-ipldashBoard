import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'

import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {teamMatchesData: {}, isLoading: true}

  componentDidMount() {
    this.getTeamMatchesData()
  }

  getFormatedData = data => ({
    umpires: data.umpires,
    competingTeam: data.competing_team,
    id: data.id,
    competingTeamLogo: data.competing_team_logo,
    result: data.result,
    matchStatus: data.match_status,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    manOfTheMatch: data.man_of_the_match,
    date: data.date,
    venue: data.venue,
  })

  getTeamMatchesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const Data = await response.json()
    console.log(Data)
    const formattedData = {
      teamBannerUrl: Data.team_banner_url,
      latestMatchDetails: this.getFormatedData(Data.latest_match_details),
      recentMatches: Data.recent_matches.map(each =>
        this.getFormatedData(each),
      ),
    }
    console.log(formattedData)
    this.setState({teamMatchesData: formattedData, isLoading: false})
  }

  renderRecentMatches = () => {
    const {teamMatchesData} = this.state
    const {recentMatches} = teamMatchesData
    return (
      <ul className="recent-matches">
        {recentMatches.map(each => (
          <MatchCard key={each.id} MatchDetails={each} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {teamMatchesData} = this.state
    const {teamBannerUrl, latestMatchDetails} = teamMatchesData
    return (
      <div>
        <img
          src={teamBannerUrl}
          alt="team banner"
          className="team-banner-image"
        />
        <LatestMatch latestMatchData={latestMatchDetails} />
        {this.renderRecentMatches()}
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  getBackgroundClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const bgClassName = `team-matches-container ${this.getBackgroundClassName()}`
    return (
      <div className={bgClassName}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
