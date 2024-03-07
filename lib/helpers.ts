export const divideArrayGroup = (array: [], sizeGroup = 3) => {
    const groups = [];
    for (let i = 0; i < array.length; i += sizeGroup) {
        groups.push(array.slice(i, i + sizeGroup));
    }
    return groups;
}

export const validateOffer = (price: number, price_offer: number, date_start_offer: Date, date_finish_offer: Date): boolean => {
    return price > price_offer && validateHoursDate(date_start_offer, date_finish_offer);
}


const validateHoursDate = (_dateStart: Date, _dateFinish: Date) => {
    const dateHourValidate = new Date();
    const dateStart = new Date(_dateStart);
    const dateFinish = new Date(_dateFinish);
    return (
        dateHourValidate >= dateStart && dateHourValidate <= dateFinish
    );
}