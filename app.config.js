import 'dotenv/config'

export default {
    "expo": {
        "name": "shiftze-app",
        "slug": "shiftze-app",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/icon.png",
        "splash": {
            "image": "./assets/shiftze-logo.png",
            "backgroundColor": "#E95E2D"
        },
        "updates": {
            "fallbackToCacheTimeout": 0
        },
        "assetBundlePatterns": [
            "**/*"
        ],
        "ios": {
            "supportsTablet": true
        },
        "android": {
            "adaptiveIcon": {
                "foregroundImage": "./assets/adaptive-icon.png",
                "backgroundColor": "#FFFFFF"
            }
        },
        "web": {
            "favicon": "./assets/favicon.png"
        },
        "extra": {
            apiKey: process.env.apiKey,
            authDomain: process.env.authDomain,
            projectId: process.env.projectId,
            storageBucket: process.env.storageBucket,
            messagingSenderId: process.env.messagingSenderId,
            appId: process.env.appId,
            measurementId: process.env.measurementId,
            GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY
        }
    }
}