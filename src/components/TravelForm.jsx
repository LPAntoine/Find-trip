import { useState, useEffect, useCallback } from 'react'
import IconText from './IconText'
import destinations from '../destinations.json'
import './TravelForm.css'
import ReactMarkdown from 'react-markdown'

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

function TravelForm() {
  const [budget, setBudget] = useState(null)
  const [duration, setDuration] = useState(null)
  const [tripType, setTripType] = useState(null)
  const [activities, setActivities] = useState([])
  const [climate, setClimate] = useState(null)
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [generatedActivities, setGeneratedActivities] = useState([])

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

  const toggleActivity = useCallback((option) => {
    setActivities((prev) =>
      prev.includes(option)
        ? prev.filter((a) => a !== option)
        : [...prev, option]
    )
  }, [])

  const generateActivities = useCallback(async (destination) => {
    const prompt = `Propose 5 activités intéressantes à faire à ${destination.nom}, ${destination.pays}. Considère le type de voyage ${destination.type}, le climat ${destination.climat}, et les activités suggérées ${destination.activites.join(', ')}. Réponds en français avec une liste numérotée.`

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-120b',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 500
        })
      })

      const data = await response.json()
      if (data.choices && data.choices[0]) {
        const activitiesText = data.choices[0].message.content
        const activitiesList = activitiesText.split('\n').filter(line => /^\d+\./.test(line.trim())).map(line => line.replace(/^\d+\.\s*/, '').trim())
        setGeneratedActivities(activitiesList)
      } else if (data.error) {
        setGeneratedActivities([`Erreur API: ${data.error.message}`])
      } else {
        setGeneratedActivities(['Erreur: Réponse inattendue de l\'API.'])
      }
    } catch (error) {
      console.error('Erreur lors de l\'appel à l\'API Groq:', error)
      setGeneratedActivities(['Erreur lors de la génération des activités. Vérifiez la clé API ou les modèles disponibles sur https://console.groq.com/docs/models'])
    }
  }, [])

  const handleSubmit = useCallback((e) => {
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
    if (bestMatch) {
      generateActivities(bestMatch)
    }
  }, [budget, duration, tripType, activities, climate, generateActivities])

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

      {generatedActivities.length > 0 && (
        <div className="activities">
          <h3>Activités suggérées par l&apos;IA :</h3>
          <div className="activities-grid">
            {generatedActivities.map((activity, index) => (
              <div key={index} className="activity-card">
                <div className="activity-number">{index + 1}</div>
                <div className="activity-content">
                  <ReactMarkdown>{activity}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default TravelForm
