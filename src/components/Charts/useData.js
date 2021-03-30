export const useData = () => {
    const data = [
        { "time": "2021-03-22T00:00:00.000Z", "value": "5" },
        { "time": "2021-03-22T18:00:00.000Z", "value": "4" },
        { "time": "2021-03-23T03:00:00.000Z", "value": "6" },
        { "time": "2021-03-23T03:40:00.000Z", "value": "4.5" },
        { "time": "2021-03-23T05:00:00.000Z", "value": "2.5" },
        { "time": "2021-03-24T05:50:00.000Z", "value": "3" },
        { "time": "2021-03-25T06:00:00.000Z", "value": "4.2" },
        { "time": "2021-03-26T06:20:00.000Z", "value": "1.5" },
        { "time": "2021-03-26T06:50:00.000Z", "value": "2" },
        { "time": "2021-03-27T03:00:00.000Z", "value": "4" },
        { "time": "2021-03-27T05:00:00.000Z", "value": "3" },
        { "time": "2021-03-28T00:00:00.000Z", "value": "4" },
    ]
    return data.map((d) => {
        d.value = +d.value;
        d.time = new Date(d.time);
        return d;
    })
};
