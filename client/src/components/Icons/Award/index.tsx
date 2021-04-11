function IconAward({
    size = 24,
    color = "currentColor",
    stroke = 1.5,
    ...props
}) {
    return <svg xmlns="http://www.w3.org/2000/svg" className="icon-award" width={size} height={size} viewBox="0 0 24 24" stroke-width={stroke} stroke={color} fill="none" stroke-linecap="round" stroke-linejoin="round" {...props}><path d="M0 0h24v24H0z" stroke="none"/><circle cx="12" cy="9" r="6"/><path d="M12.002 15.003l3.4 5.89L17 17.66l3.598.232-3.4-5.889M6.802 12.003l-3.4 5.89L7 17.66l1.598 3.232 3.4-5.889"/></svg>;
}

export default IconAward;
