function IconHeart({
    size = 24,
    color = "currentColor",
    stroke = 1.5,
    ...props
}) {
    return <svg xmlns="http://www.w3.org/2000/svg" className="icon-heart" width={size} height={size} viewBox="0 0 24 24" strokeWidth={stroke} stroke={color} fill="none" stroke-linecap="round" stroke-linejoin="round" {...props}><path d="M0 0h24v24H0z" stroke="none"/><path d="M19.5 13.572L12 21l-7.5-7.428m0 0A5 5 0 1112 7.006a5 5 0 117.5 6.572"/></svg>;
}

export default IconHeart;
