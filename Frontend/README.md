
FOR LOCAL
A. On axios.js file
i. Change or confirm the baseURL
(example ==> baseURL: 'http://localhost:3000')

B. On db.js file
i. Change OR confirm the mongoDB connection
(example ==> return await mongoose.connect('mongodb://localhost:27017/diagnosis'))

...To create first Admin
On terminal:
i. cd server
ii. node
iii. const func = require('./startup')
iv. func("Saroj Padhy","admin@gmail.com","admin","Admin","BBSR Odisha","8018910279","password")

On terminal:
i. cd client
ii. npm run dev

On another terminal:
i. cd server
ii. npm start



FOR PRODUCTION

A. On axios.js file
i. Change the baseURL to the one provided by your hosting platform
(example ==> baseURL: 'https://diagnosis-production.up.railway.app/')
or 
(example ==> baseURL: 'https://diagnosis-production.up.render.app/')
or 
others

B. On db.js file
i. Change the mongoDB connection to the one provided by your hosting platform
(example ==> return await mongoose.connect('mongodb+srv://psarojkumar9:<password>@cluster0.yjmf4dt.mongodb.net/?retryWrites=true&w=majority'))


On terminal:
i. cd client
ii. npm run build (this will create a 'dist' folder which would then be hosted on a hosting platform of your choice--preferably VERCEL)

The server folder(backend) should preferably be hosted on RAILWAY,render or any other 
