

export const isTokenExpires = (expiresIn: number): boolean => {
    return expiresIn < Date.now() 
}