export function extractTime(dateString) {
    const date = new Date(dateString);
    const currentDate = new Date();
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (date.getFullYear() === currentDate.getFullYear()) {
        if (date.toDateString() === currentDate.toDateString()) {
            return `Сегодня ${hours}:${minutes}`;
        }

        const yesterday = new Date(currentDate);
        yesterday.setDate(yesterday.getDate() - 1);
        if (date.toDateString() === yesterday.toDateString()) {
            return `Вчера ${hours}:${minutes}`;
        }
        
        return ` ${padZero(day)}.${padZero(month)} в ${hours}:${minutes}`;
    } else {
        
        return `${padZero(day)}.${padZero(month)} ${year}`;
    }
}

function padZero(number) {
    return number.toString().padStart(2, "0");
}
