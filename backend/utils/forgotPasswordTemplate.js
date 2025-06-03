const forgotPasswordTemplate =  ({name, otp}) => {
    return `
    <div>
        <p>Dear ${name}</p>
        <p>use otp code to reset you password</p>
        <div style="background: yellow"; "font-size: 20px";>
            ${otp}
        <div>
        <p>This otp is valid for 1hour only.</p>
        <br/>
        <br/>
        <p>Thanks</p>
        <p>BuyIt</p>
    <div>
    `
}

export default forgotPasswordTemplate