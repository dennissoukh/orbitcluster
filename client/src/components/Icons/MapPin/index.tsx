function IconMapPin({
    size = 24,
    color = "currentColor",
    stroke = 1.5,
    ...props
}) {
    return <svg xmlns="http://www.w3.org/2000/svg" className="icon-map-pin" width={size} height={size} viewBox="0 0 24 24" strokeWidth={stroke} stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M0 0h24v24H0z" stroke="none"/><circle cx="12" cy="11" r="3"/><path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>;
}

export default IconMapPin;
