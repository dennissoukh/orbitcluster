export interface ChartStateContract {
    lat: number,
    lon: number,
    alt: number,
    date: Date,
}

export interface AstroDataContract {
    stars: any[],
    consellations?: any[],
    milkyWay?: any[],
}

export interface ObserverContract {
    name: string,
    lat: number,
    lon: number,
    alt: number,
}

export interface TimeContract {
    date: Date,
    tz: number,
    tzStr: string,
    yyyy: number,
    mm: number,
    dd: number,
    h: number,
    m: number,
    s: number,
    D: number,
    T: number,
    dT: number,
    GMST: number,
    LST: number,
    LSTrad: number,
    LSTStr: string,
    timeStr: string,
    dateStr: string,
    lat: number,
    lon: number,
}
