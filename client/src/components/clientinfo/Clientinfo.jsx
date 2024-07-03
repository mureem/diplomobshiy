import React, { useEffect } from 'react';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

const getClientInfo = () => {
    return {
        userAgent: navigator.userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        language: navigator.language,
        platform: navigator.platform,
        timestamp: new Date().toISOString(),
        timezoneOffset: new Date().getTimezoneOffset(),
        ipAddress: '', // Требуется использовать внешнее API или серверное решение
        browser: isBrowser ? navigator.userAgent : '', // Использование react-device-detect
        operatingSystem: isBrowser ? navigator.platform : '' // Использование react-device-detect
    };
};

const ClientInfo = () => {
    useEffect(() => {
        const clientInfo = getClientInfo();
        console.log(clientInfo);

        const sendClientInfo = async () => {
            try {
                // Проверяем, отправляли ли данные ранее
                if (localStorage.getItem('clientInfoSent') !== 'true') {
                    const response = await fetch('http://localhost:5000/save-client-info', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(clientInfo),
                    });

                    if (!response.ok) {
                        throw new Error('Не удалось отправить информацию на сервер');
                    }

                    // Помечаем, что данные были успешно отправлены
                    localStorage.setItem('clientInfoSent', 'true');
                    console.log('Информация успешно отправлена на сервер');
                } else {
                    console.log('Информация о клиенте уже отправлена на сервер ранее');
                }
            } catch (error) {
                console.error('Ошибка при загрузке информации о клиенте:', error);
            }
        };

        sendClientInfo();
    }, []);

    return (
        <div>
            {/* Дополнительный JSX контент здесь, если необходимо */}
        </div>
    );
};

export default ClientInfo;
