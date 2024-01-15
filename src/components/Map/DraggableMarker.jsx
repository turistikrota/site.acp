import { useMemo, useRef } from 'react'
import { Marker } from 'react-leaflet'

const DraggableMarker = ({ position, setPosition }) => {
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const lt = marker.getLatLng()
          setPosition([lt.lat, lt.lng])
        }
      },
    }),
    [],
  )
  return <Marker draggable={true} eventHandlers={eventHandlers} position={position} ref={markerRef} />
}

export default DraggableMarker