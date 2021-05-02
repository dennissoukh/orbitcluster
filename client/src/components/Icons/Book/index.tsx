function IconBook({
    size = 24,
    color = "currentColor",
    stroke = 1.5,
    ...props
}) {
    return <svg xmlns="http://www.w3.org/2000/svg" className="icon-book" width={size} height={size} viewBox="0 0 24 24" strokeWidth={stroke} stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M0 0h24v24H0z" stroke="none"/><path d="M3 19a9 9 0 019 0 9 9 0 019 0M3 6a9 9 0 019 0 9 9 0 019 0M3 6v13M12 6v13M21 6v13"/></svg>;
}

export default IconBook;
