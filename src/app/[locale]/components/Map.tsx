"use client"

import { MapContainer, GeoJSON, Marker, TileLayer, Popup } from "react-leaflet"
import { LatLngExpression, LatLngTuple } from 'leaflet';
import { useEffect, useState, useCallback } from "react"
import type { GeoJsonObject } from "geojson"
import { useTheme } from 'next-themes'

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

interface MapProps {
    posix: LatLngExpression | LatLngTuple,
    zoom: number,
}

const Map = (Map: MapProps) => {
    const { zoom, posix } = Map
    const [geoData, setGeoData] = useState<GeoJsonObject | null>(null)
    const { resolvedTheme } = useTheme()

    useEffect(() => {
        fetch("/data/world-countries.geo.json")
            .then((res) => res.json())
            .then((data) => {
                console.log("GeoJSON loaded:", data)
                setGeoData(data)
            })
    }, [])

    const visitedCountries = ["Czechia", "Spain", "Germany", "Italy", "GBR", "Israel", "France", "MAR", "Norway", "Sweden", "Finland", "Poland", "Romania", "Portugal", "Slovakia", "Austria", "Switzerland", "Hungary", "Croatia", "Philippines", "Turkey", "Greece", "Albania", "Netherlands", "Bulgaria", "Serbia", "Montenegro", "Slovenia"];

    const styleFeature = useCallback((feature: any) => {
        const isoCode = feature.properties["ISO3166-1-Alpha-3"];
        const name = feature.properties.name;

        const isVisited = visitedCountries.includes(isoCode) || visitedCountries.includes(name);

        return {
            fillColor: isVisited ? "#4caf50" : "#e0e0e0",
            color: "#999",
            weight: 1,
            fillOpacity: isVisited ? 0.7 : 0.2,
        };
    }, []);

    return (
        <MapContainer
            center={posix}
            zoom={zoom}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
            maxBounds={[[-90, -180], [90, 180]]}
            maxBoundsViscosity={1.0}
        >
            <TileLayer
                attribution='&copy; OpenStreetMap contributors, &copy; CARTO'
                url={`https://{s}.basemaps.cartocdn.com/${resolvedTheme === 'dark' ? "dark" : "light"}_all/{z}/{x}/{y}{r}.png`}
                noWrap={true}
            />
            {geoData && <GeoJSON data={geoData} style={styleFeature} />}
        </MapContainer>
    )
}

export default Map