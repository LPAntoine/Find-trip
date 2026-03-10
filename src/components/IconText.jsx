import './IconText.css'

function IconText({ icon, text, onClick, selected = false }) {
  return (
    <button
      className={`icon-text-card ${selected ? 'selected' : ''}`}
      onClick={onClick}
      type="button"
      aria-pressed={selected}
    >
      <span className="icon-text-icon">{icon}</span>
      <span className="icon-text-text">{text}</span>
      {selected && <span className="icon-text-check">✓</span>}
    </button>
  )
}

export default IconText
