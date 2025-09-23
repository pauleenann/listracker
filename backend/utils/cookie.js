export const setRefreshTokenCookie = (res, refreshToken)=>{
    res.cookie('refreshToken', refreshToken, {
        http: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 
    })
}

export const clearRefreshTokenCookie = (res, refreshToken)=>{
    res.cookie('refreshToken', '', {
        http: true,
        secure: false,
        sameSite: 'lax',
        maxAge: new Date(0)
    })
}