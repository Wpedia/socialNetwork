import React, { useRef, useEffect } from 'react';

const Stream = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        // Получаем доступ к медиа-устройствам (веб-камера, микрофон)
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                // Устанавливаем поток медиа в элемент <video>
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch((error) => {
                console.error('Ошибка при получении доступа к медиа-устройствам:', error);
            });
    }, []);

    return (
        <div>
            <h1>Прямой эфир</h1>
            <video ref={videoRef} autoPlay playsInline muted controls style={{ maxWidth: '100%' }}></video>
        </div>
    );
}

export default Stream;