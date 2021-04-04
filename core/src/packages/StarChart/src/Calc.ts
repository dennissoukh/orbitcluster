export function raDecToCoordinates(
    ra: number,
    dec: number,
    LST: number,
    cosLat: number,
    sinLat: number,
    parameters: object,
    horizon: boolean = true
) {
    let HA      = LST - ra,
        cosHA   = Math.cos(HA),
        sinHA   = Math.sin(HA),
        cosDec  = Math.cos(dec),
        sinDec  = Math.sin(dec),
        alt     = Math.asin(sinDec * sinLat + cosLat * cosDec * cosHA),
        cosAlt  = Math.cos(alt),
        sinA    = cosDec * sinHA / cosAlt,
        cosA    = (cosDec * cosHA * sinLat - sinDec * cosLat) / cosAlt;
}
