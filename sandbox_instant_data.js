const axios = require('axios');

let occurrences = [];

const BASE_URL =
    'http://www.prociv.pt/_vti_bin/ARM.ANPC.UI/ANPC_SituacaoOperacional.svc/';

function getHistoryOccurrencesByLocation() {
    axios
        .post(BASE_URL + 'GetHistoryOccurrencesByLocation', {
            distritoID: null,
            concelhoID: null,
            freguesiaID: null,
            pageSize: 10000,
            pageIndex: 1,
            forToday: false,
            natureza: '0'
        })
        .then(
            (response) => {
                occurrences.push(
                    response.data.GetHistoryOccurrencesByLocationResult
                        .ArrayInfo[0].Data[0]
                );
                console.log(occurrences);
            },
            (error) => {
                console.log(error);
            }
        );
}

getHistoryOccurrencesByLocation();
