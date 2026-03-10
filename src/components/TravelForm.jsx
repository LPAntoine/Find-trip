import { useState, useEffect } from 'react'
import IconText from './IconText'
import './TravelForm.css'

function TravelForm() {
  const [budget, setBudget] = useState(null)
  const [duration, setDuration] = useState(null)
  const [tripType, setTripType] = useState(null)
  const [activities, setActivities] = useState([])
  const [climate, setClimate] = useState(null)

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

  return (
    <form className="travel-form" onSubmit={(e) => e.preventDefault()}>
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
    </form>
  )
}

export default TravelForm
