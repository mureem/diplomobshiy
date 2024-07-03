export function getClientInfo() {
    return {
        userAgent: navigator.userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        language: navigator.language,
        platform: navigator.platform,
        cookiesEnabled: navigator.cookieEnabled,
        geolocation: {
            isSupported: navigator.geolocation? true : false,
            latitude: null, // Здесь будет широта, если доступно
            longitude: null, // Здесь будет долгота, если доступно
        },
        systemLanguage: navigator.systemLanguage,
        webGLSupport:!!window.WebGLRenderingContext,
        webRTCSupport:!!window.RTCIceTransport,
        connectionType: navigator.connection? navigator.connection.type : 'unknown',
        displayInfo: {
            width: window.innerWidth,
            height: window.innerHeight,
            devicePixelRatio: window.devicePixelRatio,
        },
        osVersion: navigator.osVersion,
        fullUserAgent: navigator.userAgent,
    };
}
