function IconSatellite({
    size = 24,
    color = "currentColor",
    stroke = 1.5,
    ...props
}) {
    return <svg xmlns="http://www.w3.org/2000/svg" className="icon-satellite" width={size} height={size} viewBox="0 0 24 24" strokeWidth={stroke} stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M0 0h24v24H0z" stroke="none"/><path d="M3.707 6.293l2.586-2.586a1 1 0 011.414 0l5.586 5.586a1 1 0 010 1.414l-2.586 2.586a1 1 0 01-1.414 0L3.707 7.707a1 1 0 010-1.414z"/><path d="M6 10l-3 3 3 3 3-3M10 6l3-3 3 3-3 3M12 12l1.5 1.5M14.5 17a2.5 2.5 0 002.5-2.5M15 21a6 6 0 006-6"/></svg>;
}

export default IconSatellite;
