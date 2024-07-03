import React, { useEffect, useRef } from 'react';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import UAParser from 'ua-parser-js'; // Импортируем ua-parser-js

// Функция для сравнения двух объектов
function isEqual(obj1, obj2) {
    if (obj1 === obj2) return true; // Если ссылки совпадают, сразу возвращаем true

    if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) {
        return false; // Если типы не совпадают или один из объектов равен null, возвращаем false
    }

    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false; // Если количества ключей отличаются, объекты не равны
    }

    for (let key of keys1) {
        if (!keys2.includes(key) || obj1[key] !== obj2[key]) {
            return false; // Если ключ отсутствует во втором объекте или значения не совпадают, возвращаем false
        }
    }

    return true; // Если все проверки пройдены, объекты равны
}

const getClientInfo = () => {
    const parser = new UAParser();
    const userAgentInfo = parser.getResult(); // Получаем информацию о User-Agent

    return {
        userAgent: userAgentInfo.ua,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        language: navigator.language,
        platform: navigator.platform,
        timezoneOffset: new Date().getTimezoneOffset(),
        ipAddress: '', // Требуется использовать внешнее API или серверное решение
        browser: userAgentInfo.browser.name,
      //  timestamp: new Date().toISOString(),
        browserVersion: userAgentInfo.browser.version,
        operatingSystem: userAgentInfo.os.name,
        osVersion: userAgentInfo.os.version,
        deviceModel: userAgentInfo.device ? userAgentInfo.device.model : 'Unknown', // Используем 'Unknown', если модель устройства не определена
        };
};
//   timestamp: new Date().toISOString(),
const ClientInfo = () => {
    const ignoreRequest = useRef(false); // Флаг для игнорирования текущего запроса

    useEffect(() => {
        const storedClientInfo = JSON.parse(localStorage.getItem('clientInfo')) || {}; // Получаем сохраненные данные
        const currentClientInfo = getClientInfo();

        // Сравниваем данные
        const shouldSendData = !isEqual(storedClientInfo, currentClientInfo);

        if (shouldSendData && !ignoreRequest.current) {
            ignoreRequest.current = true; // Устанавливаем флаг в true, чтобы игнорировать текущий запрос

            const sendClientInfo = async () => {
                try {
                    const response = await fetch('http://localhost:5000/save-client-info', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(currentClientInfo),
                    });

                    if (!response.ok) {
                        throw new Error('Не удалось отправить информацию на сервер');
                    }

                    localStorage.setItem('clientInfo', JSON.stringify(currentClientInfo)); // Обновляем сохраненные данные
                    console.log('Информация успешно отправлена на сервер');
                } catch (error) {
                    console.error('Ошибка при загрузке информации о клиенте:', error);
                } finally {
                    ignoreRequest.current = false; // Сбрасываем флаг после завершения запроса
                }
            };

            sendClientInfo();
        } else {
            console.log('Данные не изменились, информация о клиенте не отправляется');
        }
    }, []);

    return (
        <div>
            {/* Дополнительный JSX контент здесь, если необходимо */}
        </div>
    );
};

export default ClientInfo;
