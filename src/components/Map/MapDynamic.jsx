import 'leaflet/dist/leaflet.css'
import { useCallback, useEffect, useState } from 'react'
import { MapContainer } from 'react-leaflet'
import styles from "./Map.module.scss"

export default function MapDynamic({
  children,
  position,
  zoom = 10,
  onChange,
  className,
}) {
  const [map, setMap] = useState(null)

  const onMove = useCallback(() => {
    if (map) {
      const center = map.getCenter()
      const zoom = map.getZoom()
      if (onChange) {
        onChange([center.lat, center.lng], zoom)
      }
    }
  }, [map])

  useEffect(() => {
    if (!map) return
    map.on('move', onMove)
    return () => {
      if (!map) return
      map.off('move', onMove)
    }
  }, [map, onMove])

  useEffect(() => {}, [])

  return (
    <MapContainer
      minZoom={7}
      maxZoom={15}
      ref={setMap}
      center={position}
      zoom={zoom}
      className={`${className ? className : ''} ${styles.map}`}
    >
      {children}
    </MapContainer>
  )
}