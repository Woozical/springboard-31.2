// 1.
/* Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number.
(Make sure you get back JSON by including the json query key, specific to this API. */
const endpoint = 'http://numbersapi.com/22?json';
const h1 = document.getElementById('num-h1');
const p = document.getElementById('num-fact');

axios.get(endpoint)
.then(( response ) => {
    p.innerText = response.data.text;
})
.catch(( err ) => {console.log(err)}
);

// 2.
/* Figure out how to get data on multiple numbers in a single request.
Make that request and when you get the data back, put all of the number facts on the page. */
const rH1 = document.getElementById('random-h1');
const rUL = document.getElementById('random-facts');
const fourRandomNums = [];
for (let i = 0; i < 4; i++){
    fourRandomNums.push(
        Math.trunc(Math.random() * 100)
    );
}
const fourNumString = fourRandomNums.join(',');

axios.get(`http://numbersapi.com/${fourNumString}`)
.then(( response ) => {
    rH1.innerText = `Four Random Nums: ${fourNumString}`;
    for (let num of fourRandomNums){
        const li = document.createElement('li');
        li.innerText = response.data[num];
        rUL.append(li);
    }
})
.catch(( err ) => {console.log(err)});

// 3.
/* Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page.
It’s okay if some of the facts are repeats. */
const fourPromises = [
    axios.get(endpoint), axios.get(endpoint), axios.get(endpoint), axios.get(endpoint)
];

Promise.all(fourPromises)
.then( (responses) => {
    p.innerText = p.innerText + '\nFour More Facts:\n';
    for (let response of responses){
        p.innerText = p.innerText + response.data.text + '\n';
    }
})
.catch( (err) => {console.log(err)});