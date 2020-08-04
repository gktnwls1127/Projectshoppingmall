const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
//promise 형태로 쓰기 위해서 promisify 해줌
client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;
/*caching을 할지 결정하는 함수 추가
 이렇게 하지 않으면 몽구스 모델의
 query부분 전체를 캐싱하기 때문에
 오히려 비효율적인 연산이 됨
 -캐싱이 모두 효율적인 것은 아님
*/
mongoose.Query.prototype.cache = function (options = {}) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || 'default');
    return this;
    // chaining을 위해 이 mongoose 모델 그 자체를 다시 넘겨줌
};
mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
        return exec.apply(this, arguments);
    }
    const key = JSON.stringify(
        Object.assign(
            {},
            { op: this.op, options: this.options },
            {
                collection: this.mongooseCollection.name,
            }
        )
    );
    const cacheValue = await client.hget(this.hashKey, key);
    if (cacheValue) {
        /*hydrate 해 주어야 함
        mongoose에서 쓰이는 것은 document 타입이며
        해당하는 메소드들이 있어야 한다.
        하지만 그냥 JSON을 Parse하는 것만으로는
        prototype만 존재 할 뿐, document의 메소드들이
        존재하지 않음 - 모델을 만들어 주어야 하는 이유
        그러므로 배열의 경우는 각각의 원소마다
        hydrate 해주어야 함        
        (깊은 복사, 얕은 복사 개념으로 생각)
        그래서 배열타입을 채크하고, 배열일시
        해당 원소들 각각에 model함수로 hydrate 해주어야 함
        */
        console.log('캐싱 된 데이터 입니다.');
        const doc = JSON.parse(cacheValue);
        return Array.isArray(doc)
            ? doc.map((d) => new this.model(d))
            : new this.model(doc);
    }
    const result = await exec.apply(this, arguments);
    console.log('캐싱 할 데이터 입니다.');
    client.hset(this.hashKey, key, JSON.stringify(result), (error) => {
        if (error) {
            console.log(error);
        }
    });
    client.expire(this.hashKey, 1800);
    return result;
};
module.exports = {
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey));
    },
};