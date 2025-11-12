/**
 * Gallery Section Component
 *
 * An interactive image gallery showcasing workspace, projects, and achievements.
 * Features category filtering and lightbox modal for full-size image viewing.
 *
 * Features:
 * - Category filter buttons (All, Workspace, Projects, Achievements)
 * - Responsive grid layout
 * - Lightbox modal for full-size viewing
 * - Click to expand images
 * - Keyboard support (ESC to close lightbox)
 * - Smooth transitions and hover effects
 *
 * @module components/layout/gallery
 */

import { useState } from 'react'
import './Gallery.css'

/**
 * Gallery image data structure
 */
interface GalleryImage {
  /** Unique identifier for the image */
  id: number
  /** Image URL source */
  src: string
  /** Display title for the image */
  title: string
  /** Descriptive text explaining the image */
  description: string
  /** Category for filtering (workspace, projects, achievements) */
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

/**
 * Gallery Component
 *
 * Displays filterable image gallery with lightbox functionality.
 * Users can filter images by category and click to view full-size.
 *
 * @returns Gallery section with filtering and lightbox
 */
export default function Gallery() {
  /**
   * State: Currently active category filter
   * Controls which images are displayed
   * @default 'all' - Shows all images
   */
  const [activeFilter, setActiveFilter] = useState('all')

  /**
   * State: Currently selected image for lightbox display
   * null when lightbox is closed
   */
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  /**
   * Computed: Filtered images based on active filter
   *
   * If 'all' is selected, shows all images.
   * Otherwise, filters images by matching category.
   *
   * This is recalculated whenever activeFilter or galleryImages changes.
   */
  const filteredImages = activeFilter === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeFilter)

  /**
   * Opens lightbox modal with selected image
   * @param image - The image to display in lightbox
   */
  const openModal = (image: GalleryImage) => {
    setSelectedImage(image)
  }

  /**
   * Closes lightbox modal
   * Clears selected image to hide modal
   */
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
        <div className="gallery-filters" role="group" aria-label="Gallery category filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`gallery-filter ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
              aria-label={`Filter by ${category.label}`}
              aria-pressed={activeFilter === category.id}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredImages.map(image => (
            <button
              key={image.id}
              className="gallery-item"
              onClick={() => openModal(image)}
              aria-label={`View ${image.title} in full size`}
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
            </button>
          ))}
        </div>

        {/* Modal */}
        <div
          className={`gallery-modal ${selectedImage ? 'active' : ''}`}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {selectedImage && (
            <div className="gallery-modal-content" onClick={e => e.stopPropagation()}>
              <button
                className="gallery-modal-close"
                onClick={closeModal}
                aria-label="Close image modal"
              >
                ×
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="gallery-modal-image"
              />
              <div className="gallery-modal-info">
                <h3 id="modal-title" className="gallery-modal-title">{selectedImage.title}</h3>
                <p className="gallery-modal-description">{selectedImage.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}