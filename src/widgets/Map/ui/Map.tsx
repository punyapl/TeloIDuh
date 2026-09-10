import {
    YMap,
    YMapComponentsProvider,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapDefaultMarker,
} from 'ymap3-components';
import { useDevice, } from '@/shared/hooks/useDevice';

const MapStyle = [
    {
        "tags": {
            "any": [
                "industrial",
                "construction_site",
                "medical",
                "sports_ground",
                "beach"
            ]
        },
        "types": "polygon",
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "tags": {
            "any": "transit",
            "none": [
                "transit_location",
                "transit_line",
                "transit_schema",
                "is_unclassified_transit"
            ]
        },
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "tags": {
            "any": "urban_area",
            "none": [
                "residential",
                "industrial",
                "cemetery",
                "park",
                "medical",
                "sports_ground",
                "beach",
                "construction_site"
            ]
        },
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "tags": {
            "any": [
                "outdoor",
                "park",
                "cemetery",
                "medical"
            ]
        },
        "elements": "label",
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "tags": {
            "any": "poi",
            "none": [
                "outdoor",
                "park",
                "cemetery",
                "medical"
            ]
        },
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "tags": {
            "any": "road"
        },
        "types": "point",
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "tags": {
            "any": [
                "food_and_drink",
                "shopping",
                "commercial_services"
            ]
        },
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "tags": {
            "any": [
                "traffic_light"
            ]
        },
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "tags": {
            "any": [
                "entrance"
            ]
        },
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "tags": {
            "any": [
                "road"
            ],
            "none": [
                "road_1",
                "road_2",
                "road_3",
                "road_4",
                "road_5",
                "road_6",
                "road_7"
            ]
        },
        "elements": "label.icon",
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "tags": {
            "any": [
                "address",
                "road_7",
                "road_limited",
                "road_unclassified",
                "road_minor",
                "road_construction",
                "path"
            ]
        },
        "elements": "label",
        "stylers": {
            "visibility": "off"
        }
    }
]

export const Map = () => {
    const { isMobile, } = useDevice()

    return (
        <YMapComponentsProvider apiKey={__YMAPKEY__} lang="ru_RU">
            <YMap location={{ center: [37.411975, 55.681336,], zoom: 16, }} theme="light" mode="vector">
                <YMapDefaultSchemeLayer customization={MapStyle}/>
                <YMapDefaultFeaturesLayer />
                <YMapDefaultMarker coordinates={[37.411975, 55.681336, ]} title="Тело и дух" subtitle="Медицинский центр" color="#BE9557" />
            </YMap>
        </YMapComponentsProvider>
    )
}
//55.681336, 37.411975
//https://yandex.ru/maps/?ll=37.411975,55.681336&z=12&l=map
//https://yandex.ru/maps/1/moscow-and-moscow-oblast/house/torgovaya_ulitsa_5/Z04YcgZhQEICQFtvfXp5cH9gYg==/?from=api-maps&indoorLevel=1&ll=37.412362%2C55.681100&origin=jsapi_3&utm_source=jsapi&z=16.8