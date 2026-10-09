import env from "../config/env.js";

function getExpirationDate(duration = env.refreshTokenExpiresIn) {
    const value = parseInt(duration);
    const unit = duration.slice(-1);

    const units = {
        m: 60 * 1000,
        h: 60 * 60 * 1000,
        d: 24 * 60 * 60 * 1000,
    };

    return new Date(Date.now() + value * units[unit]);
}

export default getExpirationDate