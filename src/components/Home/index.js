import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {matchData: [], isLoading: true}

  componentDidMount() {
    this.getMatchCards()
  }

  getMatchCards = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    console.log(data)
    const teamsArray = data.teams
    console.log(teamsArray)
    const updatedArray = teamsArray.map(each => ({
      id: each.id,
      name: each.name,
      teamImageUrl: each.team_image_url,
    }))
    console.log(updatedArray)
    this.setState({matchData: updatedArray, isLoading: false})
  }

  renderMatchCard = () => {
    const {matchData} = this.state
    return (
      <ul className="match-details-container">
        {matchData.map(each => (
          <TeamCard key={each.id} MatchDetails={each} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="home-container">
        <div className="head-items">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="logo"
          />
          <h1 className="ipl-title">IPL Dashboard</h1>
        </div>
        {isLoading ? this.renderLoader() : this.renderMatchCard()}
      </div>
    )
  }
}

export default Home
