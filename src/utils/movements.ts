type Group = {
    [k: number]: Movement[]
}

export function groupMovementsByDate(movements: Movement[]): MovementsByDate[] {
    const grouped: Group = {};

    const orderByDate = movements.sort((a, b) => b.date - a.date);

    orderByDate.forEach(item => {
        const fullDate = new Date(item.date);
        fullDate.setHours(0, 0, 0, 0);
        const dateKey = fullDate.getTime();

        if (!grouped[dateKey]) {
            grouped[dateKey] = [];
        }

        grouped[dateKey].push(item);
    });

    return Object.keys(grouped).map(date => {
        const dateNumber = Number(date);
        return {
            date: dateNumber,
            data: grouped[dateNumber]
        }
    });
}