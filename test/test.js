const cll = require('..');

const htmlCode = `
    <html>
        <head>
            <title> kandahar </title>
            <style>
                body {
                    background-color: #12000a;
                    color: white;
                }
            </style>
            <meta charset="UTF-8">
        </head>
        <body>
            <pre>

            __________________________________________
            |                    🧁                    |
            | Cuidado amigo, essa é uma zona perigosa. |
            | Pegue sua flag e saia deste protocolo :  | 
            |          <{flag_kandahar}>         |
            |__   _____________________________________|   
                //
         .---.
        /_____\
        ( '.' )
        \_-_/_
        .-"\`'V'//-.
    / ,   |// , \
    / /|Ll //Ll|\ \
    / / |__//   | \_\
    \ \/---|[]==| / /
    \/\__/ |   \/\/
    |/_   | Ll_\|
        |\`^"""^\`|
        |   |   |
        |   |   |
        |   |   |
        |   |   |
        L___l___J
        |_ | _|
        (___|___) 

            </pre>
        </body>
    </html>
`;

const a = cll.html.renderDynamicHTML(htmlCode, {
    "flag_kandahar": 'FLAG_HERE'
});

console.log(a);