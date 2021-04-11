function IconCalender({
    size = 24,
    color = "currentColor",
    stroke = 1.5,
    ...props
}) {
    return <svg xmlns="http://www.w3.org/2000/svg" className="icon-calendar-stats" width={size} height={size} viewBox="0 0 24 24" stroke-width={stroke} stroke={color} fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M0 0h24v24H0z" stroke="none"/><path d="M11.795 21H5a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v4M18 14v4h4"/><circle cx="18" cy="18" r="4"/><path d="M15 3v4M7 3v4M3 11h16"/></svg>;
}

export default IconCalender;
