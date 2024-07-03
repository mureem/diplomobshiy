import React, { useEffect } from 'react';

const getClientInfo = () => {
    return {
        userAgent: navigator.userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        language: navigator.language,
        platform: navigator.platform
    };
};

const ClientInfo = () => {
    useEffect(() => {
        const clientInfo = getClientInfo();
        console.log(clientInfo); // Логирование информации о клиенте

        const sendClientInfo = async () => {
            try {
                const response = await fetch('http://localhost:5000/save-client-info', { // Изменил порт на 5000
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(clientInfo),
                });

                if (!response.ok) {
                    throw new Error('Не удалось отправить информацию на сервер');
                }
                console.log('Информация успешно отправлена на сервер');
            } catch (error) {
                console.error('Ошибка при загрузке информации о клиенте:', error);
            }
        };

        sendClientInfo();
    }, []);

    return (
        <div>

        </div>
    );
};

export default ClientInfo;
