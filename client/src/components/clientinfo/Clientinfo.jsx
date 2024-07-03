import React, { useEffect, useRef } from 'react';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import UAParser from 'ua-parser-js';

// Функция для сравнения двух объектов
function isEqual(obj1, obj2, seenObjects = new WeakMap()) {
    // Если ссылки совпадают, сразу возвращаем true
    if (obj1 === obj2) return true;

    // Проверка на типы
    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
        return false;
    }

    // Если объекты содержат циклические ссылки
    if (seenObjects.has(obj1) || seenObjects.has(obj2)) {
        return obj1 === obj2;
    }

    seenObjects.set(obj1, true);
    seenObjects.set(obj2, true);

    // Получаем ключи объектов
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);

    // Проверяем количество ключей
    if (keys1.length !== keys2.length) {
        seenObjects.delete(obj1);
        seenObjects.delete(obj2);
        return false;
    }

    // Проверяем каждое свойство
    for (let key of keys1) {
        if (!keys2.includes(key) || !isEqual(obj1[key], obj2[key], seenObjects)) {
            seenObjects.delete(obj1);
            seenObjects.delete(obj2);
            return false;
        }
    }

    seenObjects.delete(obj1);
    seenObjects.delete(obj2);
    return true;
}


const getClientInfo = () => {
    const parser = new UAParser();
    const userAgentInfo = parser.getResult();

    return {
        userAgent: userAgentInfo.ua,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        language: navigator.language,
        platform: navigator.platform,
        // timestamp: new Date().toISOString(),
        timezoneOffset: new Date().getTimezoneOffset(),
        ipAddress: '', // Будет заполнен на сервере
        browser: userAgentInfo.browser.name,
        browserVersion: userAgentInfo.browser.version,
        operatingSystem: userAgentInfo.os.name,
        osVersion: userAgentInfo.os.version,
        deviceModel: userAgentInfo.device ? userAgentInfo.device.model : 'Unknown',
    };
};

const ClientInfo = () => {
    const ignoreRequest = useRef(false);

    useEffect(() => {
        const storedClientInfo = JSON.parse(localStorage.getItem('clientInfo')) || {};
        const currentClientInfo = getClientInfo();

        // Получение IP-адреса клиента с помощью внешнего API или серверного решения
        fetch('https://api64.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                currentClientInfo.ipAddress = data.ip;

                const shouldSendData = !isEqual(storedClientInfo, currentClientInfo);

                if (shouldSendData && !ignoreRequest.current) {
                    ignoreRequest.current = true;

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

                            localStorage.setItem('clientInfo', JSON.stringify(currentClientInfo));
                            console.log('Информация успешно отправлена на сервер');
                        } catch (error) {
                            console.error('Ошибка при загрузке информации о клиенте:', error);
                        } finally {
                            ignoreRequest.current = false;
                        }
                    };

                    sendClientInfo();
                } else {
                    console.log('Данные не изменились, информация о клиенте не отправляется');
                }
            })
            .catch(error => console.error('Ошибка при получении IP-адреса:', error));
    }, []);

    return (
        <div>
            {/* Дополнительный JSX контент здесь, если необходимо */}
        </div>
    );
};

export default ClientInfo;
