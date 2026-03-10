import { useState, useEffect } from 'react'
import IconText from './IconText'
import destinations from '../destinations.json'
import './TravelForm.css'

function TravelForm() {
  const [budget, setBudget] = useState(null)
  const [duration, setDuration] = useState(null)
  const [tripType, setTripType] = useState(null)
  const [activities, setActivities] = useState([])
  const [climate, setClimate] = useState(null)
  const [selectedDestination, setSelectedDestination] = useState(null)

  // log any selection changes for debugging
  useEffect(() => {
    console.log('Selected options:', {
      budget,
      duration,
      tripType,
      activities,
      climate
    })
  }, [budget, duration, tripType, activities, climate])

  const budgets = [
    { value: 'economique', icon: '💸', label: 'Économique' },
    { value: 'confort', icon: '💼', label: 'Confort' },
    { value: 'luxe', icon: '💎', label: 'Luxe' }
  ]

  const durations = [
    { value: 'weekend', icon: '📅', label: 'Week-end' },
    { value: 'semaine', icon: '🗓️', label: 'Semaine' },
    { value: 'mois', icon: '📆', label: 'Mois' }
  ]

  const tripTypes = [
    { value: 'plage', icon: '🏖️', label: 'Plage et détente' },
    { value: 'culture', icon: '🏛️', label: 'Culture & histoire' },
    { value: 'aventure', icon: '🧗', label: 'Aventure & nature' },
    { value: 'ecotourisme', icon: '🌿', label: 'Écotourisme' },
    { value: 'romantique', icon: '💑', label: 'Romantique' }
  ]

  const activityOptions = [
    { value: 'randonees', icon: '🥾', label: 'Randonnées' },
    { value: 'plongees', icon: '🤿', label: 'Plongées' },
    { value: 'visites', icon: '🗺️', label: 'Visites culturelles' },
    { value: 'bienetre', icon: '🧘', label: 'Bien-être' },
    { value: 'shopping', icon: '🛍️', label: 'Shopping' }
  ]

  const climates = [
    { value: 'tempere', icon: '🌤️', label: 'Tempéré' },
    { value: 'froid', icon: '❄️', label: 'Froid' },
    { value: 'indifferent', icon: '🌍', label: 'Indifférent' }
  ]

  function toggleActivity(option) {
    setActivities((prev) =>
      prev.includes(option)
        ? prev.filter((a) => a !== option)
        : [...prev, option]
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    let bestMatch = null
    let bestScore = -1

    destinations.forEach(dest => {
      let score = 0
      if (budget && dest.budget === budget) score++
      if (duration && dest.duree === duration) score++
      if (tripType && dest.type === tripType) score++
      if (activities.length > 0 && activities.some(act => dest.activites.includes(act))) score++
      if (climate && (climate === 'indifferent' || dest.climat === climate)) score++

      if (score > bestScore) {
        bestScore = score
        bestMatch = dest
      } else if (score === bestScore && bestMatch) {
        // Si égalité, choisir aléatoirement
        if (Math.random() > 0.5) {
          bestMatch = dest
        }
      }
    })

    setSelectedDestination(bestMatch)
  }

  return (
    <>
      <form className="travel-form" onSubmit={handleSubmit}>
        <div className="group">
          <div className="group-label">Budget</div>
          <div className="options">
            {budgets.map((opt) => (
              <IconText
                key={opt.value}
                icon={opt.icon}
                text={opt.label}
                selected={budget === opt.value}
                onClick={() => setBudget(opt.value)}
              />
            ))}
          </div>
        </div>

        <div className="group">
          <div className="group-label">Durée du séjour</div>
          <div className="options">
            {durations.map((opt) => (
              <IconText
                key={opt.value}
                icon={opt.icon}
                text={opt.label}
                selected={duration === opt.value}
                onClick={() => setDuration(opt.value)}
              />
            ))}
          </div>
        </div>

        <div className="group">
          <div className="group-label">Type de voyage</div>
          <div className="options">
            {tripTypes.map((opt) => (
              <IconText
                key={opt.value}
                icon={opt.icon}
                text={opt.label}
                selected={tripType === opt.value}
                onClick={() => setTripType(opt.value)}
              />
            ))}
          </div>
        </div>

        <div className="group">
          <div className="group-label">Activités</div>
          <div className="options">
            {activityOptions.map((opt) => (
              <IconText
                key={opt.value}
                icon={opt.icon}
                text={opt.label}
                selected={activities.includes(opt.value)}
                onClick={() => toggleActivity(opt.value)}
              />
            ))}
          </div>
        </div>

        <div className="group">
          <div className="group-label">Climat préféré</div>
          <div className="options">
            {climates.map((opt) => (
              <IconText
                key={opt.value}
                icon={opt.icon}
                text={opt.label}
                selected={climate === opt.value}
                onClick={() => setClimate(opt.value)}
              />
            ))}
          </div>
        </div>

        <button type="submit" className="submit-button">Découvrir ma prochaine destination</button>
      </form>

      {selectedDestination && (
        <div className="postcard">
          <img src={selectedDestination.url} alt={selectedDestination.nom} className="postcard-image" />
          <div className="postcard-content">
            <h2>{selectedDestination.nom}, {selectedDestination.pays}</h2>
            <p><strong>Budget:</strong> {selectedDestination.budget}</p>
            <p><strong>Durée:</strong> {selectedDestination.duree}</p>
            <p><strong>Type:</strong> {selectedDestination.type}</p>
            <p><strong>Climat:</strong> {selectedDestination.climat}</p>
            <p><strong>Activités:</strong> {selectedDestination.activites.join(', ')}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default TravelForm
