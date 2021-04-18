function IconClipboardList({
    size = 24,
    color = "currentColor",
    stroke = 1.5,
    ...props
}) {
    return <svg xmlns="http://www.w3.org/2000/svg" className="icon-clipboard-list" width={size} height={size} viewBox="0 0 24 24" strokeWidth={stroke} stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M0 0h24v24H0z" stroke="none"/><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><path d="M9 12h.01M13 12h2M9 16h.01M13 16h2"/></svg>;
}

export default IconClipboardList;
