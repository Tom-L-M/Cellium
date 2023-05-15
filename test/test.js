const asyncWrapper = async (asyncFunction, params = null) => {
    try {
        const data = await asyncFunction(params)
        return [data, null]
    } catch (error) {
        return [ null, error ]
    }
}

const timer1 = (time, resolve, reject) => setTimeout(() => {console.log(1);resolve()}, time);
const timer2 = (time) => setTimeout(() => {console.log(2);resolve()}, time);

async function main () {
    await asyncWrapper(timer1, [2000]);
    await asyncWrapper(timer2, [1000]);
}
main();