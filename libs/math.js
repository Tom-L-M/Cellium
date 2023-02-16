/**
 * @namespace
 * @public
 */
let namespace = {}

/*  This implements the following methods and properties:
    > vectorDistance()
    > vectorAngle()
    > kMeans()
    > kNearestNeighbors()
    > standardDeviation()
    > eucDistance()
*/

/**
 * Calculates the distance between two vectors.
 * 
 * @since 1.2.8
 * 
 * @param  {Array} vectorA The first vector. // => [x, y, angle]
 * @param  {Array} vectorB The second vector. // => [x, y, angle]
 * @return {Number} 
 * 
 * @example <caption>  </caption>
 * vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949
*/
namespace.vectorDistance = (vectorA/*[X, Y, angle]*/, vectorB/*[X, Y, angle]*/) => Math.sqrt(vectorA.reduce((acc, val, i) => acc + Math.pow(val - vectorB[i], 2), 0));

/**
 * Calculates the angle (theta) between two vectors.
 * 
 * @since 1.2.8
 * 
 * @param  {Array} vectorA The first vector. // => [x, y]
 * @param  {Array} vectorB The second vector. // => [x, y]
 * @return {Number} 
 * 
 * @example <caption>  </caption>
 * vectorAngle([3, 4], [4, 3]); // 0.283794109208328
*/
namespace.vectorAngle = (vectorA/*[X, Y]*/, vectorB/*[X, Y]*/) => {
    let mA = Math.sqrt(vectorA.reduce((acc, n) => acc + Math.pow(n, 2), 0));
    let mB = Math.sqrt(vectorB.reduce((acc, n) => acc + Math.pow(n, 2), 0));
    return Math.acos(vectorA.reduce((acc, n, i) => acc + n * vectorB[i], 0) / (mA * mB));
};

/**
 * Groups the given data into k clusters, using the k-means clustering algorithm.
 * Reference: https://en.wikipedia.org/wiki/K-means_clustering
 * @since 1.2.8
 * 
 * @param  {Array} data The data array.
 * @param  {Number} k The number of clusters in the k-means cluster algorithm.
 * @return {Array} 
 * 
 * @example <caption>  </caption>
 * kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]
*/
namespace.kMeans = (data, k = 1) => {
    const centroids = data.slice(0, k);
    const distances = Array.from({ length: data.length }, () =>
        Array.from({ length: k }, () => 0)
    );
    const classes = Array.from({ length: data.length }, () => -1);
    let itr = true;
    while (itr) {
        itr = false;
    
        for (let d in data) {
            for (let c = 0; c < k; c++) {
            distances[d][c] = Math.hypot(
                ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
            );
            }
            const m = distances[d].indexOf(Math.min(...distances[d]));
            if (classes[d] !== m) itr = true;
            classes[d] = m;
        }
    
        for (let c = 0; c < k; c++) {
            centroids[c] = Array.from({ length: data[0].length }, () => 0);
            const size = data.reduce((acc, _, d) => {
            if (classes[d] === c) {
                acc++;
                for (let i in data[0]) centroids[c][i] += data[d][i];
            }
            return acc;
            }, 0);
            for (let i in data[0]) {
            centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2));
            }
        }
    }
  
    return classes;
};

/**
 * Classifies a data point relative to a labelled data set, using the k-nearest neighbors algorithm.
 * Reference: https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm
 * @since 1.2.8
 * 
 * @param  {Array} data The data array.
 * @param  {Array} labels The labels associated with the data.
 * @param  {Array} point The point to trace and calculate the distance. Is an array of c and y positions: [X,Y].
 * @param  {Number} k The number of neighbors to find. Defaults to 3.
 * @return {Array} 
 * 
 * @example <caption>  </caption>
 * const data = [[0, 0], [0, 1], [1, 3], [2, 0]];
 * const labels = [0, 1, 1, 0];
 * kNearestNeighbors(data, labels, [1, 2], 2); // 1
 * kNearestNeighbors(data, labels, [1, 0], 2); // 0
*/
namespace.kNearestNeighbors = (data, labels, point, k = 3) => {
    const kNearest = data
        .map((el, i) => ({
            dist: Math.hypot(...Object.keys(el).map(key => point[key] - el[key])),
            label: labels[i]
        }))
        .sort((a, b) => a.dist - b.dist)
        .slice(0, k)
    ;
    return kNearest.reduce(
        (acc, { label }, i) => {
            acc.classCounts[label] =
            Object.keys(acc.classCounts).indexOf(label) !== -1
                ? acc.classCounts[label] + 1
                : 1;
            if (acc.classCounts[label] > acc.topClassCount) {
            acc.topClassCount = acc.classCounts[label];
            acc.topClass = label;
            }
            return acc;
        },
        {
            classCounts: {},
            topClass: kNearest[0].label,
            topClassCount: 0
        }
    ).topClass;
};

/**
 * Calculates the standard deviation of an array of numbers.
 * @since 1.2.8
 * 
 * @param  {String} arr The data array
 * @param  {String} usePopulation 
 *  Set to true if the data contains all the values you are interested in.
 *  Set to false if the data belongs to a larger or unlimited population.
 * @return {Number} The standard deviation of the array.
 * 
 * @example <caption>  </caption>
 * standardDeviation([10, 2, 38, 23, 38, 23, 21]); // 13.284434142114991 (sample)
 * standardDeviation([10, 2, 38, 23, 38, 23, 21], true); // 12.29899614287479 (population)
*/
namespace.standardDeviation = (arr, usePopulation = true) => {
    const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
    return Math.sqrt(
        arr
        .reduce((acc, val) => acc.concat((val - mean) ** 2), [])
        .reduce((acc, val) => acc + val, 0) /
        (arr.length - (usePopulation ? 0 : 1))
    );
};

/**
 * Returns the Euclidian distance between two points
 * @since 1.2.8
 * 
 * @param  {Array} pointA => [xA,yA] => The X and Y coordinates of the point A
 * @param  {Array} pointB => [xB,yB] => The X and Y coordinates of the point B
 * @return {Number} The euclidian distance between the two points
 * 
 * @example <caption>  </caption>
 * eucDistance([1, 1], [2, 3]); // ~2.2361
*/
namespace.eucDistance = ([x0,y0]/*point 0*/, [x1,y1]/*point 1*/) => Math.hypot(x1-x0, y1-y0);

module.exports = namespace;