import { useState } from 'react'
import './Gallery.css'

interface GalleryImage {
  id: number
  src: string
  title: string
  description: string
  category: string
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://picsum.photos/400/300?random=11",
    title: "Java Development Workspace",
    description: "My development environment setup for Java projects with Spring Boot",
    category: "workspace"
  },
  {
    id: 2,
    src: "https://picsum.photos/400/300?random=12",
    title: "Team Collaboration",
    description: "Working with the development team at ViNang Company",
    category: "team"
  },
  {
    id: 3,
    src: "https://picsum.photos/400/300?random=13",
    title: "Conference Presentation",
    description: "Presenting microservices architecture at tech meetup",
    category: "events"
  },
  {
    id: 4,
    src: "https://picsum.photos/400/300?random=14",
    title: "Code Review Session",
    description: "Collaborative code review with team members",
    category: "team"
  },
  {
    id: 5,
    src: "https://picsum.photos/400/300?random=15",
    title: "Database Design",
    description: "Designing database architecture for e-commerce platform",
    category: "workspace"
  },
  {
    id: 7,
    src: "https://picsum.photos/400/300?random=17",
    title: "Graduation Day",
    description: "Graduating from Nguyen Tat Thanh University with IT degree",
    category: "personal"
  },
  {
    id: 6,
    src: "https://picsum.photos/400/300?random=19",
    title: "Office in Limerick",
    description: "Current workspace in Limerick, Ireland",
    category: "workspace"
  }
]

const categories = [
  { id: 'all', label: 'All' },
  { id: 'workspace', label: 'Workspace' },
  { id: 'team', label: 'Team' },
  { id: 'events', label: 'Events' },
  { id: 'personal', label: 'Personal' }
]

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const filteredImages = activeFilter === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeFilter)

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-container">
        <h2 className="gallery-title">Pictures Gallery</h2>
        <p className="gallery-description">
          A visual journey through my professional career, education, and personal milestones
          as a Java developer. From workspace setups to team collaborations and tech events.
        </p>

        {/* Filter Buttons */}
        <div className="gallery-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`gallery-filter ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredImages.map(image => (
            <div
              key={image.id}
              className="gallery-item"
              onClick={() => openModal(image)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <h3 className="gallery-overlay-title">{image.title}</h3>
                <p className="gallery-overlay-description">{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <div className={`gallery-modal ${selectedImage ? 'active' : ''}`} onClick={closeModal}>
          {selectedImage && (
            <div className="gallery-modal-content" onClick={e => e.stopPropagation()}>
              <button className="gallery-modal-close" onClick={closeModal}>
                ×
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="gallery-modal-image"
              />
              <div className="gallery-modal-info">
                <h3 className="gallery-modal-title">{selectedImage.title}</h3>
                <p className="gallery-modal-description">{selectedImage.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}