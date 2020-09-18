const fs = require('fs');

let date = new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo",
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
});

let json = {
    f: date,
};
fs.writeFile('src/build.json', JSON.stringify(json), 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    }
});