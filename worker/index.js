const keys = require('./keys');
const redis = require('redis');
// create redis client
const client = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
})

// create duplicate to watch the incoming message
const sub = client.duplicate();

// recursive function to get fibo series
function fib(index) {
//   if (index < 2) return 1;
//   return fib(index - 1) + fib(index - 2);

    var num1=0;
    var num2=1;
    var sum;
    var i=0;
    for (i = 0; i < index; i++) {
        sum=num1+num2;
        num1=num2;
        num2=sum;
    }
    return num2;
}
// listen to onmessage call
sub.on('message', (channel, message) => {
    console.log(channel, message);
    client.hmset('values', message, fib(parseInt(message)));
})

// watch for insert into redis
sub.subscribe('insert');

function fibonacci(num)
{
    var num1=0;
    var num2=1;
    var sum;
    var i=0;
    for (i = 0; i < num; i++) 
    {
        sum=num1+num2;
        num1=num2;
        num2=sum;
    }
    return num2;
}