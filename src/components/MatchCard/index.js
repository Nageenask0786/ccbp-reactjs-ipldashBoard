import './index.css'

const MatchCard = props => {
  const {MatchDetails} = props
  const {competingTeam, competingTeamLogo, matchStatus, result} = MatchDetails
  const ClassName = matchStatus === 'Won' ? 'won-game' : 'lose'
  return (
    <li className="match-items">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="logo"
      />
      <p className="name">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={ClassName}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
