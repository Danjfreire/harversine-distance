function radiansFromDegrees(degrees) {
    return degrees * Math.PI / 180;
}

export function haversineDistance(x0, y0, x1, y1, earthRadius = 6372.8) {

    let lat1 = y0;
    let lat2 = y1;
    let lon1 = x0;
    let lon2 = x1;

    let dLat = radiansFromDegrees(lat2 - lat1);
    let dLon = radiansFromDegrees(lon2 - lon1);
    lat1 = radiansFromDegrees(lat1);
    lat2 = radiansFromDegrees(lat2);

    let a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);

    let c = 2 * Math.asin(Math.sqrt(a));
    let res = earthRadius * c;

    return res;
}