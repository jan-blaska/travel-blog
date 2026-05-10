"use client"

import { MapContainer, GeoJSON, TileLayer } from "react-leaflet"
import { LatLngExpression, LatLngTuple } from 'leaflet';
import { useEffect, useState, useCallback } from "react"
import type { GeoJsonObject, Feature } from "geojson"
import { useTheme } from '@/components/ThemeProvider'

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

interface MapProps {
    posix: LatLngExpression | LatLngTuple,
    zoom: number,
}

const visitedCountries = ["Czechia", "Spain", "Germany", "Dominican Republic", "Italy", "GBR", "Israel", "Jordan", "France", "MAR", "Norway", "Sweden", "Finland", "Poland", "Romania", "Portugal", "Slovakia", "Austria", "Switzerland", "Hungary", "Croatia", "Philippines", "Turkey", "Greece", "Albania", "Netherlands", "Bulgaria", "SRB", "Montenegro", "Slovenia", "Thailand", "Estonia"];

const Map = ({ zoom, posix }: MapProps) => {
    const [geoData, setGeoData] = useState<GeoJsonObject | null>(null)
    const [isTouchDevice, setIsTouchDevice] = useState(false)
    const { resolvedTheme } = useTheme()

    useEffect(() => {
        setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches)
    }, [])

    useEffect(() => {
        fetch("/data/world-countries.geo.json")
            .then((res) => res.json())
            .then((data) => {
                setGeoData(data)
            })
    }, [])

    const styleFeature = useCallback((feature: Feature | undefined) => {
        if (!feature?.properties) return { fillColor: "#e0e0e0", color: "#999", weight: 1, fillOpacity: 0.2 };
        const isoCode = feature.properties["ISO3166-1-Alpha-3"] as string;
        const name = feature.properties.name as string;

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
            touchZoom={!isTouchDevice}
            dragging={!isTouchDevice}
            style={{ height: "100%", width: "100%", background: "var(--background)" }}
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
