import { Box } from '@chakra-ui/react'
import React, {useContext, useEffect, useState} from 'react'
import '../../../index.css'
import 'leaflet/dist/leaflet.css'

import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import MapKeyHeader from '@/components/Molecules/Home/Map/MapKeyHeader/MapKeyHeader'
import { MdPointOfSale, MdOutlineStorefront } from "react-icons/md";
import { TerminalContext } from '@/context/TerminalsContext/TerminalContext'
import { Icon, popup } from 'leaflet'
import inactive from '../../../assets/Inactive.png'
import MapOperations from '@/components/Molecules/Home/Map/MapOperationsHeader/MapOperationsHeader'
import MapOperationsHeader from '@/components/Molecules/Home/Map/MapOperationsHeader/MapOperationsHeader'

const position = [-1.286389 ,36.817223]

const Map = () => {

  const {allTerminals} = useContext(TerminalContext)
  const [markers, setMarkers] = useState([])

  console.log('allTerminals', allTerminals)

  const terminalsWithPosition = allTerminals.filter(terminal => terminal.positions)

  console.log('terminalWithPosition', terminalsWithPosition)

  const icon = new Icon({
    iconUrl: inactive,
    iconSize: [38, 38]
  })

  const terminalsWithGeoCode = terminalsWithPosition.map((terminal) => {
    console.log('terminalInGeoFunc', terminal)
    return {
      ...terminal,
      geocode: [terminal?.positions[0]?.longitude, terminal?.positions[0]?.latitude],
      popup: 'Location'
    }
  })
  

  console.log('terminalWidthGEOCODE', terminalsWithGeoCode)


  return (
    <Box>
      <MapOperationsHeader />
      <MapKeyHeader storesCount={10} terminalsCount={20} />

<MapContainer  center={position} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {terminalsWithGeoCode.map((terminal) => {
      return <Marker icon={icon}  position={terminal?.geocode}>
      <Popup>
        Nairobi metropolitan. <br />
      </Popup>
    </Marker> 
     })}
</MapContainer>
</Box>


  )
}

export default Map