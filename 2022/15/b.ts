const input_sensors = {
  "3428425,2345067": "3431988,2379841",
  "928237,25774": "1212315,-161555",
  "2061220,2396791": "2038311,2495160",
  "1830400,2994568": "1910058,3117415",
  "2485733,2625804": "2038311,2495160",
  "1855873,3971916": "1910058,3117415",
  "119582,3929652": "311197,4221202",
  "1069031,3509672": "1910058,3117415",
  "3368023,2213635": "3431988,2379841",
  "3713877,2460862": "3431988,2379841",
  "3593503,2174008": "3507689,2000000",
  "501760,93436": "1212315,-161555",
  "3712703,214999": "3507689,2000000",
  "1594824,2790273": "1910058,3117415",
  "2539549,3190814": "1910058,3117415",
  "3522790,2671548": "3431988,2379841",
  "1001452,1327490": "1212315,-161555",
  "629209,2451628": "-416149,2226089",
  "2636827,1146266": "3507689,2000000",
  "3909,625124": "1212315,-161555",
  "3950231,3688780": "3888160,3226725",
  "3449978,2328058": "3507689,2000000",
  "3974214,2582925": "3888160,3226725",
  "82663,3225533": "311197,4221202",
  "1958305,2292045": "2038311,2495160",
  "3465738,2123353": "3507689,2000000",
  "2940758,3884337": "2746166,4800483",
  "3429173,2275591": "3431988,2379841",
  "1527349,38565": "1212315,-161555",
  "3049925,2498038": "3431988,2379841",
  "1593202,3335178": "1910058,3117415",
  "3175520,3230234": "3888160,3226725",
};

const test_sensors = {
  "2,18": "-2,15",
  "9,16": "10,16",
  "13,2": "15,3",
  "12,14": "10,16",
  "10,20": "10,16",
  "14,17": "10,16",
  "8,7": "2,10",
  "2,0": "2,10",
  "0,11": "2,10",
  "20,14": "25,17",
  "17,20": "21,22",
  "16,7": "15,3",
  "14,3": "15,3",
  "20,1": "15,3",
};

// const maxX = 20;
// const maxY = 20;

const merge = (intervals: number[][]) => {
  if (intervals.length < 2) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);

  const result = [];
  let previous = intervals[0];

  for (let i = 1; i < intervals.length; i += 1) {
    if (previous[1] >= intervals[i][0]) {
      previous = [previous[0], Math.max(previous[1], intervals[i][1])];
    } else {
      result.push(previous);
      previous = intervals[i];
    }
  }

  result.push(previous);

  return result;
};

const maxX = 4000000;
for (let i = 0; i < maxX; i++) {
  const intervals = [];
  for (const [sensor, beacon] of Object.entries(input_sensors)) {
    let [x, y] = sensor.split(",").map(Number);
    let [bx, by] = beacon.split(",").map(Number);
    const beaconDistance = Math.abs(bx - x) + Math.abs(by - y);
    const width = beaconDistance - Math.abs(y - i);
    if (width < 1 || width > beaconDistance) continue;
    intervals.push([x - width, x + width]);
  }

  const merged = merge(intervals);
  if (merged.length < 2) continue;
  console.log(i, merged);
  console.log((merged[0][1] + 1) * 4000000 + i);
  break;
}