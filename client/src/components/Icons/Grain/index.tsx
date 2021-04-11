function IconGrain({
    size = 24,
    color = "currentColor",
    stroke = 1.5,
    ...props
}) {
    return <svg xmlns="http://www.w3.org/2000/svg" className="icon-grain" width={size} height={size} viewBox="0 0 24 24" strokeWidth={stroke} stroke={color} fill="none" stroke-linecap="round" stroke-linejoin="round" {...props}><path d="M0 0h24v24H0z" stroke="none"/><circle cx="4.5" cy="9.5" r="1"/><circle cx="9.5" cy="4.5" r="1"/><circle cx="9.5" cy="14.5" r="1"/><circle cx="4.5" cy="19.5" r="1"/><circle cx="14.5" cy="9.5" r="1"/><circle cx="19.5" cy="4.5" r="1"/><circle cx="14.5" cy="19.5" r="1"/><circle cx="19.5" cy="14.5" r="1"/></svg>;
}

export default IconGrain;
